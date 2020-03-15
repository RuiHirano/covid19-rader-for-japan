import { useState, useCallback, Dispatch, SetStateAction } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Status, Item, Content, TradeType } from '../../types'
import moment, { Moment } from 'moment'
import { ReduxState } from '../module'

/////////////////////////////////////////////////
//////////          Sign In             ////////
////////////////////////////////////////////////

export const useStatistics = () => {
    const [status, setStatus] = useState<Status>({ Progress: 0, Log: "", Error: "", Loading: false })
    const [statsResult, setStatsResult] = useState<StatsResult>({ Statistics: new Statistics(), Graphs: new Graphs })
    const items: Item[] = useSelector((state: ReduxState) => state.Items);
    const content = useSelector(
        (state: ReduxState) => state.User.Setting.Content
    );


    const calcStats = useCallback(async (date: Moment, period: PeriodType) => {
        try {
            // Loading開始
            setStatus({ ...status, Loading: true })

            const statsCalc = new StatsCalculator(items, content)
            const statsResult = statsCalc.calcStats(period, date)
            setStatsResult(statsResult)
            console.log("statsResult: ", statsCalc.StatsResult)


            // Loading終了
            setStatus({ ...status, Loading: false, Progress: 100 })

        } catch (err) {
            console.log("error: ", err)
            setStatus({ ...status, Error: err })
        }

    }, [status])
    return { "calcStats": calcStats, "status": status, "statsResult": statsResult }
}

export enum PeriodType {
    YEAR,
    MONTH,
    DAY,
}

export class StatsCalculator {
    StatsResult: StatsResult
    Items: Item[]
    Param: Content
    constructor(items: Item[], param: Content) {
        this.StatsResult = { Statistics: new Statistics(), Graphs: new Graphs() }
        this.Items = items
        this.Param = param
    }

    convertPeriodToString(period: PeriodType) {
        switch (period) {
            case PeriodType.YEAR:
                return "year"
            case PeriodType.MONTH:
                return "month"
            case PeriodType.DAY:
                return "day"
        }
    }

    // periodtypeに沿った日付の数字を取得　period: YEAR, 2020/2/2 -> 2020
    getPeriodDateNumber(date: Moment, period: PeriodType) {
        switch (period) {
            case PeriodType.YEAR:
                return date.year()
            case PeriodType.MONTH:
                return date.month()
            case PeriodType.DAY:
                return date.date()
        }
    }

    // periodtypeに沿った日付の数字の最大値を取得　period: YEAR, 2020/2/2 -> 12
    getMaxPeriodNum(date: Moment, period: PeriodType) {
        switch (period) {
            case PeriodType.YEAR:
                return 12
            case PeriodType.MONTH:
                return date.daysInMonth()
            case PeriodType.DAY:
                return 24
        }
    }

    // period内のアイテムとそれ以前のitemsを取得
    queryItems(period: PeriodType, date: Moment) {
        let targetItems: Item[] = []
        let beforeItems: Item[] = []
        const periodStr = this.convertPeriodToString(period)
        this.Items.forEach((item: Item) => {
            if (moment(item.StartDate).isSame(date, periodStr)) {
                targetItems.push(item)
            } else if (moment(item.StartDate).isBefore(date, periodStr)) {
                beforeItems.push(item)
            }
        })
        return { "targetItems": targetItems, "beforeItems": beforeItems }
    }

    calcStats(period: PeriodType, date: Moment) {

        // period内のアイテムとそれ以前のitemsを取得
        const { targetItems, beforeItems } = this.queryItems(period, date)

        let stats = new Statistics()
        targetItems.forEach((item: Item) => {
            if (item.TradeType === TradeType.DEPOSIT || item.TradeType === TradeType.WITHDRAWAL) {
                stats.NumDepWith += 1
                stats.AmountDepWith += item.Profit
            } else if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
                if (item.Profit < 0) {
                    stats.TotalLoss += item.Profit
                    stats.NumLose += 1
                } else if (item.Profit >= 0) {
                    stats.TotalProfit += item.Profit
                    stats.NumWin += 1
                }
            }
        })

        beforeItems.forEach((item: Item) => {
            if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
                stats.ProfitBefore += item.Profit
            }
        })

        // num trade
        stats.NumTrade = stats.NumWin + stats.NumLose

        // total assets
        stats.TotalAssets =
            stats.TotalProfit +
            stats.TotalLoss +
            this.Param.InitialInvestment +
            stats.ProfitBefore
        console.log("totalAssets: ", stats.TotalAssets)

        // total
        stats.TotalProfitAndLoss = stats.TotalProfit + stats.TotalLoss

        // win rate
        if (stats.NumWin + stats.NumLose !== 0) {
            stats.WinRate =
                +((stats.NumWin * 100) / (stats.NumWin + stats.NumLose))
                    .toFixed(1)
        }

        // profit ave, lose ave
        if (stats.NumWin !== 0) {
            stats.ProfitAve = stats.TotalProfit / stats.NumWin
        }
        if (stats.NumLose !== 0) {
            stats.LossAve = stats.TotalLoss / stats.NumLose
        }

        // profit ratio
        if (stats.LossAve === 0) {
            stats.ProfitRatio = Infinity
        } else {
            stats.ProfitRatio = -((stats.ProfitAve * 100) / stats.LossAve).toFixed(
                1
            )
        }

        let graphs = new Graphs()
        let maxPeriodNum: number = this.getMaxPeriodNum(date, period)
        // 配列の初期化
        graphs.ProfitTransition = new Array(maxPeriodNum)
        graphs.DepoWithTransition = new Array(maxPeriodNum)
        graphs.TotalProfitTransition = new Array(maxPeriodNum)
        graphs.TotalAssetsTransition = new Array(maxPeriodNum)
        for (var i = 0; i < maxPeriodNum; i++) {
            graphs.ProfitTransition[i] = 0
            graphs.DepoWithTransition[i] = 0
            graphs.TotalProfitTransition[i] = 0
            graphs.TotalAssetsTransition[i] = this.Param.InitialInvestment + stats.ProfitBefore
        }

        targetItems.forEach((item: Item) => {
            const dateNumber = this.getPeriodDateNumber(moment(item.EndDate), period)
            if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
                // undefinedであれば初期値、でなければprofitを加算
                graphs.ProfitTransition[dateNumber] += item.Profit
                // TotalAssets, totalProfit, 累積を求める
                for (let i = 0; i < maxPeriodNum; i++) {
                    if (i >= this.getPeriodDateNumber(moment(item.EndDate), period)) {
                        graphs.TotalProfitTransition[i] += item.Profit
                        graphs.TotalAssetsTransition[i] += item.Profit
                    }
                }
            } else if (

                item.TradeType === TradeType.DEPOSIT ||
                item.TradeType === TradeType.WITHDRAWAL
            ) {
                graphs.DepoWithTransition[dateNumber] += item.Profit
            }

            // trade ratio
            switch (item.TradeType) {
                case TradeType.BUY:
                    graphs.TradeTypeRatio.BUY += 1
                    graphs.TradeTypeRatio.ALL += 1
                    break
                case TradeType.SELL:
                    graphs.TradeTypeRatio.SELL += 1
                    graphs.TradeTypeRatio.ALL += 1
                    break
                default:
                    break
            }

            // pair ratio and pair profit
            if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
                let hasPair = false
                graphs.PairRatio.forEach((elem, index) => {
                    if (elem.Pair === item.Pair) {
                        hasPair = true
                        graphs.PairRatio[index].Num += 1
                        graphs.PairRatio[index].Profit += item.Profit
                    }
                })
                // Listにない場合、新しく追加
                if (!hasPair) {
                    graphs.PairRatio.push({
                        Pair: item.Pair,
                        Num: 1,
                        Profit: item.Profit,
                    })
                }
            }
        })
        this.StatsResult = {
            Statistics: stats,
            Graphs: graphs
        }
        return this.StatsResult
    }
}

export class Statistics {
    ProfitBefore: number
    TotalAssets: number
    NumDepWith: number
    AmountDepWith: number
    TotalProfitAndLoss: number
    TotalProfit: number
    TotalLoss: number
    WinRate: number
    NumTrade: number
    NumWin: number
    NumLose: number
    ProfitRatio: number
    ProfitAve: number
    LossAve: number

    constructor() {
        this.ProfitBefore = 0
        this.TotalAssets = 0
        this.NumDepWith = 0
        this.AmountDepWith = 0
        this.TotalProfitAndLoss = 0
        this.TotalProfit = 0
        this.TotalLoss = 0
        this.WinRate = 0
        this.NumTrade = 0
        this.NumWin = 0
        this.NumLose = 0
        this.ProfitRatio = 0
        this.ProfitAve = 0
        this.LossAve = 0
    }
}

export interface TransitionPoint {
    Date: Moment,
    Value: number,
}

export interface TradeTypeRatio {
    BUY: number,
    SELL: number,
    ALL: number,
}

export interface PairRatio {
    Pair: string,
    Num: number,
    Profit: number,
}

export interface StatsResult {
    Statistics: Statistics
    Graphs: Graphs
}


export class Graphs {
    ProfitTransition: number[]
    DepoWithTransition: number[]
    TotalProfitTransition: number[]
    TotalAssetsTransition: number[]
    TradeTypeRatio: TradeTypeRatio
    PairRatio: PairRatio[]

    constructor() {
        this.ProfitTransition = []
        this.DepoWithTransition = []
        this.TotalProfitTransition = []
        this.TotalAssetsTransition = []
        this.PairRatio = []
        this.TradeTypeRatio = {
            BUY: 0,
            SELL: 0,
            ALL: 0,
        }
    }
}

