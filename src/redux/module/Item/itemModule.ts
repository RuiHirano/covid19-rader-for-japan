import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { Item, Items } from '../../../types';

const actionCreator = actionCreatorFactory();

export const initialState: Items = new Items([new Item(), new Item(), new Item()])

export enum ItemActions {
	UPDATE_ITEMS_STORE = "UPDATE_ITEMS_STORE",
}

export const itemActions = {
	updateItemsStore: actionCreator<Items>(ItemActions.UPDATE_ITEMS_STORE),
};

export const itemModule = reducerWithInitialState(initialState)
	.case(itemActions.updateItemsStore, (state, action) => {
		const items: Items = action
		return items
	})

