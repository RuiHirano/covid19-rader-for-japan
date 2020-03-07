import moment, { Moment } from "moment"
import { Content } from "./user"
import { Builder } from "./builder"
import { TradeType, Item } from "./item"


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


export class Graphs {
	ProfitTransition: TransitionPoint[]
	DepoWithTransition: TransitionPoint[]
	TotalProfitTransition: TransitionPoint[]
	TotalAssetsTransition: TransitionPoint[]
	TradeTypeRatio: TradeTypeRatio
	PairRatio: PairRatio[]

	constructor() {
		this.ProfitTransition = []
		this.DepoWithTransition = []
		this.TotalProfitTransition = []
		this.TotalAssetsTransition = []
		this.TradeTypeRatio = <TradeTypeRatio>{
			BUY: 0,
			SELL: 0,
			ALL: 0,
		}
		this.PairRatio = []
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

export class YearStatsBuilder extends Builder {
	private period: Moment
	private items: Item[]
	private statsParam: Content
	private periodItems: Item[] = []
	private beforePeriodItems: Item[] = []
	private stats: Statistics = new Statistics()
	private graphs: Graphs = new Graphs()

	constructor(items: Item[], period: Moment, statsParam: Content) {
		super()
		this.period = period
		this.items = items
		this.statsParam = statsParam
	}

	// period内のアイテムとそれ以前のitemsを取得
	queryItems() {
		this.items.forEach((item: Item)=>{
			if (moment(item.StartDate).isSame(moment(this.period), 'year')) {
				this.periodItems.push(item)
			} else if (moment(item.StartDate).isBefore(moment(this.period), 'year')) {
				this.beforePeriodItems.push(item)
			}
		})
	}

	// statisticsを計算
	calcStats() {
		this.periodItems.forEach((item: Item)=>{
			if (item.TradeType === TradeType.DEPOSIT || item.TradeType === TradeType.WITHDRAWAL) {
				this.stats.NumDepWith += 1
				this.stats.AmountDepWith += item.Profit
			} else if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				if (item.Profit < 0) {
					this.stats.TotalLoss += item.Profit
					this.stats.NumLose += 1
				} else if (item.Profit >= 0) {
					this.stats.TotalProfit += item.Profit
					this.stats.NumWin += 1
				}
			}
		})

		this.beforePeriodItems.forEach((item: Item)=>{
			if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				this.stats.ProfitBefore += item.Profit
			}
		})

		// num trade
		this.stats.NumTrade = this.stats.NumWin + this.stats.NumLose

		// total assets
		this.stats.TotalAssets =
			this.stats.TotalProfit +
			this.stats.TotalLoss +
			this.statsParam.InitialInvestment +
			this.stats.ProfitBefore

		// total
		this.stats.TotalProfitAndLoss = this.stats.TotalProfit + this.stats.TotalLoss

		// win rate
		if (this.stats.NumWin + this.stats.NumLose !== 0) {
			this.stats.WinRate =
				+((this.stats.NumWin * 100) / (this.stats.NumWin + this.stats.NumLose))
					.toFixed(1)
		}

		// profit ave, lose ave
		if (this.stats.NumWin !== 0) {
			this.stats.ProfitAve = this.stats.TotalProfit / this.stats.NumWin
		}
		if (this.stats.NumLose !== 0) {
			this.stats.LossAve = this.stats.TotalLoss / this.stats.NumLose
		}

		// profit ratio
		if (this.stats.LossAve === 0) {
			this.stats.ProfitRatio = Infinity
		} else {
			this.stats.ProfitRatio = -((this.stats.ProfitAve * 100) / this.stats.LossAve).toFixed(
				1
			)
		}
	}

	// graphデータを計算
	calcGraphData() {
		// 配列の初期化
		const monthOfYear = 12
		this.graphs.ProfitTransition = new Array(monthOfYear)
		this.graphs.DepoWithTransition = new Array(monthOfYear)
		this.graphs.TotalProfitTransition = new Array(monthOfYear)
		this.graphs.TotalAssetsTransition = new Array(monthOfYear)
		for (var i = 0; i < monthOfYear; i++) {
			const monthDate = moment([this.period.year(), i, 15, 1, 1])
			this.graphs.ProfitTransition[i] = <TransitionPoint>{ Date: monthDate, Value: 0 }
			this.graphs.DepoWithTransition[i] = <TransitionPoint>{ Date: monthDate, Value: 0 }
			this.graphs.TotalProfitTransition[i] = <TransitionPoint>{ Date: monthDate, Value: 0 }
			this.graphs.TotalAssetsTransition[i] = <TransitionPoint>{ Date: monthDate, Value: 0 }
		}

		this.periodItems.forEach((item: Item)=>{
			if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				this.graphs.ProfitTransition[moment(item.EndDate).month()].Value += item.Profit
			} else if (
				item.TradeType === TradeType.DEPOSIT ||
				item.TradeType === TradeType.WITHDRAWAL
			) {
				this.graphs.DepoWithTransition[moment(item.EndDate).month()].Value += item.Profit
			}

			// trade ratio
			switch (item.TradeType) {
				case TradeType.BUY:
					this.graphs.TradeTypeRatio.BUY += 1
					this.graphs.TradeTypeRatio.ALL += 1
					break
				case TradeType.SELL:
					this.graphs.TradeTypeRatio.SELL += 1
					this.graphs.TradeTypeRatio.ALL += 1
					break
				default:
					break
			}

			// pair ratio and pair profit
			if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				let hasPair = false
				this.graphs.PairRatio.forEach((elem, index) => {
					if (elem.Pair === item.Pair) {
						hasPair = true
						this.graphs.PairRatio[index].Num += 1
						this.graphs.PairRatio[index].Profit += item.Profit
					}
				})
				// Listにない場合、新しく追加
				if (!hasPair) {
					this.graphs.PairRatio.push(<PairRatio>{
						Pair: item.Pair,
						Num: 1,
						Profit: item.Profit,
					})
				}
			}
		})
		
	}

	// 結果を取得
	getResult(): StatsResult {
		return <StatsResult>{
			Statistics: this.stats,
			Graphs: this.graphs
		}
	}

}

export class MonthStatsBuilder extends Builder {
	private period: Moment
	private items: Item[]
	private statsParam: Content
	private periodItems: Item[] = []
	private beforePeriodItems: Item[] = []
	private stats: Statistics = new Statistics()
	private graphs: Graphs = new Graphs()

	constructor(items: Item[], period: Moment, statsParam: Content) {
		super()
		this.period = period
		this.items = items
		this.statsParam = statsParam
	}

	// period内のアイテムとそれ以前のitemsを取得
	queryItems() {
		this.items.forEach((item: Item)=>{
			if (moment(item.StartDate).isSame(moment(this.period), 'month')) {
				this.periodItems.push(item)
			} else if (moment(item.StartDate).isBefore(moment(this.period), 'month')) {
				this.beforePeriodItems.push(item)
			}
		})
		
	}

	// statisticsを計算
	calcStats() {
		this.periodItems.forEach((item: Item)=>{
			if (item.TradeType === TradeType.DEPOSIT || item.TradeType === TradeType.WITHDRAWAL) {
				this.stats.NumDepWith += 1
				this.stats.AmountDepWith += item.Profit
			} else if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				if (item.Profit < 0) {
					this.stats.TotalLoss += item.Profit
					this.stats.NumLose += 1
				} else if (item.Profit >= 0) {
					this.stats.TotalProfit += item.Profit
					this.stats.NumWin += 1
				}
			}
		})

		this.beforePeriodItems.forEach((item: Item)=>{
			if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				this.stats.ProfitBefore += item.Profit
			}
		})

		// num trade
		this.stats.NumTrade = this.stats.NumWin + this.stats.NumLose

		// total assets
		this.stats.TotalAssets =
			this.stats.TotalProfit +
			this.stats.TotalLoss +
			this.statsParam.InitialInvestment +
			this.stats.ProfitBefore

		// total
		this.stats.TotalProfitAndLoss = this.stats.TotalProfit + this.stats.TotalLoss

		// win rate
		if (this.stats.NumWin + this.stats.NumLose !== 0) {
			this.stats.WinRate =
				+((this.stats.NumWin * 100) / (this.stats.NumWin + this.stats.NumLose))
					.toFixed(1)
		}

		// profit ave, lose ave
		if (this.stats.NumWin !== 0) {
			this.stats.ProfitAve = this.stats.TotalProfit / this.stats.NumWin
		}
		if (this.stats.NumLose !== 0) {
			this.stats.LossAve = this.stats.TotalLoss / this.stats.NumLose
		}

		// profit ratio
		if (this.stats.LossAve === 0) {
			this.stats.ProfitRatio = Infinity
		} else {
			this.stats.ProfitRatio = -((this.stats.ProfitAve * 100) / this.stats.LossAve).toFixed(
				1
			)
		}
	}

	// graphデータを計算
	calcGraphData() {
		// 配列の初期化
		const dayOfMonth = this.period.daysInMonth()
		this.graphs.ProfitTransition = new Array(dayOfMonth)
		this.graphs.DepoWithTransition = new Array(dayOfMonth)
		this.graphs.TotalProfitTransition = new Array(dayOfMonth)
		this.graphs.TotalAssetsTransition = new Array(dayOfMonth)
		for (var i = 0; i < dayOfMonth; i++) {
			const dayDate = moment([this.period.year(), this.period.month(), i, 12, 1])
			this.graphs.ProfitTransition[i] = <TransitionPoint>{ Date: dayDate, Value: 0 }
			this.graphs.DepoWithTransition[i] = <TransitionPoint>{ Date: dayDate, Value: 0 }
			this.graphs.TotalProfitTransition[i] = <TransitionPoint>{ Date: dayDate, Value: 0 }
			this.graphs.TotalAssetsTransition[i] = <TransitionPoint>{ Date: dayDate, Value: 0 }
		}

		this.periodItems.forEach((item: Item)=>{
			if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				this.graphs.ProfitTransition[moment(item.EndDate).day()].Value += item.Profit
			} else if (
				item.TradeType === TradeType.DEPOSIT ||
				item.TradeType === TradeType.WITHDRAWAL
			) {
				this.graphs.DepoWithTransition[moment(item.EndDate).day()].Value += item.Profit
			}

			// trade ratio
			switch (item.TradeType) {
				case TradeType.BUY:
					this.graphs.TradeTypeRatio.BUY += 1
					this.graphs.TradeTypeRatio.ALL += 1
					break
				case TradeType.SELL:
					this.graphs.TradeTypeRatio.SELL += 1
					this.graphs.TradeTypeRatio.ALL += 1
					break
				default:
					break
			}

			// pair ratio and pair profit
			if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				let hasPair = false
				this.graphs.PairRatio.forEach((elem, index) => {
					if (elem.Pair === item.Pair) {
						hasPair = true
						this.graphs.PairRatio[index].Num += 1
						this.graphs.PairRatio[index].Profit += item.Profit
					}
				})
				// Listにない場合、新しく追加
				if (!hasPair) {
					this.graphs.PairRatio.push(<PairRatio>{
						Pair: item.Pair,
						Num: 1,
						Profit: item.Profit,
					})
				}
			}
		})
	}

	// 結果を取得
	getResult(): StatsResult {
		return <StatsResult>{
			Statistics: this.stats,
			Graphs: this.graphs
		}
	}

}

export class DayStatsBuilder extends Builder {
	private period: Moment
	private items: Item[]
	private statsParam: Content
	private periodItems: Item[] = []
	private beforePeriodItems: Item[] = []
	private stats: Statistics = new Statistics()
	private graphs: Graphs = new Graphs()

	constructor(items: Item[], period: Moment, statsParam: Content) {
		super()
		this.period = period
		this.items = items
		this.statsParam = statsParam
	}

	// period内のアイテムとそれ以前のitemsを取得
	queryItems() {
		this.items.forEach((item: Item)=>{
			if (moment(item.StartDate).isSame(moment(this.period), 'day')) {
				this.periodItems.push(item)
			} else if (moment(item.StartDate).isBefore(moment(this.period), 'day')) {
				this.beforePeriodItems.push(item)
			}
		})
		console.log("perioditem: ", this.periodItems, this.beforePeriodItems)
	}

	// statisticsを計算
	calcStats() {
		this.periodItems.forEach((item: Item)=>{
			if (item.TradeType === TradeType.DEPOSIT || item.TradeType === TradeType.WITHDRAWAL) {
				this.stats.NumDepWith += 1
				this.stats.AmountDepWith += item.Profit
			} else if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				if (item.Profit < 0) {
					this.stats.TotalLoss += item.Profit
					this.stats.NumLose += 1
				} else if (item.Profit >= 0) {
					this.stats.TotalProfit += item.Profit
					this.stats.NumWin += 1
				}
			}
		})
		
		this.beforePeriodItems.forEach((item: Item)=>{
			if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				this.stats.ProfitBefore += item.Profit
			}
		})

		// num trade
		this.stats.NumTrade = this.stats.NumWin + this.stats.NumLose

		// total assets
		this.stats.TotalAssets =
			this.stats.TotalProfit +
			this.stats.TotalLoss +
			this.statsParam.InitialInvestment +
			this.stats.ProfitBefore
		console.log("totalAssets: ", this.stats.TotalAssets)

		// total
		this.stats.TotalProfitAndLoss = this.stats.TotalProfit + this.stats.TotalLoss

		// win rate
		if (this.stats.NumWin + this.stats.NumLose !== 0) {
			this.stats.WinRate =
				+((this.stats.NumWin * 100) / (this.stats.NumWin + this.stats.NumLose))
					.toFixed(1)
		}

		// profit ave, lose ave
		if (this.stats.NumWin !== 0) {
			this.stats.ProfitAve = this.stats.TotalProfit / this.stats.NumWin
		}
		if (this.stats.NumLose !== 0) {
			this.stats.LossAve = this.stats.TotalLoss / this.stats.NumLose
		}

		// profit ratio
		if (this.stats.LossAve === 0) {
			this.stats.ProfitRatio = Infinity
		} else {
			this.stats.ProfitRatio = -((this.stats.ProfitAve * 100) / this.stats.LossAve).toFixed(
				1
			)
		}
	}

	// graphデータを計算
	calcGraphData() {
		// 配列の初期化
		const hourOfDay = 24
		this.graphs.ProfitTransition = new Array(hourOfDay)
		this.graphs.DepoWithTransition = new Array(hourOfDay)
		this.graphs.TotalProfitTransition = new Array(hourOfDay)
		this.graphs.TotalAssetsTransition = new Array(hourOfDay)
		for (var i = 0; i < hourOfDay; i++) {
			const hourDate = moment([this.period.year(), this.period.month(), this.period.day(), i, 1])
			this.graphs.ProfitTransition[i] = <TransitionPoint>{ Date: hourDate, Value: 0 }
			this.graphs.DepoWithTransition[i] = <TransitionPoint>{ Date: hourDate, Value: 0 }
			this.graphs.TotalProfitTransition[i] = <TransitionPoint>{ Date: hourDate, Value: 0 }
			this.graphs.TotalAssetsTransition[i] = <TransitionPoint>{ Date: hourDate, Value: this.statsParam.InitialInvestment }
		}

		this.periodItems.forEach((item: Item)=>{
			if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				this.graphs.ProfitTransition[moment(item.EndDate).hour()].Value += item.Profit
				// TotalAssets, totalProfit, 累積を求める
				for (let i = 0; i < hourOfDay; i++) {
					if (i >= moment(item.EndDate).hour()) {
						this.graphs.TotalProfitTransition[i].Value += item.Profit
						this.graphs.TotalAssetsTransition[i].Value += item.Profit
					}
				}
			} else if (
				item.TradeType === TradeType.DEPOSIT ||
				item.TradeType === TradeType.WITHDRAWAL
			) {
				this.graphs.DepoWithTransition[moment(item.EndDate).hour()].Value += item.Profit
			}

			// trade ratio
			switch (item.TradeType) {
				case TradeType.BUY:
					this.graphs.TradeTypeRatio.BUY += 1
					this.graphs.TradeTypeRatio.ALL += 1
					break
				case TradeType.SELL:
					this.graphs.TradeTypeRatio.SELL += 1
					this.graphs.TradeTypeRatio.ALL += 1
					break
				default:
					break
			}

			// pair ratio and pair profit
			if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				let hasPair = false
				this.graphs.PairRatio.forEach((elem, index) => {
					if (elem.Pair === item.Pair) {
						hasPair = true
						this.graphs.PairRatio[index].Num += 1
						this.graphs.PairRatio[index].Profit += item.Profit
					}
				})
				// Listにない場合、新しく追加
				if (!hasPair) {
					this.graphs.PairRatio.push(<PairRatio>{
						Pair: item.Pair,
						Num: 1,
						Profit: item.Profit,
					})
				}
			}
		})
	}

	// 結果を取得
	getResult(): StatsResult {
		return <StatsResult>{
			Statistics: this.stats,
			Graphs: this.graphs
		}
	}

}

export class AllStatsBuilder extends Builder {
	private period: Moment
	private items: Item[]
	private statsParam: Content
	private periodItems: Item[] = []
	private beforePeriodItems: Item[] = []
	private stats: Statistics = new Statistics()
	private graphs: Graphs = new Graphs()

	constructor(items: Item[], period: Moment, statsParam: Content) {
		super()
		this.period = period
		this.items = items
		this.statsParam = statsParam
	}

	// period内のアイテムとそれ以前のitemsを取得
	queryItems() {
		this.items.forEach((item: Item)=>{
			this.periodItems.push(item)
		})

		console.log("ALL")
	}

	// statisticsを計算
	calcStats() {
		this.periodItems.forEach((item: Item)=>{
			if (item.TradeType === TradeType.DEPOSIT || item.TradeType === TradeType.WITHDRAWAL) {
				this.stats.NumDepWith += 1
				this.stats.AmountDepWith += item.Profit
			} else if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				if (item.Profit < 0) {
					this.stats.TotalLoss += item.Profit
					this.stats.NumLose += 1
				} else if (item.Profit >= 0) {
					this.stats.TotalProfit += item.Profit
					this.stats.NumWin += 1
				}
			}
		})

		// num trade
		this.stats.NumTrade = this.stats.NumWin + this.stats.NumLose

		// total assets
		this.stats.TotalAssets =
			this.stats.TotalProfit +
			this.stats.TotalLoss +
			this.statsParam.InitialInvestment +
			this.stats.ProfitBefore

		// total
		this.stats.TotalProfitAndLoss = this.stats.TotalProfit + this.stats.TotalLoss

		// win rate
		if (this.stats.NumWin + this.stats.NumLose !== 0) {
			this.stats.WinRate =
				+((this.stats.NumWin * 100) / (this.stats.NumWin + this.stats.NumLose))
					.toFixed(1)
		}

		// profit ave, lose ave
		if (this.stats.NumWin !== 0) {
			this.stats.ProfitAve = this.stats.TotalProfit / this.stats.NumWin
		}
		if (this.stats.NumLose !== 0) {
			this.stats.LossAve = this.stats.TotalLoss / this.stats.NumLose
		}

		// profit ratio
		if (this.stats.LossAve === 0) {
			this.stats.ProfitRatio = Infinity
		} else {
			this.stats.ProfitRatio = -((this.stats.ProfitAve * 100) / this.stats.LossAve).toFixed(
				1
			)
		}
	}

	// graphデータを計算
	calcGraphData() {
		// 配列の初期化
		const dayOfMonth = this.period.daysInMonth()
		this.graphs.ProfitTransition = new Array(dayOfMonth)
		this.graphs.DepoWithTransition = new Array(dayOfMonth)
		this.graphs.TotalProfitTransition = new Array(dayOfMonth)
		this.graphs.TotalAssetsTransition = new Array(dayOfMonth)
		for (var i = 0; i < dayOfMonth; i++) {
			const dayDate = moment([this.period.year(), this.period.month(), i, 12, 1])
			this.graphs.ProfitTransition[i] = <TransitionPoint>{ Date: dayDate, Value: 0 }
			this.graphs.DepoWithTransition[i] = <TransitionPoint>{ Date: dayDate, Value: 0 }
			this.graphs.TotalProfitTransition[i] = <TransitionPoint>{ Date: dayDate, Value: 0 }
			this.graphs.TotalAssetsTransition[i] = <TransitionPoint>{ Date: dayDate, Value: 0 }
		}

		this.periodItems.forEach((item: Item)=>{
			if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				this.graphs.ProfitTransition[moment(item.EndDate).day()].Value += item.Profit
			} else if (
				item.TradeType === TradeType.DEPOSIT ||
				item.TradeType === TradeType.WITHDRAWAL
			) {
				this.graphs.DepoWithTransition[moment(item.EndDate).day()].Value += item.Profit
			}

			// trade ratio
			switch (item.TradeType) {
				case TradeType.BUY:
					this.graphs.TradeTypeRatio.BUY += 1
					this.graphs.TradeTypeRatio.ALL += 1
					break
				case TradeType.SELL:
					this.graphs.TradeTypeRatio.SELL += 1
					this.graphs.TradeTypeRatio.ALL += 1
					break
				default:
					break
			}

			// pair ratio and pair profit
			if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				let hasPair = false
				this.graphs.PairRatio.forEach((elem, index) => {
					if (elem.Pair === item.Pair) {
						hasPair = true
						this.graphs.PairRatio[index].Num += 1
						this.graphs.PairRatio[index].Profit += item.Profit
					}
				})
				// Listにない場合、新しく追加
				if (!hasPair) {
					this.graphs.PairRatio.push(<PairRatio>{
						Pair: item.Pair,
						Num: 1,
						Profit: item.Profit,
					})
				}
			}
		})
	}

	// 結果を取得
	getResult(): StatsResult {
		return <StatsResult>{
			Statistics: this.stats,
			Graphs: this.graphs
		}
	}

}
