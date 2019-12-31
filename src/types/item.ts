import uuid from "uuid"
import moment from "moment"

export enum MarketType {
	FX,
	STOCK,
}

export enum TradeType {
	BUY,
	SELL,
	RECORD,
	WITHDRAWAL,
	DEPOSIT,
}

export interface Image {
	url: string,
	size: number,
}

export interface a {
	id: number
	get(): void
}

export class b implements a {
	id = 8

	constructor() {

	}

	get() {

	}

	set() {

	}
}

export class Item {
	ID: string
	MarketType: MarketType
	StartDate: string
	EndDate: string
	TradeType: TradeType
	Pair: string
	Lot: number
	EntryRate: number
	LossCutRate: number
	SettleRate: number
	Profit: number
	BeforeComment: string
	AfterComment: string
	Tags: string[]
	Images: Image[]
	UpdatedAt: string
	CreatedAt: string

	constructor() {
		this.ID = moment().toISOString() + uuid()
		this.MarketType = MarketType.FX
		this.StartDate = moment().toISOString()
		this.EndDate = moment().toISOString()
		this.TradeType = TradeType.BUY
		this.Pair = ""
		this.Lot = 0
		this.EntryRate = 0
		this.LossCutRate = 0
		this.SettleRate = 0
		this.Profit = 0
		this.BeforeComment = ""
		this.AfterComment = ""
		this.Tags = []
		this.Images = []
		this.UpdatedAt = moment().toISOString()
		this.CreatedAt = moment().toISOString()
	}

	setID(id: string) {
		this.ID = id
	}

	setStartDate(startDate: string) {
		this.StartDate = startDate
	}

	setEndDate(endDate: string) {
		this.EndDate = endDate
	}

	setTradeType(tradeType: TradeType) {
		this.TradeType = tradeType
	}

	setPair(pair: string) {
		this.Pair = pair
	}

	setLot(lot: number) {
		this.Lot = lot
	}

	setEntryRate(entryRate: number) {
		this.EntryRate = entryRate
	}

	setLossCutRate(lossCutRate: number) {
		this.LossCutRate = lossCutRate
	}

	setSettleRate(settleRate: number) {
		this.SettleRate = settleRate
	}

	setProfit(profit: number) {
		this.Profit = profit
	}

	setBeforeComment(beforeComment: string) {
		this.BeforeComment = beforeComment
	}

	setAfterComment(afterComment: string) {
		this.AfterComment = afterComment
	}

	setTags(tags: string[]) {
		this.Tags = tags
	}

	setImages(images: Image[]) {
		this.Images = images
	}

	setUpdatedAt(updatedAt: string) {
		this.UpdatedAt = updatedAt
	}

	setCreatedAt(createdAt: string) {
		this.CreatedAt = createdAt
	}

}