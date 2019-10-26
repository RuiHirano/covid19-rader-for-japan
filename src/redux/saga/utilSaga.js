import { put, call, all, take } from 'redux-saga/effects'
import { UPDATE_IS_LOADING_TO_STORE } from './../module/appModule'
import {
    UPDATE_ITEMS_TO_STORE,
    UPDATE_PASS_DATA_TO_STORE,
    UPDATE_SEARCH_TAGS_TO_STORE
} from '../module/itemModule'
import {
    UPDATE_USER_DATA_TO_STORE,
    UPDATE_USER_STATUS_TO_STORE,
    UPDATE_IS_MATCH_PASSWORD_TO_STORE
} from '../module/userModule'
import { generateUid } from './../../common/lib/utils'
import firebase from  './../../app/firebase'
import ReduxSagaFirebase from 'redux-saga-firebase'
import axios from 'axios'
const atob = require('base-64').decode
window.atob = atob

const rsf = new ReduxSagaFirebase(firebase)
const { firestore, auth, storage } = rsf

export function* updateLoadingState({ loadingStatus, isLoading, error, error_message }) {
    if (error) {
        yield put({
            type: UPDATE_IS_LOADING_TO_STORE,
            payload: { isLoading: isLoading, loadingStatus: loadingStatus },
            error: error,
            meta: error_message,
        })
    } else {
        yield put({
            type: UPDATE_IS_LOADING_TO_STORE,
            payload: { isLoading: isLoading, loadingStatus: loadingStatus  },
            error: error,
        })
    }
}

export function* updateItemsToStore({ items }) {
    yield put({
        type: UPDATE_ITEMS_TO_STORE,
        payload: { items: items },
    })
}

export function* updateUserStatusToStore({ userStatus }) {
    yield put({
        type: UPDATE_USER_STATUS_TO_STORE,
        payload: { userStatus: userStatus },
        error: false,
    })
}

export function* updateIsMatchPasswordToStore({ isMatchPassword }) {
    yield put({
        type: UPDATE_IS_MATCH_PASSWORD_TO_STORE,
        payload: { isMatchPassword: isMatchPassword },
        error: false,
    })
}

export function* updateUserDataToStore({ userData }) {
    yield put({
        type: UPDATE_USER_DATA_TO_STORE,
        payload: { userData: userData },
        error: false,
    })
}

export function* signInToFirebase({ email, password }) {
    const data = yield call(auth.signInWithEmailAndPassword, email, password)
    return data
}

export function* signUpToFirebase({ email, password }) {
    const data = yield call(
        auth.createUserWithEmailAndPassword,
        email,
        password
    )
    return data
}

export function* signOutFromFirebase() {
    const data = yield call(auth.signOut)
    return data
}

export function* createInitialUserDataToFirebase({ userId, userData }) {
    const doc = yield call(
        firestore.addDocument,
        'users/' + userId + '/userData/',
        userData
    )
    return doc
}

export function* createInitialItemsToFirebase({ items, userId }) {
    yield all(
        items.map(item => {
            return call(
                firestore.setDocument,
                'users/' + userId + '/items/' + item.itemId,
                item
            )
        })
    )
}

export function* getUserDataFromFirebase({ userId }) {
    var userData = {}
    const userDataCollection = yield call(
        firestore.getCollection,
        'users/' + userId + '/userData/'
    )
    userDataCollection.forEach(doc => {
        userData = doc.data()
        userData.userDataId = doc.id
    })
    return userData
}

export function* getItemsFromFirebase({ userId }) {
    var items = []
    const itemsCollection = yield call(
        firestore.getCollection,
        'users/' + userId + '/items/'
    )
    itemsCollection.forEach(doc => {
        var item = doc.data()
        item.itemId = doc.id
        items.push(item)
    })
    return items
}

export function* updateUserDataToFirestore({ userId, userDataId, userData }) {
    yield call(
        firestore.updateDocument,
        'users/' + userId + '/userData/' + userDataId,
        userData
    )
}

export function* deleteAccountAndDatabaseFromFirestore({ userId }) {
    yield call(auth.deleteProfile)
    yield call(firestore.deleteDocument, 'users/' + userId)
}

export function* sendPasswordResetEmail({ email }) {
    yield call(auth.sendPasswordResetEmail, email) // !! action code settings?
}

export function* updateEmail({ email }) {
    yield call(auth.updateEmail, email)
}

export function* deleteImageFromStorage({ imagePaths, fileDir }) {
    yield all(
        imagePaths.map((imagePath, index) => {
            const fileName = 'image-' + index
            const filePath = fileDir + fileName
            return call(storage.deleteFile, filePath)
        })
    )
}

export function* updatePassDataToStore({ passData }) {
    yield put({
        type: UPDATE_PASS_DATA_TO_STORE,
        payload: { passData: passData },
    })
}

export function* updateSearchTagsToStore({ searchTags }) {
    yield put({
        type: UPDATE_SEARCH_TAGS_TO_STORE,
        payload: { searchTags: searchTags },
    })
}

export function* updateItemToFirestore({ userId, itemId, item }) {
    yield call(
        firestore.setDocument,
        'users/' + userId + '/items/' + itemId,
        item
    )
}

export function* createItemsToFirestore({ userId, items }) {
    try {
        yield all(
        items.map((item, index) => {
            const itemId = item.itemId
            return call(
                firestore.setDocument,
                'users/' + userId + '/items/' + itemId,
                item
            )
        })
    )
    } catch (error) {
        console.log("create Items error", error)
    }
    
}

export function* deleteItemFromFirestore({ userId, itemId }) {
    yield call(firestore.deleteDocument, 'users/' + userId + '/items/' + itemId)
}

function fetchImageBlob(url) {
    return fetch(url)
        .then(results => {
            return results._bodyBlob
        })
        .catch(error => {
            console.log('error', error)
        })
}

export function* uploadImageToStorage({ urls, fileDir }) {
    var blobs = yield all(
        urls.map(url => {
            return call(fetchImageBlob, url)
        })
    )

    yield all(
        blobs.map((blob, index) => {
            var fileName = 'image-' + index
            var filePath = fileDir + fileName
            const metadata = { contentType: 'image/jpeg' }
            return call(storage.uploadFile, filePath, blob, metadata)
        })
    )

    var storageUrls = yield all(
        blobs.map((blob, index) => {
            var fileName = 'image-' + index
            var filePath = fileDir + fileName
            return call(storage.getDownloadURL, filePath)
        })
    )
    var metadatas = yield all(
        storageUrls.map((url, index) => {
            var fileName = 'image-' + index
            var filePath = fileDir + fileName
            return call(storage.getFileMetadata, filePath)
        })
    )
    // modified storageSize
    var storageSizes = []
    metadatas.forEach(meta => {
        storageSizes.push(meta.size)
    })

    return { imagePaths: storageUrls, imageSizes: storageSizes }
}

export function* downloadImageFromStorage({ imagePaths }) {
    const images = yield all(
        imagePaths.map((path, index) => call(storage.getDownloadURL, path))
    )
    return images
}

export function* checkIsSignIn() {
    const channel = yield call(auth.channel)
    while (true) {
        const { error, user } = yield take(channel)

        if (user) {
            return { user: user, error: error }
        } else {
            return { user: user, error: error }
        }
    }
}

export function* checkPassword({ password, email }) {
    const data = yield call(auth.signInWithEmailAndPassword, email, password)
    return { data: data }
}
