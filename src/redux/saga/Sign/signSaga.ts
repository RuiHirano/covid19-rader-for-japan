import { put, takeEvery, call, take } from 'redux-saga/effects'
import {
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
} from '../utilSaga'
import { select } from 'redux-saga/effects'
import { getUser, getAppState } from '../selector'
import { generateUid } from '../../../common/genuid'
//import i18n from './../../app/i18n/index'
import moment from 'moment'
//import { checkErrorCode } from '../../../app/firebase/errors'

import actionCreatorFactory from 'typescript-fsa';
import { Loading, LoadingState, Notification, Setting, Item, Profile, Error, User, State } from '../../../types/types'
import { defaultItems, defaultUser } from './data'
import { UserClass } from '../../../types/user'
import { ItemClass } from '../../../types/item'
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
		const user: UserClass = yield getUserFirebase(email)
		console.log("user: ", user)

		// Items情報を取得
		const items: ItemClass[] = yield getItemsFirebase(email)

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

		// LoadingをTrueにする
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.SIGN_UP
		}
		yield updateLoadingStore(loading)

		// FirebaseにSignUp
		const auth = yield signUpFirebase(email, password)

		// User情報の初期値を取得
		const user: UserClass = defaultUser()
		user.ID = auth.user.uid
		user.Setting.Email = email
		user.Profile.Name = name

		// Itemの初期値を取得
		const items: ItemClass[] = defaultItems()

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
		// Loading介し
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.SIGN_OUT
		}
		yield updateLoadingStore(loading)

		// FirebaseからSignout
		yield signOutFirebase()

		// StoreのItemsを初期化
		const items: ItemClass[] = []
		yield updateItemsStore(items)

		// Storeのユーザ情報を初期化
		const user: UserClass = new UserClass()
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

/*function* handleIsSignInRequest(action: ReturnType<typeof signActions.isSignInRequest>) {
    try {
        // loading true
        const loadingStatus = "IS_SIGN_IN"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false, errorMessage: "" })

        // checkIsSignIn
        const { user, error } = yield checkIsSignIn()

        // update userStatus
        var userStatus = yield select(getUserStatus)
        if (user) {
            userStatus = 'SIGNIN'
        }
        yield updateUserStatusToStore({ userStatus: userStatus })

        // loading false
        loading.IsLoading = false
        yield updateLoadingStore(loading)
    } catch ({ code, message }) {
        // error
        const errorMessage = "checkErrorCode(code)"
        const loadingStatus = "IS_SIGN_IN"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            errorMessage: errorMessage,
        })
        console.log('isSignin error... \n', code)
    }
}

function* handleCheckIsMatchPasswordRequest(action: ReturnType<typeof signActions.checkIsMatchPasswordRequest>) {
    try {
        const password = action.payload

        // loading true
        const loadingStatus = "CHECK_PASSWORD"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false, errorMessage: "" })

        // isCheckPassword false
        var isMatchPassword = false
        yield updateIsMatchPasswordToStore({ isMatchPassword: isMatchPassword })

        // checkIsSignIn
        var userData = yield select(getUserData)
        const email = userData.email
        const { data } = yield checkPassword({
            password: password,
            email: email,
        })

        // isCheckPassword true
        isMatchPassword = true
        yield updateIsMatchPasswordToStore({ isMatchPassword: isMatchPassword })

        // loading false
        loading.IsLoading = false
        yield updateLoadingStore(loading)
    } catch ({ code, message }) {
        // isCheckPassword false
        isMatchPassword = false
        yield updateIsMatchPasswordToStore({ isMatchPassword: isMatchPassword })

        // error
        const errorMessage = "checkErrorCode(code)"
        const loadingStatus = "CHECK_PASSWORD"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            errorMessage: errorMessage,
        })
        console.log('check password error... \n', code)
    }
}*/

function* signSaga() {
	yield takeEvery(SignActions.SIGN_IN_ACTION, handleSignIn)
	yield takeEvery(SignActions.SIGN_UP_ACTION, handleSignUp)
	yield takeEvery(SignActions.SIGN_OUT_ACTION, handleSignOut)
	//yield takeEvery(signActions.isSignInRequest.toString(), handleIsSignInRequest)
	//yield takeEvery(signActions.checkIsMatchPasswordRequest.toString(), handleCheckIsMatchPasswordRequest)
}

export default signSaga