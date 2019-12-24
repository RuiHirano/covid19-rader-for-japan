import { MarketType, TradeType, Image, Item } from "./types"
import uuid from "uuid"
import moment from "moment"

export class ItemClass {
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

	getItem(): Item {
		const item: Item = {
			ID: this.ID,
			MarketType: this.MarketType,
			StartDate: this.StartDate,
			EndDate: this.EndDate,
			TradeType: this.TradeType,
			Pair: this.Pair,
			Lot: this.Lot,
			EntryRate: this.EntryRate,
			LossCutRate: this.LossCutRate,
			SettleRate: this.SettleRate,
			Profit: this.Profit,
			BeforeComment: this.BeforeComment,
			AfterComment: this.AfterComment,
			Tags: this.Tags,
			Images: this.Images,
			UpdatedAt: this.UpdatedAt,
			CreatedAt: this.CreatedAt,
		}
		return item
	}

	setItem(item: Item) {
		this.ID = item.ID
		this.MarketType = item.MarketType
		this.StartDate = item.StartDate
		this.EndDate = item.EndDate
		this.TradeType = item.TradeType
		this.Pair = item.Pair
		this.Lot = item.Lot
		this.EntryRate = item.EntryRate
		this.LossCutRate = item.LossCutRate
		this.SettleRate = item.SettleRate
		this.Profit = item.Profit
		this.BeforeComment = item.BeforeComment
		this.AfterComment = item.AfterComment
		this.Tags = item.Tags
		this.Images = item.Images
		this.UpdatedAt = item.UpdatedAt
		this.CreatedAt = item.CreatedAt
	}

}