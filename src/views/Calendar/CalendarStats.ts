import { MarketType, TradeType, Image, Item, PeriodType } from "../../types"
import uuid from "uuid"
import { Moment } from "moment"
import { ItemClass } from "../../types/item"
import { ItemsController } from "../../types/itemsController"

export class CalendarStats extends ItemsController {
	InitialInvethisment: number
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

	constructor(items: ItemClass[], periodType: PeriodType, period: Moment, initialInvethisment: number) {
		super(items, periodType, period)
		this.InitialInvethisment = initialInvethisment
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

		this.calcStatistics()
	}

	calcStatistics() {
		this.PeriodItems.forEach((item) => {
			if (item.TradeType === TradeType.DEPOSIT || item.TradeType === TradeType.WITHDRAWAL) {
				this.NumDepWith += 1
				this.AmountDepWith += item.Profit
			} else if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				if (item.Profit < 0) {
					this.TotalLoss += item.Profit
					this.NumLose += 1
				} else if (item.Profit >= 0) {
					this.TotalProfit += item.Profit
					this.NumWin += 1
				}
			}
		})

		this.BeforePeriodItems.forEach((item) => {
			if (item.TradeType === TradeType.BUY || item.TradeType === TradeType.SELL) {
				this.ProfitBefore += item.Profit
			}
		})

		// num trade
		this.NumTrade = this.NumWin + this.NumLose

		// total assets
		this.TotalAssets =
			this.TotalProfit +
			this.TotalLoss +
			this.InitialInvethisment +
			this.ProfitBefore

		// total
		this.TotalProfitAndLoss = this.TotalProfit + this.TotalLoss

		// win rate
		if (this.NumWin + this.NumLose !== 0) {
			this.WinRate =
				+((this.NumWin * 100) / (this.NumWin + this.NumLose))
					.toFixed(1)
		}

		// profit ave, lose ave
		if (this.NumWin !== 0) {
			this.ProfitAve = this.TotalProfit / this.NumWin
		}
		if (this.NumLose !== 0) {
			this.LossAve = this.TotalLoss / this.NumLose
		}

		// profit ratio
		if (this.LossAve === 0) {
			this.ProfitRatio = Infinity
		} else {
			this.ProfitRatio = -((this.ProfitAve * 100) / this.LossAve).toFixed(
				1
			)
		}
	}

}