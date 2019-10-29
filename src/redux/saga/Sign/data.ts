import {MarketType, TradeType, Item, User, Notification, Content, Profile, Setting, Language, Plan, Device} from '../../../types'
import moment from 'moment'

export const defaultItems: Item[] = [
	<Item>{
		ID: moment().valueOf(),
		MarketType: MarketType.FX,
		TradeType: TradeType.BUY,
		StartDate: moment().valueOf().toString(),
		EndDate: moment().add(3, 'hours').valueOf().toString(),
		Pair: 'USD/JPY',
		Lot: '0.35',
		EntryRate: '112.342',
		LossCutRate: '112.332',
		SettleRate: '112.392',
		Profit: '4500',
		BeforeComment: "i18n.t('ii_1_before_comment')",
		AfterComment: "i18n.t('ii_1_after_comment')",
		Tags: ["Good"],
		Images: [],
		UpdatedAt: moment().valueOf().toString(),
		CreatedAt: moment().valueOf().toString(),
	},
	<Item>{
		ID: moment().valueOf() + 1,
		MarketType: MarketType.FX,
		TradeType: TradeType.BUY,
		StartDate: moment()
			.add(1, 'days')
			.valueOf().toString(),
		EndDate: moment()
			.add(1, 'days')
			.add(4, 'hours')
			.valueOf().toString(),
		Pair: 'EUR/USD',
		Lot: '0.2',
		EntryRate: '112.532',
		LossCutRate: '112.432',
		SettleRate: '112.892',
		Profit: '3000',
		Tags: ["Good"],
		BeforeComment: "i18n.t('ii_2_before_comment')",
		AfterComment: "i18n.t('ii_1_after_comment')",
		Images: [],
		UpdatedAt: moment().valueOf().toString(),
		CreatedAt: moment().valueOf().toString(),
	},
	<Item>{
		ID: moment().valueOf() + 2,
		MarketType: MarketType.FX,
		TradeType: TradeType.BUY,
		StartDate: moment()
			.add(2, 'days')
			.valueOf().toString(),
		EndDate: moment()
			.add(3, 'days')
			.add(2, 'hours')
			.valueOf().toString(),
		Pair: 'GBP/USD',
		Lot: '0.05',
		EntryRate: '112.462',
		LossCutRate: '112.352',
		SettleRate: '112.352',
		Profit: '-4500',
		Tags: ["Bad"],
		BeforeComment: "i18n.t('ii_3_before_comment')",
		AfterComment: "i18n.t('ii_1_after_comment')",
		Images: [],
		UpdatedAt: moment().valueOf().toString(),
		CreatedAt: moment().valueOf().toString(),
	},
]

const defaultLanguage = Language.ja
const notification: Notification = {
    Email: true,
    Push: true,
}

const currencies: Content["Currencies"] = [
    { pair: 'USD/JPY', color: 'blue' },
    { pair: 'GBP/USD', color: 'red' },
    { pair: 'EUR/USD', color: 'green' },
]

const stocks: Content["Stocks"] = [
    { pair: '1204', color: 'blue' },
    { pair: '2345', color: 'green' },
    { pair: '6315', color: 'red' },
]
		
export const defaultUser: User = {
	ID: 0,
	Profile: <Profile>{
		Name: "",
		Age: "",
		Sex: "",
		Message: "",
		Thumbnail: "",
	},
	Setting: <Setting>{
		Email: "",
		Language: defaultLanguage,
		Notification: notification,
		Plan: Plan.FREE,
		Device: Device.PC,
		BankAccount: {
			AccountNumber: "",
		},
		Content: {
			InitialInvestment: 500000,
			AllowableLossRate: 2,
			BankruptcyReductionRate: 20,
			Currencies: currencies,
			Stocks: stocks,
			SearchTags: [],
		}
	}
}