import moment, { Moment } from 'moment'
import { Item } from './item';
import { Aggregate, Iterator } from './iterator';
import { DayStatsBuilder, MonthStatsBuilder, YearStatsBuilder, StatsResult, AllStatsBuilder } from './statistics';
import { Builder, StatsGuide } from './builder';
import { Content } from './user';

export enum PeriodType {
	DAY,
	MONTH,
	YEAR,
	ALL,
}

interface QueryItemsProps {
	PeriodItems: Item[]
	BeforePeriodItems: Item[]
}


export class ItemsIterator implements Iterator {

	private items: Items
	private index = 0

	constructor(items: Items) {
		this.items = items
	}

	public hasNext(): boolean {
		if (this.index < this.items.getLength()) {
			return true
		} else {
			return false
		}
	}

	public next(): Item {
		const item: Item = this.items.getItemAt(this.index)
		this.index++
		return item
	}
}


export class Items implements Aggregate {

	items: Item[]

	constructor(items: Item[]) {
		this.items = items
	}

	appendItem(item: Item) {
		this.items[this.items.length] = item
	}

	deleteItem(index: number) {
		this.items.splice(index, 1)
	}

	updateItem(index: number, item: Item) {
		this.items.splice(index, 1, item)
	}

	getLength() {
		return this.items.length
	}

	getItemAt(index: number) {
		return this.items[index]
	}

	// iterator pattern
	iterator(): Iterator {
		return new ItemsIterator(this)
	}

	// builder pattern
	calculator(period: Moment, periodType: PeriodType, statsParam: Content): StatsResult {
		var builder: Builder = new AllStatsBuilder(this, period, statsParam)
		switch (periodType) {
			case PeriodType.DAY:
				console.log("DAY", period)
				builder = new DayStatsBuilder(this, period, statsParam)
				break
			case PeriodType.MONTH:
				builder = new MonthStatsBuilder(this, period, statsParam)
				break
			case PeriodType.YEAR:
				builder = new YearStatsBuilder(this, period, statsParam)
				break
		}

		console.log("guide", builder)
		const guide: StatsGuide = new StatsGuide(builder)
		guide.construct()
		return builder.getResult()
	}
}
