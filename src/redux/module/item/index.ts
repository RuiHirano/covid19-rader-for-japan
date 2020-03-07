import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { Item } from '../../../types';

const actionCreator = actionCreatorFactory();

export const initialState: Item[] = []

export enum ItemActions {
	CREATE_ITEMS = "CREATE_ITEMS",	// itemsの作成
	CREATE_ITEM = "CREATE_ITEM",	// itemの作成
	UPDATE_ITEM = "UPDATE_ITEM",	// itemの更新
	DELETE_ITEM = "DELETE_ITEM",	// itemの削除
}

export const itemActions = {
	createItems: actionCreator<Item[]>(ItemActions.CREATE_ITEMS),
	createItem: actionCreator<Item>(ItemActions.CREATE_ITEM),
	updateItem: actionCreator<Item>(ItemActions.UPDATE_ITEM),
	deleteItem: actionCreator<Item>(ItemActions.DELETE_ITEM),
};

const itemModule = reducerWithInitialState(initialState)
	.case(itemActions.createItem, (preItems, items) => {
		// 複数新規作成
		const newItems = preItems.concat(items)
		return {...newItems}
	})
	.case(itemActions.createItem, (items, item) => {
		// 新規作成
		items.push(item)
		return {...items}
	})
	.case(itemActions.updateItem, (items, item) => {
		// 更新
		const newItems = [...items]
		items.forEach((_item, index)=>{
			if(item.ID === _item.ID){
				newItems[index] = item
			}
		})

		return {...newItems}
	})
	.case(itemActions.deleteItem, (items, item) => {
		// 削除
		const newItems = [...items]
		items.forEach((_item, index)=>{
			if(item.ID === _item.ID){
				newItems.splice(index, 1)
			}
		})

		return {...newItems}
	})


export default itemModule