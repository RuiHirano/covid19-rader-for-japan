import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { Item } from '../../../types/types'
import { ItemClass } from '../../../types/item';

const actionCreator = actionCreatorFactory();

export const initialState: ItemClass[] = [new ItemClass(), new ItemClass(), new ItemClass()]

export enum ItemActions {
	UPDATE_ITEMS_STORE = "UPDATE_ITEMS_STORE",
}

export const itemActions = {
	updateItemsStore: actionCreator<ItemClass[]>(ItemActions.UPDATE_ITEMS_STORE),
};

export const itemModule = reducerWithInitialState(initialState)
	.case(itemActions.updateItemsStore, (state, action) => {
		const items = action
		return items
	})

