import { put, takeEvery, call, take } from 'redux-saga/effects'
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
	signInFirebase,
	signUpFirebase,
	signOutFirebase,
	getUserFirebase,
	getItemsFirebase,
	createDefaultItemsFirebase,
	createDefaultUserFirebase
} from '../util-saga'
import { select } from 'redux-saga/effects'
import { getAppState } from '../selector'

import actionCreatorFactory from 'typescript-fsa';
import { Loading, LoadingState, Notification, Setting, Item, Profile, Error, User, State, Items } from '../../../types'
import { defaultItems, defaultUser } from './data'
const actionCreator = actionCreatorFactory();


export interface SignInState {
	email: Setting["Email"],
	password: string,
}

export interface SignUpState {
	email: Setting["Email"],
	password: string,
	name: Profile["Name"],
}

export enum SignActions {
	SIGN_IN_ACTION = "SIGN_IN_ACTION",
	SIGN_UP_ACTION = "SIGN_UP_ACTION",
	SIGN_OUT_ACTION = "SIGN_OUT_ACTION",
}

export const signActions = {
	signInAction: actionCreator<SignInState>('SIGN_IN_ACTION'),
	signUpAction: actionCreator<SignUpState>('SIGN_UP_ACTION'),
	signOutAction: actionCreator('SIGN_OUT_ACTION'),
};


function* handleSignIn(action: ReturnType<typeof signActions.signInAction>) {
	try {
		const { email, password } = action.payload

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// LoadingをTrueにする
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.SIGN_IN
		}
		yield updateLoadingStore(loading)

		// FirebaseにSignIn
		const data = yield signInFirebase(email, password)
		console.log("data: ", data)

		// ユーザ情報を取得
		const userId: User["ID"] = data.user.uid
		const user: User = yield getUserFirebase(userId)
		console.log("user: ", user)

		// Items情報を取得
		const items: Items = yield getItemsFirebase(userId)

		// ユーザ情報をStoreへ更新
		yield updateUserStore(user)

		// Items情報をStoreへ更新
		yield updateItemsStore(items)

		// AppStoreへ更新
		let appState: State = yield select(getAppState)
		appState.IsSignIn = true
		yield updateAppStateStore(appState)

		// loadingを終了
		loading.IsLoading = false
		yield updateLoadingStore(loading)
	} catch ({ code, message }) {

		// エラーメッセージをStoreへ更新
		const errorMessage = "checkErrorCode(code)"
		let error = <Error>{
			IsError: true,
			Status: errorMessage,
		}
		yield updateErrorStore(error)

		// loadingを終了
		let loading = <Loading>{
			IsLoading: false,
			LoadingState: LoadingState.SIGN_IN
		}
		yield updateLoadingStore(loading)

		console.log('Sign in error... \n', code)
	}
}

function* handleSignUp(action: ReturnType<typeof signActions.signUpAction>) {
	try {
		const { email, password, name } = action.payload

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// LoadingをTrueにする
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.SIGN_UP
		}
		yield updateLoadingStore(loading)

		// FirebaseにSignUp
		const auth = yield signUpFirebase(email, password)

		// User情報の初期値を取得
		const user: User = defaultUser()
		user.ID = auth.user.uid
		user.Setting.Email = email
		user.Profile.Name = name

		// Itemの初期値を取得
		const items: Items = defaultItems()

		// FirebaseにUserを生成
		yield createDefaultUserFirebase(user)

		// FirebaseにItemsを追加
		yield createDefaultItemsFirebase(items, user)

		// StoreへUser情報を更新
		yield updateUserStore(user)

		// StoreへItems情報を更新
		yield updateItemsStore(items)

		// AppStateをStoreへ更新
		let appState: State = yield select(getAppState)
		appState.IsSignIn = true
		yield updateAppStateStore(appState)

		// Loadingをfalseにする
		loading.IsLoading = false
		yield updateLoadingStore(loading)

	} catch ({ code, message }) {

		const errorMessage = "checkErrorCode(code)"
		let error = <Error>{
			IsError: true,
			Status: errorMessage,
		}
		yield updateErrorStore(error)

		// loadingを終了
		let loading = <Loading>{
			IsLoading: false,
			LoadingState: LoadingState.SIGN_UP
		}
		yield updateLoadingStore(loading)

		console.log('Sign up error... \n', code, message)
	}
}

function* handleSignOut(action: ReturnType<typeof signActions.signOutAction>) {
	try {

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// Loading開始
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.SIGN_OUT
		}
		yield updateLoadingStore(loading)

		// FirebaseからSignout
		yield signOutFirebase()

		// StoreのItemsを初期化
		const items: Items = new Items([])
		yield updateItemsStore(items)

		// Storeのユーザ情報を初期化
		const user: User = new User()
		yield updateUserStore(user)

		// StoreのAppSateをSighoutに
		let appState: State = yield select(getAppState)
		appState.IsSignIn = false
		yield updateAppStateStore(appState)

		// Loading終了
		loading.IsLoading = false
		yield updateLoadingStore(loading)
	} catch ({ code, message }) {

		// ErrorをStoreへ
		const errorMessage = "checkErrorCode(code)"
		let error = <Error>{
			IsError: true,
			Status: errorMessage,
		}
		yield updateErrorStore(error)

		// ローディング終了
		let loading = <Loading>{
			IsLoading: false,
			LoadingState: LoadingState.SIGN_OUT
		}
		yield updateLoadingStore(loading)


		console.log('Sign out error... \n', code)
	}
}

function* signSaga() {
	yield takeEvery(SignActions.SIGN_IN_ACTION, handleSignIn)
	yield takeEvery(SignActions.SIGN_UP_ACTION, handleSignUp)
	yield takeEvery(SignActions.SIGN_OUT_ACTION, handleSignOut)
}

export default signSaga*/