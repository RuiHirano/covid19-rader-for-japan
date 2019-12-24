import { MarketType, TradeType, Item, User, Notification, Content, Profile, Setting, Language, Plan, Device } from '../../../types'
import moment from 'moment'
import uuid from 'uuid/v1';
import { ItemClass } from '../../../types/item';
import { UserClass } from '../../../types/user';


export const defaultItems = () => {
	let items: ItemClass[] = []
	let item1 = new ItemClass()
	item1.Profit = 4500
	item1.EntryRate = 112.342
	item1.LossCutRate = 112.332
	item1.SettleRate = 112.392
	item1.Lot = 0.35

	let item2 = new ItemClass()
	item2.Profit = 3500
	item2.EntryRate = 112.342
	item2.LossCutRate = 112.332
	item2.SettleRate = 112.372
	item2.Lot = 0.45

	let item3 = new ItemClass()
	item3.Profit = -2500
	item3.EntryRate = 112.342
	item3.LossCutRate = 112.352
	item3.SettleRate = 112.362
	item3.Lot = 0.15

	items.push(item1)
	items.push(item2)
	items.push(item3)
	return items
}


export const defaultUser = () => {
	let user = new UserClass()
	return user
} 