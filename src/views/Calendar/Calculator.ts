import moment, { Moment } from 'moment'
import { Item, PeriodType } from '../../types';

interface QueryItemsProps {
	PeriodItems: Item[]
	BeforePeriodItems: Item[]
}

export class Calculator {
	items: Item[]
	periodType: PeriodType
	period: Moment
	periodItems: Item[]
	beforePeriodItems: Item[]
	constructor(items: Item[], periodType: PeriodType, period: Moment) {
		this.items = items
		this.periodType = periodType
		this.period = period
		const { PeriodItems, BeforePeriodItems } = this.queryItems()
		this.periodItems = PeriodItems
		this.beforePeriodItems = BeforePeriodItems
	}

	changePeriod(period: Moment) {
		this.period = period
		const { PeriodItems, BeforePeriodItems } = this.queryItems()
		this.periodItems = PeriodItems
		this.beforePeriodItems = BeforePeriodItems
		console.log(this.periodItems)
	}

	// itemsからperiod内のアイテムを取得する
	queryItems(): QueryItemsProps {
		let periodItems: Item[] = []
		let beforePeriodItems: Item[] = []
		for (var i = 0; i < (this.items).length; i++) {
			const item = this.items[i]
			switch (this.periodType) {
				case PeriodType.DAY:
					if (moment(item.StartDate).isSame(moment(this.period), 'days')) {
						periodItems.push(item)
					} else if (moment(item.StartDate).isBefore(moment(this.period), 'days')) {
						beforePeriodItems.push(item)
					}
					break
				case PeriodType.MONTH:
					if (moment(item.StartDate).isSame(moment(this.period), 'month')) {
						periodItems.push(item)
					} else if (moment(item.StartDate).isBefore(moment(this.period), 'month')) {
						beforePeriodItems.push(item)
					}
					break
				case PeriodType.YEAR:
					if (moment(item.StartDate).isSame(moment(this.period), 'year')) {
						periodItems.push(item)
					} else if (moment(item.StartDate).isBefore(moment(this.period), 'year')) {
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
		return this.items
	}

	getPeriodItems(): Item[] {
		return this.periodItems
	}

	getPeriodType(): PeriodType {
		return this.periodType
	}

	getPeriod(): Moment {
		return moment(this.period)
	}

	getStatistics() {

	}
}
