import { takeEvery} from 'redux-saga/effects'
import { select } from 'redux-saga/effects'
import { getUser, getAppState } from '../selector'
/*import {
	updateLoadingStore,
	updateUserStore,
	updateErrorStore,
	updateEmailFirestore,
	updatePasswordFirestore,
	deleteAllDataFirestore,
	updateAppStateStore,
	updateItemsStore,
	updateUserFirestore,
	uploadThumbnailStorage
} from '../util-saga'
import actionCreatorFactory from 'typescript-fsa';
import { User, Profile, Setting, Content, BankAccount, Loading, LoadingState, Error, App, State, Language, Plan, Items, Image } from '../../../types'


const actionCreator = actionCreatorFactory();

export interface UpdateEmailState {
	email: Setting["Email"],
}

export interface UpdatePasswordState {
	password: string,
}

export interface UpdateUserState {
	user: User,
	loadingStatus: LoadingState
}


export enum UserActions {
	UPDATE_EMAIL_ACTION = "UPDATE_EMAIL_ACTION",
	UPDATE_PASSWORD_ACTION = "UPDATE_PASSWORD_ACTION",
	UPDATE_USER_ACTION = "UPDATE_USER_ACTION",
	DELETE_ACCOUNT_ACTION = "DELETE_ACCOUNT_ACTION",
}

export const userActions = {
	updateUserAction: actionCreator<UpdateUserState>(UserActions.UPDATE_USER_ACTION),
	updateEmailAction: actionCreator<UpdateEmailState>(UserActions.UPDATE_EMAIL_ACTION),
	updatePasswordAction: actionCreator<UpdatePasswordState>(UserActions.UPDATE_PASSWORD_ACTION),
	deleteAccountAction: actionCreator(UserActions.DELETE_ACCOUNT_ACTION),
};

function* handleUpdateEmail(action: ReturnType<typeof userActions.updateEmailAction>) {
	try {
		const { email } = action.payload

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// loading true
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_EMAIL
		}
		yield updateLoadingStore(loading)

		// update email at auth
		yield updateEmailFirestore(email)

		// modified user data
		var user: User = yield select(getUser)
		user.Setting.Email = email

		// regist userdata to firebase
		yield updateUserFirestore(user)

		yield updateUserStore(user)

		// loading false
		loading.IsLoading = false
		yield updateLoadingStore(loading)

	} catch ({ code, message }) {
		// error

		// loading false
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_EMAIL
		}
		yield updateLoadingStore(loading)

		const errorMessage = "checkErrorCode(code)"
		let error = <Error>{
			IsError: true,
			Status: errorMessage,
		}
		yield updateErrorStore(error)
		console.log('Update email error... \n', code)
	}
}

function* handleUpdatePassword(action: ReturnType<typeof userActions.updatePasswordAction>) {
	try {
		const { password } = action.payload

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// loading true
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_PASSWORD
		}
		yield updateLoadingStore(loading)

		// update email at auth
		yield updatePasswordFirestore(password)

		// loading false
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
			LoadingState: LoadingState.UPDATE_PASSWORD
		}
		yield updateLoadingStore(loading)

		console.log('Update password error... \n', code)
	}
}

function* handleDeleteAccount(action: ReturnType<typeof userActions.deleteAccountAction>) {
	try {

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// loading開始
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.DELETE_ACCOUNT
		}
		yield updateLoadingStore(loading)

		// アカウントとデータベースを削除
		const user: User = yield select(getUser)
		yield deleteAllDataFirestore(user.ID)

		// storeのユーザ情報を初期化
		const newUser = new User()
		yield updateUserStore(newUser)

		// storeのItemsを初期化
		const newItem = new Items([])
		yield updateItemsStore(newItem)

		// signout
		let appState: State = yield select(getAppState)
		appState.IsSignIn = false
		yield updateAppStateStore(appState)

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

		// ローディング終了
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.DELETE_ACCOUNT
		}
		yield updateLoadingStore(loading)

		console.log('Delete account error... \n', code)
	}
}

function* handleUpdateUser(action: ReturnType<typeof userActions.updateUserAction>) {
	const { user, loadingStatus } = action.payload
	try {

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// loading true
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: loadingStatus
		}
		yield updateLoadingStore(loading)

		// thumbnailをstorageに保存
		const thumbnail: Image = yield uploadThumbnailStorage(user.Profile.Thumbnail, user.ID)
		// thumbnailを変更
		user.Profile.Thumbnail = thumbnail

		// firebaseにユーザを更新
		yield updateUserFirestore(user)

		// storeにユーザを更新
		yield updateUserStore(user)

		// loading false
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
			LoadingState: loadingStatus
		}
		yield updateLoadingStore(loading)


		console.log('update user error... \n', code, message)
	}
}


function* signSaga() {
	yield takeEvery(UserActions.UPDATE_EMAIL_ACTION, handleUpdateEmail)
	yield takeEvery(UserActions.UPDATE_PASSWORD_ACTION, handleUpdatePassword)
	yield takeEvery(UserActions.DELETE_ACCOUNT_ACTION, handleDeleteAccount)
	yield takeEvery(UserActions.UPDATE_USER_ACTION, handleUpdateUser)
}
export default signSaga
*/