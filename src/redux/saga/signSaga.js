import { put, takeEvery, call, take } from 'redux-saga/effects'
import * as Localization from 'expo-localization'
import {
    updateLoadingState,
    signInToFirebase,
    signUpToFirebase,
    getUserDataFromFirebase,
    getItemsFromFirebase,
    createInitialItemsToFirebase,
    createInitialUserDataToFirebase,
    updateItemsToStore,
    updateUserDataToStore,
    updateUserStatusToStore,
    checkIsSignIn,
    signOutFromFirebase,
    checkPassword,
    updateIsMatchPasswordToStore
} from './utilSaga'
import { select } from 'redux-saga/effects'
import { getUserStatus, getUserData } from './selector'
import { generateUid } from './../../common/lib/utils'
import i18n from './../../app/i18n/index'
import moment from 'moment'
import { checkErrorCode } from './../../app/firebase/errors'
import { createAction } from 'redux-actions'

// SIGN IN
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const signInRequest = createAction(SIGN_IN_REQUEST)

// IS_SIGN_IN
export const IS_SIGN_IN_REQUEST = 'IS_SIGN_IN_REQUEST'
export const isSignInRequest = createAction(IS_SIGN_IN_REQUEST)

// SIGN UP
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const signUpRequest = createAction(SIGN_UP_REQUEST)

// SIGN OUT
export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'
export const signOutRequest = createAction(SIGN_OUT_REQUEST)

// CHECK_PASSWORD
export const CHECK_IS_MATCH_PASSWORD_REQUEST = 'CHECK_IS_MATCH_PASSWORD_REQUEST'
export const checkIsMatchPasswordRequest = createAction(CHECK_IS_MATCH_PASSWORD_REQUEST)


function* handleSignInRequest(action) {
    try {
        const { email, password } = action.payload.signInData

        // loading true
        const loadingStatus = "SIGN_IN"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // sign in to firebase
        const data = yield signInToFirebase({
            email: email,
            password: password,
        })

        // get user profile
        const userId = data.user.uid
        const userData = yield getUserDataFromFirebase({ userId: userId })

        // get user items
        const items = yield getItemsFromFirebase({ userId: userId })

        yield updateUserDataToStore({ userData: userData })

        // update userItem to store
        yield updateItemsToStore({ items: items })

        // update userStatus to store
        const userStatus = 'SIGNIN'
        yield updateUserStatusToStore({ userStatus: userStatus })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "SIGN_IN"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('Sign in error... \n', code)
    }
}

function* handleSignUpRequest(action) {
    try {
        const { email, password, name } = action.payload.signUpData


        // loading true
        const loadingStatus = "SIGN_UP"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // sign up to firebase
        const user = yield signUpToFirebase({
            email: email,
            password: password,
        })

        const userId = user.user.uid
        const defaultLanguage = Localization.locale
        const notification = {
            isNotification: true,
            isEmailNotification: true,
            isPushNotification: true,
        }

        const tradingCurrency = [
            { pair: 'USD/JPY', color: 'blue' },
            { pair: 'GBP/USD', color: 'red' },
            { pair: 'EUR/USD', color: 'green' },
        ]

        const tradingIssues = [
            { pair: '1204', color: 'blue' },
            { pair: '2345', color: 'green' },
            { pair: '6315', color: 'red' },
        ]

        const userData = {
            userId: userId,
            userName: name,
            email: email,
            language: defaultLanguage,
            icon: '',
            notification: notification,
            userPlan: 'FREE',
            imageCapacity: 3000000,
            userStatus: '',
            initialInvestment: 500000,
            allowableLossRate: 1,
            bankruptcyReductionRate: 20,
            tradingCurrency: tradingCurrency,
            tradingIssues: tradingIssues,
            tags: ["Good", "Bad"]
        }

        // regist userData to firebase
        const doc = yield createInitialUserDataToFirebase({
            userId: userId,
            userData: userData,
        })

        userData.userDataId = doc.id

        // create new item data
        const items = [
            {
                itemId:
                    moment()
                        .valueOf()
                        .toString() +
                    2 +
                    generateUid(),
                type: 'FX',
                startDate: moment().valueOf(),
                endDate: moment()
                    .add(3, 'hours')
                    .valueOf(),
                class: 'BUY',
                pair: 'USD/JPY',
                lot: '0.35',
                entryRate: '112.342',
                lossCutRate: '112.332',
                settleRate: '112.392',
                profit: '4500',
                beforeComment: i18n.t('ii_1_before_comment'),
                afterComment: i18n.t('ii_1_after_comment'),
                tags: ["Good"],
                imagePaths: [],
                imageSizes: [],
            },
            {
                itemId:
                    moment()
                        .valueOf()
                        .toString() +
                    1 +
                    generateUid(),
                type: 'FX',
                startDate: moment()
                    .add(1, 'days')
                    .valueOf(),
                endDate: moment()
                    .add(1, 'days')
                    .add(4, 'hours')
                    .valueOf(),
                class: 'BUY',
                pair: 'EUR/USD',
                lot: '0.2',
                entryRate: '112.532',
                lossCutRate: '112.432',
                settleRate: '112.892',
                profit: '3000',
                tags: ["Good"],
                beforeComment: i18n.t('ii_2_before_comment'),
                afterComment: i18n.t('ii_1_after_comment'),
                imagePaths: [],
                imageSizes: [],
            },
            {
                itemId:
                    moment()
                        .valueOf()
                        .toString() + generateUid(),
                type: 'FX',
                startDate: moment()
                    .add(2, 'days')
                    .valueOf(),
                endDate: moment()
                    .add(3, 'days')
                    .add(2, 'hours')
                    .valueOf(),
                class: 'BUY',
                pair: 'GBP/USD',
                lot: '0.05',
                entryRate: '112.462',
                lossCutRate: '112.352',
                settleRate: '112.352',
                profit: '-4500',
                tags: ["Bad"],
                beforeComment: i18n.t('ii_3_before_comment'),
                afterComment: i18n.t('ii_1_after_comment'),
                imagePaths: [],
                imageSizes: [],
            },
        ]

        yield createInitialItemsToFirebase({ items: items, userId: userId })

        // update userdata to store
        yield updateUserDataToStore({ userData: userData })

        // update userItem to store
        yield updateItemsToStore({ items: items })

        // update userStatus to store
        const userStatus = 'SIGNIN'
        yield updateUserStatusToStore({ userStatus: userStatus })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "SIGN_UP"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('Sign up error... \n', code, message)
    }
}

function* handleSignOutRequest(action) {
    try {
        // loading true
        const loadingStatus = "SIGN_OUT"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // signOut firebase
        yield signOutFromFirebase()

        // update userData to store
        //const userData = {}
        //yield updateUserDataToStore({userData: userData})

        // update items to store
        const items = []
        yield updateItemsToStore({ items: items })

        // update userStatus to store
        const userStatus = 'SIGNOUT'
        yield updateUserStatusToStore({ userStatus: userStatus })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "SIGN_OUT"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('Sign out error... \n', code)
    }
}

function* handleIsSignInRequest(action) {
    try {
        // loading true
        const loadingStatus = "IS_SIGN_IN"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // checkIsSignIn
        const { user, error } = yield checkIsSignIn()

        // update userStatus
        var userStatus = yield select(getUserStatus)
        if (user) {
            userStatus = 'SIGNIN'
        }
        yield updateUserStatusToStore({ userStatus: userStatus })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "IS_SIGN_IN"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('isSignin error... \n', code)
    }
}

function* handleCheckIsMatchPasswordRequest(action) {
    try {
        const password = action.payload

        // loading true
        const loadingStatus = "CHECK_PASSWORD"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

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
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // isCheckPassword false
        isMatchPassword = false
        yield updateIsMatchPasswordToStore({ isMatchPassword: isMatchPassword })

        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "CHECK_PASSWORD"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('check password error... \n', code)
    }
}

function* signSaga(context) {
    yield takeEvery(SIGN_IN_REQUEST, handleSignInRequest)
    yield takeEvery(SIGN_UP_REQUEST, handleSignUpRequest)
    yield takeEvery(SIGN_OUT_REQUEST, handleSignOutRequest)
    yield takeEvery(IS_SIGN_IN_REQUEST, handleIsSignInRequest)
    yield takeEvery(CHECK_IS_MATCH_PASSWORD_REQUEST, handleCheckIsMatchPasswordRequest)
}

export default signSaga
