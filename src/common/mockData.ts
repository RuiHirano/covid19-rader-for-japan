import { Item, MarketType, TradeType } from "../types";
import uuid from "uuid";
import moment from "moment";


export const mockItems: Item[] = [
	{
		ID: uuid(),
		MarketType: MarketType.FX,
		StartDate: moment([2019, 10, 10]).toISOString(),
		EndDate: moment([2019, 10, 10]).toISOString(),
		TradeType: TradeType.BUY,
		Pair: "USD/JPY",
		Lot: 2.0,
		EntryRate: 1.0,
		LossCutRate: 1.0,
		SettleRate: 1.0,
		Profit: 1.0,
		BeforeComment: "good",
		AfterComment: "good",
		Tags: [],
		Images: [],
		UpdatedAt: moment([2019, 10, 10]).toISOString(),
		CreatedAt: moment([2019, 10, 10]).toISOString()
	},
	{
		ID: uuid(),
		MarketType: MarketType.FX,
		StartDate: moment([2019, 10, 10]).toISOString(),
		EndDate: moment([2019, 10, 10]).toISOString(),
		TradeType: TradeType.BUY,
		Pair: "USD/JPY",
		Lot: 2.0,
		EntryRate: 1.0,
		LossCutRate: 1.0,
		SettleRate: 1.0,
		Profit: 1.0,
		BeforeComment: "good",
		AfterComment: "good",
		Tags: [],
		Images: [],
		UpdatedAt: moment([2019, 10, 10]).toISOString(),
		CreatedAt: moment([2019, 10, 10]).toISOString()
	},
	{
		ID: uuid(),
		MarketType: MarketType.FX,
		StartDate: moment([2019, 11, 10]).toISOString(),
		EndDate: moment([2019, 11, 10]).toISOString(),
		TradeType: TradeType.BUY,
		Pair: "USD/JPY",
		Lot: 2.0,
		EntryRate: 1.0,
		LossCutRate: 1.0,
		SettleRate: 1.0,
		Profit: 1.0,
		BeforeComment: "good",
		AfterComment: "good",
		Tags: [],
		Images: [],
		UpdatedAt: moment([2019, 11, 10]).toISOString(),
		CreatedAt: moment([2019, 11, 10]).toISOString()
	},
	{
		ID: uuid(),
		MarketType: MarketType.FX,
		StartDate: moment([2019, 4, 10]).toISOString(),
		EndDate: moment([2019, 4, 10]).toISOString(),
		TradeType: TradeType.BUY,
		Pair: "USD/JPY",
		Lot: 2.0,
		EntryRate: 1.0,
		LossCutRate: 1.0,
		SettleRate: 1.0,
		Profit: 1.0,
		BeforeComment: "good",
		AfterComment: "good",
		Tags: [],
		Images: [],
		UpdatedAt: moment([2019, 4, 10]).toISOString(),
		CreatedAt: moment([2019, 4, 10]).toISOString()
	}
];