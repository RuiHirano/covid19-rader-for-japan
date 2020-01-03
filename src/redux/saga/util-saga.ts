import { put, call, all, take } from 'redux-saga/effects'
import { AppActions } from '../module/app'
import { ItemActions } from '../module/item'
import { UserActions } from '../module/user'
import firebase from './../../app/firebase'
import ReduxSagaFirebase from 'redux-saga-firebase'
import { Item, Loading, State, User, Error, Setting, Image, Items } from '../../types'

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
export function* updateUserFirestore(user: User) {
	const userId = user.ID
	yield call(
		firestore.updateDocument,
		'users/' + userId + '/user/' + userId,
		Object.assign({}, user)
	)
}

export function* updateEmailFirestore(email: Setting["Email"]) {
	yield call(auth.updateEmail, email)
}

export function* updatePasswordFirestore(password: string) {
	yield call(auth.updatePassword, password)
}

export function* deleteAllDataFirestore(userId: User["ID"]) {
	console.log("userId", userId, 'users/' + userId)
	yield call(firestore.deleteDocument, 'users/' + userId)
	yield call(auth.deleteProfile)
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

export function* uploadImageStorage(images: Item["Images"], userID: User["ID"], itemID: string) {
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

export function* updateItemFirestore(item: Item, user: User) {
	const userId = user.ID
	const fileDir: string = '/users/' + userId + '/items/' + item.ID
	yield call(firestore.setDocument, fileDir, Object.assign({}, item), { merge: true })
}

export function* deleteItemFirestore(item: Item, user: User) {
	const userId = user.ID
	const fileDir: string = '/users/' + userId + '/items/' + item.ID
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


export function* createDefaultUserFirebase(user: User) {
	const userId = user.ID
	const doc = yield call(
		firestore.setDocument,
		'users/' + userId + '/user/' + userId,
		Object.assign({}, user), {}
	)
	return doc
}

export function* createDefaultItemsFirebase(items: Items, user: User) {
	const userId = user.ID
	yield all(
		items.items.map(item => {
			return call(
				firestore.setDocument,
				'users/' + userId + '/items/' + item.ID,
				Object.assign({}, item), {}
			)
		})
	)
}

export function* getUserFirebase(userId: User["ID"]) {
	let user = new User()
	const userCollection: any = yield call(
		firestore.getCollection,
		'users/' + userId + '/user/'
	)
	userCollection.forEach((doc: any) => {
		user.setID(doc.data().ID)
		user.setProfile(doc.data().Profile)
		user.setSetting(doc.data().Setting)
	});
	console.log("user2", user)
	return user
}

export function* getItemsFirebase(userId: User["ID"]) {
	let items: Item[] = []
	const itemsCollection = yield call(
		firestore.getCollection,
		'users/' + userId + '/items/'
	)
	itemsCollection.forEach((doc: any) => {
		let item = new Item()
		item = doc.data()
		items.push(item)
	});

	return new Items(items)
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
