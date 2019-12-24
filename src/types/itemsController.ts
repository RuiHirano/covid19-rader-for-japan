import moment, { Moment } from 'moment'
import { Item, PeriodType } from './types';
import { ItemClass } from './item';

interface QueryItemsProps {
	PeriodItems: Item[]
	BeforePeriodItems: Item[]
}

export class ItemsController {

	Items: ItemClass[]
	PeriodType: PeriodType
	Period: Moment
	PeriodItems: Item[]
	BeforePeriodItems: Item[]

	constructor(items: ItemClass[], periodType: PeriodType, period: Moment) {
		this.Items = items
		this.PeriodType = periodType
		this.Period = period
		const { PeriodItems, BeforePeriodItems } = this.queryItems()
		this.PeriodItems = PeriodItems
		this.BeforePeriodItems = BeforePeriodItems
	}

	// 対象期間を変更する
	changePeriod(period: Moment) {
		this.Period = period
		const { PeriodItems, BeforePeriodItems } = this.queryItems()
		this.PeriodItems = PeriodItems
		this.BeforePeriodItems = BeforePeriodItems
	}

	// 対象期間の範囲を変更する
	changePeriodType(periodType: PeriodType) {
		this.PeriodType = periodType
		const { PeriodItems, BeforePeriodItems } = this.queryItems()
		this.PeriodItems = PeriodItems
		this.BeforePeriodItems = BeforePeriodItems
	}

	// itemsからperiod内のアイテムを取得する
	queryItems(): QueryItemsProps {
		let periodItems: Item[] = []
		let beforePeriodItems: Item[] = []
		for (var i = 0; i < (this.Items).length; i++) {
			const item = this.Items[i]
			switch (this.PeriodType) {
				case PeriodType.DAY:
					if (moment(item.StartDate).isSame(moment(this.Period), 'days')) {
						periodItems.push(item)
					} else if (moment(item.StartDate).isBefore(moment(this.Period), 'days')) {
						beforePeriodItems.push(item)
					}
					break
				case PeriodType.MONTH:
					if (moment(item.StartDate).isSame(moment(this.Period), 'month')) {
						periodItems.push(item)
					} else if (moment(item.StartDate).isBefore(moment(this.Period), 'month')) {
						beforePeriodItems.push(item)
					}
					break
				case PeriodType.YEAR:
					if (moment(item.StartDate).isSame(moment(this.Period), 'year')) {
						periodItems.push(item)
					} else if (moment(item.StartDate).isBefore(moment(this.Period), 'year')) {
						beforePeriodItems.push(item)
					}
					break
				case PeriodType.ALL:
					periodItems.push(item)
					break
			}

		}
		return { PeriodItems: periodItems, BeforePeriodItems: beforePeriodItems }
	}

	getItems(): Item[] {
		return this.Items
	}

	getPeriodItems(): Item[] {
		return this.PeriodItems
	}

	getPeriodType(): PeriodType {
		return this.PeriodType
	}

	getPeriod(): Moment {
		return moment(this.Period)
	}

	getStatistics() {

	}
}
