import { Item } from './item';

export interface Iterator {
	next(): Item;
	hasNext(): boolean
}

export interface Aggregate {
	// itemの反復
	iterator(): Iterator
}

