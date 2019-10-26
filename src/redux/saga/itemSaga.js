import { put, takeEvery, call, all } from 'redux-saga/effects'
import { generateUid } from './../../common/lib/utils'
import { select } from 'redux-saga/effects'
import { getItems, getUserData } from './selector'
import {
    updateLoadingState,
    uploadImageToStorage,
    deleteImageFromStorage,
    updateItemsToStore,
    updatePassDataToStore,
    updateItemToFirestore,
    deleteItemFromFirestore,
    downloadImageFromStorage,
    updateSearchTagsToStore,
    createItemsToFirestore
} from './utilSaga'
import { checkErrorCode } from './../../app/firebase/errors'
import { createAction } from 'redux-actions'

// CREATE_ITEM
export const CREATE_ITEM_REQUEST = 'CREATE_ITEM_REQUEST'
export const createItemRequest = createAction(CREATE_ITEM_REQUEST)

// UPDATE_ITEM
export const UPDATE_ITEM_REQUEST = 'UPDATE_ITEM_REQUEST'
export const updateItemRequest = createAction(UPDATE_ITEM_REQUEST)

// DELETE_ITEM
export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST'
export const deleteItemRequest = createAction(DELETE_ITEM_REQUEST)

// DELETE_ITEM
export const IMPORT_ITEMS_FROM_TRADING_MANAGER_REQUEST = 'IMPORT_ITEMS_FROM_TRADING_MANAGER_REQUEST'
export const importItemsFromTradingManagerRequest = createAction(IMPORT_ITEMS_FROM_TRADING_MANAGER_REQUEST)

// DOWNLOAD_ITEM_IMAGE
export const DOWNLOAD_ITEM_IMAGE_REQUEST = 'DOWNLOAD_ITEM_IMAGE_REQUEST'
export const downloadItemImageRequest = createAction(
    DOWNLOAD_ITEM_IMAGE_REQUEST
)

// UPDATE_PASS_DATA
export const UPDATE_PASS_DATA_REQUEST = 'UPDATE_PASS_DATA_REQUEST'
export const updatePassDataRequest = createAction(UPDATE_PASS_DATA_REQUEST)

// UPDATE_SEARCH_TAGS
export const UPDATE_SEARCH_TAGS_REQUEST = 'UPDATE_SEARCH_TAGS_REQUEST'
export const updateSearchTagsRequest = createAction(UPDATE_SEARCH_TAGS_REQUEST)


function* handleCreateItem(action) {
    try {
        const { item, urls } = action.payload

        // loading true
        const loadingStatus = "CREATE_ITEM"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // userId itemId
        const userData = yield select(getUserData)
        const userId = userData.userId
        const itemId = item.startDate.getTime().toString() + generateUid()

        // create to storage
        var fileDir = '/users/' + userId + '/items/' + itemId + '/'
        const { imagePaths, imageSizes } = yield uploadImageToStorage({
            urls: urls,
            fileDir: fileDir,
        })

        // modified item
        item.imagePaths = imagePaths
        item.imageSizes = imageSizes
        item.itemId = itemId
        item.startDate = item.startDate.getTime()
        item.endDate = item.endDate.getTime()

        // create to firestore
        yield updateItemToFirestore({
            userId: userId,
            itemId: itemId,
            item: item,
        })

        // regist to store
        const items = yield select(getItems)
        items.push(item)
        yield updateItemsToStore({ items: items })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "CREATE_ITEM"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('Create Item error... \n', code)
    }
}

function* handleUpdateItem(action) {
    try {
        const { item, urls } = action.payload

        // loading true
        const loadingStatus = "UPDATE_ITEM"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // modified item
        const userData = yield select(getUserData)
        const userId = userData.userId
        const itemId = item.itemId

        // update to firestore
        var fileDir = '/users/' + userId + '/items/' + itemId + '/'
        const { imagePaths, imageSizes } = yield uploadImageToStorage({
            urls: urls,
            fileDir: fileDir,
        })

        // modified item
        item.imagePaths = imagePaths
        item.imageSizes = imageSizes
        item.startDate = item.startDate.getTime()
        item.endDate = item.endDate.getTime()

        // update item to firebase
        yield updateItemToFirestore({
            userId: userId,
            itemId: itemId,
            item: item,
        })

        // update items to state
        const items = yield select(getItems)
        items.map((value, index, array) => {
            if (value.itemId === itemId) {
                items.splice(index, 1, item)
            }
        })

        yield updateItemsToStore({ items: items })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_ITEM"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('Update Item error... \n', code)
    }
}

function* handleDeleteItem(action) {
    try {
        const { item } = action.payload

        // loading true
        const loadingStatus = "DELETE_ITEM"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // delete item from firebase
        const userData = yield select(getUserData)
        const userId = userData.userId
        const itemId = item.itemId
        yield deleteItemFromFirestore({ userId: userId, itemId: itemId })

        // delete image from firestorage
        const imagePaths = item.imagePaths
        const fileDir = '/users/' + userId + '/items/' + itemId + '/'
        yield deleteImageFromStorage({
            imagePaths: imagePaths,
            fileDir: fileDir,
        })

        //update items to store
        const items = yield select(getItems)
        items.map((value, index, array) => {
            if (value.itemId === itemId) {
                items.splice(index, 1)
            }
        })
        yield updateItemsToStore({ items: items })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "DELETE_ITEM"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('Delete Item error... \n', code)
    }
}

function* handleUpdatePassData(action) {
    try {
        const { passData } = action.payload

        // loading true
        const loadingStatus = "UPDATE_PASS_DATA"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // update items state
        yield updatePassDataToStore({ passData: passData })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_PASS_DATA"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('Update PassData error... \n', code)
    }
}

function* handleDownloadItemImageRequest(action) {
    try {
        const { passData } = action.payload
        const { item } = passData
        const { imagePaths } = item

        // loading true
        const loadingStatus = "DOWNLOAD_ITEM_IMAGE"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        //download item image from storage
        const images = yield downloadImageFromStorage({
            imagePaths: imagePaths,
        })

        // update items state
        item.images = images
        passData.item = item
        console.log('passdata', passData)
        yield updatePassDataToStore({ passData: passData })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "DOWNLOAD_ITEM_IMAGE"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('Download Item Image error... \n', code)
    }
}

function* handleUpdateSearchTags(action) {
    try {
        const { searchTags } = action.payload

        // loading true
        const loadingStatus = "UPDATE_SEARCH_TAGS"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // update items state
        yield updateSearchTagsToStore({ searchTags: searchTags })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_SEARCH_TAGS"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('Update PassData error... \n', code)
    }
}

function* handleImportItemsFromTradingManagerRequest(action) {
    try {
        const { items } = action.payload

        // loading true
        const loadingStatus = "IMPORT_ITEM_FROM_TRADING_MANAGER"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

const userData = yield select(getUserData)
        const userId = userData.userId
        // create items to firebase
        yield createItemsToFirestore({
            userId: userId,
            items: items,
        })

        // regist items to state
        const storeItems = yield select(getItems)
        const newItems =  storeItems.concat(items)
        yield updateItemsToStore({ items: newItems })
        

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "IMPORT_ITEM_FROM_TRADING_MANAGER"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('import items from trading manager error... \n', code)
    }
}

function* itemSaga(context) {
    yield takeEvery(CREATE_ITEM_REQUEST, handleCreateItem)
    yield takeEvery(UPDATE_ITEM_REQUEST, handleUpdateItem)
    yield takeEvery(DELETE_ITEM_REQUEST, handleDeleteItem)
    yield takeEvery(UPDATE_PASS_DATA_REQUEST, handleUpdatePassData)
    yield takeEvery(UPDATE_SEARCH_TAGS_REQUEST, handleUpdateSearchTags)
    yield takeEvery(
        DOWNLOAD_ITEM_IMAGE_REQUEST,
        handleDownloadItemImageRequest
    )
    yield takeEvery(
        IMPORT_ITEMS_FROM_TRADING_MANAGER_REQUEST,
        handleImportItemsFromTradingManagerRequest
    )
}
export default itemSaga
