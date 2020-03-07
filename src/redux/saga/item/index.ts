import { takeEvery } from 'redux-saga/effects'
import { select } from 'redux-saga/effects'
import { getItems, getUser } from '../selector'
import uuid from 'uuid/v1';
/*import {
	updateLoadingStore,
	updateErrorStore,
	updateItemsStore,
	uploadImageStorage,
	updateItemFirestore,
	deleteImageStorage,
	deleteItemFirestore,
} from '../util-saga'
import actionCreatorFactory from 'typescript-fsa';
import { Item, Loading, LoadingState, Error, User, Items } from '../../../types'

import moment from 'moment'

const actionCreator = actionCreatorFactory();

export interface CreateItemState {
	item: Item,
}

export interface UpdateItemState {
	item: Item,
}

export interface DeleteItemState {
	item: Item,
}

export enum ItemActions {
	CREATE_ITEM_ACTION = "CREATE_ITEM_ACTION",
	UPDATE_ITEM_ACTION = "UPDATE_ITEM_ACTION",
	DELETE_ITEM_ACTION = "DELETE_ITEM_ACTION",
}

export const itemActions = {
	createItemAction: actionCreator<CreateItemState>('CREATE_ITEM_ACTION'),
	updateItemAction: actionCreator<UpdateItemState>('UPDATE_ITEM_ACTION'),
	deleteItemAction: actionCreator<DeleteItemState>('DELETE_ITEM_ACTION'),
};


function* handleCreateItem(action: ReturnType<typeof itemActions.createItemAction>) {
	try {
		const { item } = action.payload

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// loading開始
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.CREATE_ITEM
		}
		yield updateLoadingStore(loading)

		// userId itemId
		const user: User = yield select(getUser)
		//const userId = user.ID
		const itemId = moment().toISOString() + uuid()
		item.ID = itemId

		// 画像をStorageへ保存
		const images: Item["Images"] = yield uploadImageStorage(item.Images, user.ID, itemId)

		// imageを更新
		item.Images = images


		// Itemをfirebaseへ保存
		yield updateItemFirestore(item, user)

		// itemをStoreへ保存
		const items: Items = yield select(getItems)
		items.appendItem(item)
		yield updateItemsStore(items)

		// loading終了
		loading.IsLoading = false
		yield updateLoadingStore(loading)

	} catch ({ code, message }) {
		// error発生
		const errorMessage = "checkErrorCode(code)"
		let error = <Error>{
			IsError: true,
			Status: errorMessage,
		}
		yield updateErrorStore(error)

		// Loading終了
		let loading = <Loading>{
			IsLoading: false,
			LoadingState: LoadingState.CREATE_ITEM
		}
		yield updateLoadingStore(loading)

		console.log('Create Item error... \n', code, message)
	}
}

function* handleUpdateItem(action: ReturnType<typeof itemActions.updateItemAction>) {
	try {
		const { item } = action.payload

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// loading true
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_ITEM
		}
		yield updateLoadingStore(loading)
		// modified item
		const user: User = yield select(getUser)
		//const userId = user.ID

		// 画像をStorageへ保存
		const images: Item["Images"] = yield uploadImageStorage(item.Images, user.ID, item.ID)

		// imageを更新
		item.Images = images

		// itemをFirestoreへupload
		yield updateItemFirestore(item, user)

		// storeへitemを更新
		let items: Items = yield select(getItems)
		items.map((value: Item, index: number) => {
			if (value.ID === item.ID) {
				items.updateItem(index, item)
			}
		})

		//yield updateItemFirestore(items, user)
		yield updateItemsStore(items)

		// loading終了
		loading.IsLoading = false
		yield updateLoadingStore(loading)

	} catch ({ code, message }) {

		// error
		const errorMessage = "checkErrorCode(code)"
		let error = <Error>{
			IsError: true,
			Status: errorMessage,
		}
		yield updateErrorStore(error)

		// loading終了
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_ITEM
		}
		yield updateLoadingStore(loading)

		console.log('Update Item error... \n', code, message)
	}
}

function* handleDeleteItem(action: ReturnType<typeof itemActions.deleteItemAction>) {
	try {
		const { item } = action.payload

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// loading true
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.DELETE_ITEM
		}
		yield updateLoadingStore(loading)
		// delete item from firebase
		const user: User = yield select(getUser)
		const itemId = item.ID
		yield deleteItemFirestore(item, user)

		// delete image from firestorage
		//const images = item.Images
		//yield deleteImageStorage(images, fileDir)

		//update items to store
		const items: Items = yield select(getItems)
		items.map((value: Item, index: number) => {
			if (value.ID === itemId) {
				items.deleteItem(index)
			}
		})
		yield updateItemsStore(items)

		// loading false
		loading.IsLoading = false
		yield updateLoadingStore(loading)

	} catch ({ code, message }) {
		// error
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.DELETE_ITEM
		}
		yield updateLoadingStore(loading)

		const errorMessage = "checkErrorCode(code)"
		let error = <Error>{
			IsError: true,
			Status: errorMessage,
		}
		yield updateErrorStore(error)
		console.log('Delete Item error... \n', code, message)
	}
}

function* itemSaga() {
	yield takeEvery(ItemActions.CREATE_ITEM_ACTION, handleCreateItem)
	yield takeEvery(ItemActions.UPDATE_ITEM_ACTION, handleUpdateItem)
	yield takeEvery(ItemActions.DELETE_ITEM_ACTION, handleDeleteItem)
}
export default itemSaga
*/