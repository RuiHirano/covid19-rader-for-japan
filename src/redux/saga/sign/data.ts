import { Item, User } from '../../../types'

export const defaultItems = () => {
	let items: Item[] = []
	let item1 = new Item()
	item1.Pair = "USD/JPY"
	item1.Profit = 4500
	item1.EntryRate = 112.342
	item1.LossCutRate = 112.332
	item1.SettleRate = 112.392
	item1.Lot = 0.35

	let item2 = new Item()
	item2.Pair = "EUR/USD"
	item2.Profit = 3500
	item2.EntryRate = 112.342
	item2.LossCutRate = 112.332
	item2.SettleRate = 112.372
	item2.Lot = 0.45

	let item3 = new Item()
	item3.Pair = "GBP/USD"
	item3.Profit = -2500
	item3.EntryRate = 112.342
	item3.LossCutRate = 112.352
	item3.SettleRate = 112.362
	item3.Lot = 0.15

	items.push(item1)
	items.push(item2)
	items.push(item3)
	return []
}


export const defaultUser = () => {
	let user = new User()
	return user
} 