import { put, call, all, take } from 'redux-saga/effects'
import { AppActions } from '../module/App/appModule'
import { ItemActions } from '../module/Item/itemModule'
import { UserActions } from '../module/User/userModule'
import firebase from './../../app/firebase'
import ReduxSagaFirebase from 'redux-saga-firebase'
import { Item, Loading, State, Items, User, Error, Setting, Image } from '../../types/domainTypes'

const rsf = new ReduxSagaFirebase(firebase)
const { firestore, auth, storage } = rsf

// App Module
export function* updateLoadingStore(loading: Loading) {
	yield put({
		type: AppActions.UPDATE_LOADING_STORE,
		payload: loading,
	})
}

export function* updateErrorStore(error: Error) {
	yield put({
		type: AppActions.UPDATE_ERROR_STORE,
		payload: error,
	})
}

export function* updateAppStateStore(appState: State) {
	yield put({
		type: AppActions.UPDATE_APP_STATE_STORE,
		payload: appState,
	})
}

// Item Module
export function* updateItemsStore(items: Items) {
	yield put({
		type: ItemActions.UPDATE_ITEMS_STORE,
		payload: items,
	})
}

// User Module
export function* updateUserStore(user: User) {
	yield put({
		type: UserActions.UPDATE_USER_STORE,
		payload: user,
	})
}

// Firestore
export function* updateUserFirestore(userId: User["ID"], user: User) {
	yield call(
		firestore.updateDocument,
		'users/' + userId + '/user/' + userId,
		user
	)
}

export function* updateEmailFirestore(email: Setting["Email"]) {
	yield call(auth.updateEmail, email)
}

export function* updatePasswordFirestore(password: string) {
	yield call(auth.updatePassword, password)
}

export function* deleteAllDataFirestore(userId: User["ID"]) {
	yield call(auth.deleteProfile)
	yield call(firestore.deleteDocument, 'users/' + userId)
}

function fetchImageBlob(url: string): Promise<any> {
	return fetch(url)
		.then(responce => {
			return responce.json()
		})
		.catch(error => {
			console.log('error', error)
		})
}

export function* uploadImageStorage(images: Item["Images"], userID: number, itemID: number) {
	var fileDir = '/users/' + userID + '/items/' + itemID + '/'
	var blobs: any[] = yield all(
		images.map(image => {
			return call(fetchImageBlob, image.url)
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

	var storageUrls: string[] = yield all(
		blobs.map((blob, index) => {
			var fileName = 'image-' + index
			var filePath = fileDir + fileName
			return call(storage.getDownloadURL, filePath)
		})
	)
	var metadatas: any[] = yield all(
		storageUrls.map((url, index) => {
			var fileName = 'image-' + index
			var filePath = fileDir + fileName
			return call(storage.getFileMetadata, filePath)
		})
	)
	// modified storageSize
	var storageSizes: number[] = []
	metadatas.forEach(meta => {
		storageSizes.push(meta.size)
	})

	let newImages: Item["Images"] = []
	storageUrls.forEach((url: string, index: number) => {
		newImages.push({
			url: url,
			size: storageSizes[index]
		})
	});

	return newImages
}

export function* updateItemFirestore(item: Item, userID: User["ID"]) {
	const fileDir: string = '/users/' + userID + '/items/' + item.ID
	yield call(firestore.setDocument, fileDir, item, { merge: true })
}

export function* deleteItemFirestore(fileDir: string) {
	yield call(firestore.deleteDocument, fileDir)
}

export function* deleteImageStorage(images: Item["Images"], fileDir: string) {
	yield all(
		images.map((image: Image, index: number) => {
			const fileName = 'image-' + index
			const filePath = fileDir + fileName
			return call(storage.deleteFile, filePath)
		})
	)
}

// Sign
export function* signInFirebase(email: Setting["Email"], password: string) {
	const data = yield call(auth.signInWithEmailAndPassword, email, password)
	return data
}

export function* signUpFirebase(email: Setting["Email"], password: string) {
	const data = yield call(
		auth.createUserWithEmailAndPassword,
		email,
		password
	)
	return data
}

export function* signOutFirebase() {
	const data = yield call(auth.signOut)
	return data
}


export function* createInitialUserFirebase(user: User) {
	const doc = yield call(
		firestore.setDocument,
		'users/' + user.ID + '/user/' + user.ID,
		user, {}
	)
	return doc
}

export function* createInitialItemsFirebase(items: Items, user: User) {
	yield all(
		items.Items.map(item => {
			return call(
				firestore.setDocument,
				'users/' + user.ID + '/items/' + item.ID,
				item, {}
			)
		})
	)
}

export function* getUserFirebase(userID: User["ID"]) {
	const user: User = yield call(
		firestore.getDocument,
		'users/' + userID + '/user/' + userID
	)
	return user
}

export function* getItemsFirebase(userId: User["ID"]) {
	const items: Items = yield call(
		firestore.getCollection,
		'users/' + userId + '/items/'
	)

	return items
}

/*export function* updateItemsToStore(items: Item[]) {
    yield put({
        type: itemActions.updateItemsToStore.toString(),
        payload: { items: items },
    })
}

export function* updateUserStatusToStore(userStatus: UserState["userStatus"]) {
    yield put({
        type: userActions.updateUserStatusToStore.toString(),
        payload: { userStatus: userStatus },
        error: false,
    })
}

export function* updateIsMatchPasswordToStore(isMatchPassword: UserState["isMatchPassword"]) {
    yield put({
        type: userActions.updateIsMatchPasswordToStore.toString(),
        payload: { isMatchPassword: isMatchPassword },
        error: false,
    })
}

export function* updateUserDataToStore(userData: UserData) {
    yield put({
        type: userActions.updateUserDataToStore.toString(),
        payload: { userData: userData },
        error: false,
    })
}*/








/*export function* deleteAccountAndDatabaseFromFirestore({ userId }) {
    yield call(auth.deleteProfile)
    yield call(firestore.deleteDocument, 'users/' + userId)
}

export function* sendPasswordResetEmail({ email }) {
    yield call(auth.sendPasswordResetEmail, email) // !! action code settings?
}*/

/*export function* updateEmail({ email }) {
    yield call(auth.updateEmail, email)
}*/

/*export function* deleteImageFromStorage({ imagePaths, fileDir }) {
    yield all(
        imagePaths.map((imagePath, index) => {
            const fileName = 'image-' + index
            const filePath = fileDir + fileName
            return call(storage.deleteFile, filePath)
        })
    )
}*/

/*export function* updatePassDataToStore({ passData }) {
    yield put({
        type: UPDATE_PASS_DATA_TO_STORE,
        payload: { passData: passData },
    })
}*/

/*export function* updateSearchTagsToStore({ searchTags }) {
    yield put({
        type: itemActions.updateSearchTagsToStore.toString(),
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
}*/
