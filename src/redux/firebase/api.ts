
import firebaseApp from '.'
import { Item, User, Image, ImageStatus } from '../../types'
import firebase from 'firebase'


export class API {
	private fbApp: firebase.app.App

	constructor() {
        this.fbApp = firebaseApp;
	}

	async getUserAuth() {
		const user = await this.fbApp.auth().currentUser
		return user
	}

	async createItem(item: Item, path: string) {
		const jsonItem = JSON.parse(JSON.stringify(item))
		await this.fbApp.firestore().collection(path).doc(item.ID).set(jsonItem)
		//await this.fbApp.firestore().collection(path).doc(item.ID).update(item.getJson())
	}

	async updateItem(item: Item, path: string) {
		const jsonItem = JSON.parse(JSON.stringify(item))
		//await this.fbApp.firestore().collection(path).doc(item.ID).update(item.getJson())
		await this.fbApp.firestore().collection(path).doc(item.ID).update(jsonItem)
	}
	
	async deleteItem(item: Item, path: string) {
		await this.fbApp.firestore().collection(path).doc(item.ID).delete()
	}
	
	async uploadImage(image: Image) {
		await this.fbApp.storage().ref(image.Path).putString(image.Url, 'data_url', { contentType: 'image/jpeg' })
		const url = await this.fbApp.storage().ref(image.Path).getDownloadURL()
		const metadata = await this.fbApp.storage().ref(image.Path).getMetadata()
		const newImage: Image = {
			ID: image.ID,
			Path: image.Path,
			Url: url,
			Size: metadata.size,
			Status: ImageStatus.NONE
		}
		return newImage
	}
	
	async deleteImage(image: Image) {
		await this.fbApp.storage().ref(image.Path).delete()
	}

	async createUserInfo(user: User) {
		const path = 'users/' + user.ID + '/user/'
		const jsonUser = JSON.parse(JSON.stringify(user))	// classからpure objectにもどす
		await this.fbApp.firestore().collection(path).doc(user.ID).set(jsonUser)
	}

	async updateUserInfo(user: User) {
		const path = 'users/' + user.ID + '/user/'
		const jsonUser = JSON.parse(JSON.stringify(user))
		await this.fbApp.firestore().collection(path).doc(user.ID).update(jsonUser)
		//await this.fbApp.firestore().collection(path).doc(user.ID).update(user.getJson())
	}

	async deleteUserInfo(user: User) {
		const path = 'users/' + user.ID + '/user/'
		await this.fbApp.firestore().collection(path).doc(user.ID).delete()
	}

	async getUserInfo(uid: string) {
        const path = 'users/' + uid + '/user'
		const userDoc: any = await this.fbApp.firestore().collection(path).doc(uid).get()
		const userInfo: User = userDoc.data()
		return userInfo
	}

	async getItems(uid: string) {
        const path = 'users/' + uid + '/items/'
		const itemsCollection = await this.fbApp.firestore().collection(path).get()
		let items: Item[] = []
		itemsCollection.docs.forEach((doc: any) => {
			let item: Item = doc.data()
			items.push(item)
		});
		return items
	}

	async deleteAccount() {
		const currentUser = this.fbApp.auth().currentUser
		if(currentUser !== null){
			await currentUser.delete()
		} 
	}

	async changePassword(email: string) {
		await this.fbApp.auth().sendPasswordResetEmail(email)
	}
	
	async changeEmail(email: string) {
		const currentUser = this.fbApp.auth().currentUser
		if(currentUser !== null){
			currentUser.updateEmail(email)
		}
	}

	async signIn(email: string, password: string) {
		const userCredit = await this.fbApp.auth().signInWithEmailAndPassword(email, password)
		return userCredit
	}

	async signUp(email: string, password: string) {
		const userCredit = await this.fbApp.auth().createUserWithEmailAndPassword(email, password)
		return userCredit
	}

	async signOut() {
		await this.fbApp.auth().signOut()
	}

}


/*export function* uploadImageStorage(images: Item["Images"], userID: User["ID"], itemID: string) {
	var fileDir = '/users/' + userID + '/items/' + itemID + '/'
	// コピー
	var imgs = images.concat()
	// ImageStatus: DELETEの画像を削除
	yield all(
		images.map((image, index) => {
			if (image.status === ImageStatus.DELETE) {
				// imgsから削除
				imgs.splice(index, 1)
				console.log("delete", image)
				var filePath = fileDir + image.id
				return call(storage.deleteFile, filePath)
			}
		})
	)

	// ImageStatus: UPDATEの画像を保存
	yield all(
		imgs.map((image, index) => {
			if (image.status === ImageStatus.UPDATE) {
				var filePath = fileDir + image.id
				const metadata = { contentType: 'image/jpeg' }
				return call(storage.uploadString, filePath, image.url, 'data_url', metadata)
			}
		})
	)

	// 画像のfirestoreのURLを取得
	var storageUrls: string[] = yield all(
		imgs.map((image, index) => {
			var filePath = fileDir + image.id
			return call(storage.getDownloadURL, filePath)
		})
	)

	// メタデータ取得
	var metadatas: any[] = yield all(
		storageUrls.map((url, index) => {
			var filePath = fileDir + imgs[index].id
			return call(storage.getFileMetadata, filePath)
		})
	)
	// storageSizeを計算
	var storageSizes: number[] = []
	metadatas.forEach(meta => {
		storageSizes.push(meta.size)
	})

	//新しく作成
	let newImages: Item["Images"] = []
	storageUrls.forEach((url: string, index: number) => {
		newImages.push({
			id: imgs[index].id,
			url: url,
			size: storageSizes[index],
			status: ImageStatus.NONE
		})
	});

	return newImages
}*/
