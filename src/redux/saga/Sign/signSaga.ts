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
    createInitialItemsFirebase,
    createInitialUserFirebase
} from '../utilSaga'
import { select } from 'redux-saga/effects'
import { getUser, getAppState } from '../selector'
import { generateUid } from '../../../common/genuid'
//import i18n from './../../app/i18n/index'
import moment from 'moment'
import { checkErrorCode } from '../../../app/firebase/errors'

import actionCreatorFactory from 'typescript-fsa';
import {Loading, LoadingState, Notification, Setting, Profile, Error, User, Items, State} from '../../../types/domainTypes'
import {defaultItems, defaultUser} from './data'
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

export enum SignActions{
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

        // loading true
        let loading = <Loading>{
            IsLoading: true,
            LoadingState: LoadingState.SIGN_IN
        }
        yield updateLoadingStore(loading)

        // sign in to firebase
        const data = yield signInFirebase(email, password)

        // get user profile
        const userID: User["ID"] = data.user.uid
        const user: User = yield getUserFirebase(userID)

        // get user items
        const items: Items = yield getItemsFirebase(userID)

        yield updateUserStore(user)

        // update userItem to store
        yield updateItemsStore(items)

        // update userStatus to store
        let appState: State = yield select(getAppState)
        appState.IsSignIn = true
        yield updateAppStateStore(appState)

        // loading false
        loading.IsLoading = false
        yield updateLoadingStore(loading)
    } catch ({ code, message }) {
        // error
        let loading = <Loading>{
            IsLoading: true,
            LoadingState: LoadingState.SIGN_IN
        }
        yield updateLoadingStore(loading)

        const errorMessage = checkErrorCode(code)
        let error = <Error>{
            IsError: true,
            Status: errorMessage,
        }
        yield updateErrorStore(error)
        console.log('Sign in error... \n', code)
    }
}

function* handleSignUp(action: ReturnType<typeof signActions.signUpAction>) {
    try {
        const { email, password, name } = action.payload


        // loading true
        let loading = <Loading>{
            IsLoading: true,
            LoadingState: LoadingState.SIGN_UP
        }
        yield updateLoadingStore(loading)

        // sign up to firebase
        const auth = yield signUpFirebase(email, password)

        const user: User = defaultUser
        user.ID = auth.user.uid
        user.Setting.Email = email
        user.Profile.Name = name

        // create new item data
        const items: Items = {
            Items : defaultItems
        }

        // regist userData to firebase
        yield createInitialUserFirebase(user)
        
        yield createInitialItemsFirebase(items, user)

        // update userdata to store
        yield updateUserStore(user)

        // update userItem to store
        yield updateItemsStore(items)

        // update userStatus to store
        let appState: State = yield select(getAppState)
        appState.IsSignIn = true
        yield updateAppStateStore(appState)

        // loading false
        loading.IsLoading = false
        yield updateLoadingStore(loading)
    } catch ({ code, message }) {
        // error
        let loading = <Loading>{
            IsLoading: true,
            LoadingState: LoadingState.SIGN_UP
        }
        yield updateLoadingStore(loading)

        const errorMessage = checkErrorCode(code)
        let error = <Error>{
            IsError: true,
            Status: errorMessage,
        }
        yield updateErrorStore(error)
        console.log('Sign up error... \n', code, message)
    }
}

function* handleSignOut(action: ReturnType<typeof signActions.signOutAction>) {
    try {
        // loading true
        let loading = <Loading>{
            IsLoading: true,
            LoadingState: LoadingState.SIGN_OUT
        }
        yield updateLoadingStore(loading)
        // signOut firebase
        yield signOutFirebase()

        // update items to store
        const items: Items = {
            Items: []
        }
        yield updateItemsStore(items)

        // update userStatus to store
        let appState: State = yield select(getAppState)
        appState.IsSignIn = false
        yield updateAppStateStore(appState)

        // loading false
        loading.IsLoading = false
        yield updateLoadingStore(loading)
    } catch ({ code, message }) {
        // error
        let loading = <Loading>{
            IsLoading: true,
            LoadingState: LoadingState.SIGN_OUT
        }
        yield updateLoadingStore(loading)

        const errorMessage = checkErrorCode(code)
        let error = <Error>{
            IsError: true,
            Status: errorMessage,
        }
        yield updateErrorStore(error)
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
        const errorMessage = checkErrorCode(code)
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
        const errorMessage = checkErrorCode(code)
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