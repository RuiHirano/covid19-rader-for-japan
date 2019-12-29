import { MarketType, TradeType, Image, Item, PeriodType, Items } from "../../types"
import uuid from "uuid"
import { Moment } from "moment"

export class ReportStats {
	InitialInvethisment: number
	AllowableLossRate: number
	BankruptcyReductionRate: number
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

	constructor(items: Items, periodType: PeriodType, period: Moment, initialInvethisment: number, allowableLossRate: number, bankruptcyReductionRate: number) {
		this.InitialInvethisment = initialInvethisment
		this.AllowableLossRate = allowableLossRate
		this.BankruptcyReductionRate = bankruptcyReductionRate
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

	}

}