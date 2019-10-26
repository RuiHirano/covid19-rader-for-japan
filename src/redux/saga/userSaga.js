import { put, takeEvery, call, take } from 'redux-saga/effects'
import { select } from 'redux-saga/effects'
import { getUserData } from './selector'
import * as MailComposer from 'expo-mail-composer'
import { checkErrorCode } from './../../app/firebase/errors'
import {
    updateLoadingState,
    updateUserDataToStore,
    updateUserStatusToStore,
    updateUserDataToFirestore,
    deleteAccountAndDatabaseFromFirestore,
    sendPasswordResetEmail,
    updateEmail,
    uploadImageToStorage,
} from './utilSaga'
import { createAction } from 'redux-actions'

// UPDATE USER DATA
export const UPDATE_USERDATA_REQUEST = 'UPDATE_USERDATA_REQUEST'
export const updateUserdataRequest = createAction(UPDATE_USERDATA_REQUEST)

// UPDATE USER_NAME
export const UPDATE_USER_NAME_REQUEST = 'UPDATE_USER_NAME_REQUEST'
export const updateUserNameRequest = createAction(UPDATE_USER_NAME_REQUEST)

// UPDATE NOTIFICATION
export const UPDATE_NOTIFICATION_REQUEST = 'UPDATE_NOTIFICATION_REQUEST'
export const updateNotificationRequest = createAction(
    UPDATE_NOTIFICATION_REQUEST
)

// UPDATE LANGUAGE
export const UPDATE_LANGUAGE_REQUEST = 'UPDATE_LANGUAGE_REQUEST'
export const updateLanguageRequest = createAction(UPDATE_LANGUAGE_REQUEST)

// UPDATE USER_STATUS
export const UPDATE_USER_STATUS_REQUEST = 'UPDATE_USER_STATUS_REQUEST'
export const updateUserStatusRequest = createAction(UPDATE_USER_STATUS_REQUEST)



// UPDATE EMAIL
export const UPDATE_EMAIL_REQUEST = 'UPDATE_EMAIL_REQUEST'
export const updateEmailRequest = createAction(UPDATE_EMAIL_REQUEST)

// UPDATE PASSWORD
export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST'
export const updatePasswordRequest = createAction(UPDATE_PASSWORD_REQUEST)

// DELETE ACCOUNT
export const DELETE_ACCOUNT_REQUEST = 'DELETE_ACCOUNT_REQUEST'
export const deleteAccountRequest = createAction(DELETE_ACCOUNT_REQUEST)

// DOWNLOAD USER IMAGE
export const DOWNLOAD_USER_IMAGE_REQUEST = 'DOWNLOAD_USER_IMAGE_REQUEST'
export const downloadUserImageRequest = createAction(
    DOWNLOAD_USER_IMAGE_REQUEST
)

// POST INQUIRY REQUEST
export const POST_INQUIRY_REQUEST = 'POST_INQUIRY_REQUEST'
export const postInquiryRequest = createAction(POST_INQUIRY_REQUEST)

// UPDATE INITIAL_INVESTMENT
export const UPDATE_INITIAL_INVESTMENT_REQUEST =
    'UPDATE_INITIAL_INVESTMENT_REQUEST'
export const updateInitialInvestmentRequest = createAction(
    UPDATE_INITIAL_INVESTMENT_REQUEST
)

// UPDATE BANKRUPTCY_REDUCTION_RATE
export const UPDATE_BANKRUPTCY_REDUCTION_RATE_REQUEST =
    'UPDATE_BANKRUPTCY_REDUCTION_RATE_REQUEST'
export const updateBankruptcyReductionRateRequest = createAction(
    UPDATE_BANKRUPTCY_REDUCTION_RATE_REQUEST
)

// UPDATE ALLOWABLE_LOSS_RATE
export const UPDATE_ALLOWABLE_LOSS_RATE_REQUEST =
    'UPDATE_ALLOWABLE_LOSS_RATE_REQUEST'
export const updateAllowableLossRateRequest = createAction(
    UPDATE_ALLOWABLE_LOSS_RATE_REQUEST
)

// UPDATE TRADING_ISSUES
export const UPDATE_TRADING_ISSUES_REQUEST = 'UPDATE_TRADING_ISSUES_REQUEST'
export const updateTradingIssuesRequest = createAction(
    UPDATE_TRADING_ISSUES_REQUEST
)

// UPDATE_USER_ICON
export const UPDATE_USER_ICON_REQUEST = 'UPDATE_USER_ICON_REQUEST'
export const updateUserIconRequest = createAction(UPDATE_USER_ICON_REQUEST)

// UPDATE TRADING_CURRENCY
export const UPDATE_TRADING_CURRENCY_REQUEST = 'UPDATE_TRADING_CURRENCY_REQUEST'
export const updateTradingCurrencyRequest = createAction(
    UPDATE_TRADING_CURRENCY_REQUEST
)



// UPDATE_TAGS
export const UPDATE_TAGS_REQUEST = 'UPDATE_TAGS_REQUEST'
export const DELETE_TAGS_REQUEST = 'DELETE_TAGS_REQUEST'
export const updateTagsRequest = createAction(UPDATE_TAGS_REQUEST)
export const deleteTagsRequest = createAction(DELETE_TAGS_REQUEST)

function* handleUpdateUserNameRequest(action) {
    try {
        const { userName } = action.payload

        // loading true
        const loadingStatus = "UPDATE_USER_NAME"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // userName to userData
        var userData = yield select(getUserData)
        userData.userName = userName

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        yield updateUserDataToStore({ userData: userData })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_USER_NAME"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('update username error... \n', code)
    }
}

function* handleUpdateUserStatusRequest(action) {
    try {
        const { userStatus } = action.payload

        // loading true
        const loadingStatus = "UPDATE_USER_STATUS"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // userName to userData
        var userData = yield select(getUserData)
        userData.userStatus = userStatus

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore({ userData: userData })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_USER_STATUS"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('update userstatus error... \n', code)
    }
}

function* handleUpdateNotificationRequest(action) {
    try {
        const { notification } = action.payload

        // loading true
        const loadingStatus = "UPDATE_NOTIFICATION"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // userName to userData
        var userData = yield select(getUserData)
        userData.notification = notification

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })
        /* yield call(
             db.updateDocument,
             'users/' + userData.userId + '/userData/' + userData.userDataId, 
             userData
         )*/

        // update userData to store
        yield updateUserDataToStore({ userData: userData })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_NOTIFICATION"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('update notification error... \n', code)
    }
}

function* handleUpdateLanguageRequest(action) {
    try {
        const { language } = action.payload

        // loading true
        const loadingStatus = "UPDATE_LANGUAGE"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // userName to userData
        var userData = yield select(getUserData)
        userData.language = language

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore({ userData: userData })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_LANGUAGE"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('update lunguage error... \n', code)
    }
}

function* handleUpdateInitialInvestmentRequest(action) {
    try {
        const { initialInvestment } = action.payload

        // loading true
        const loadingStatus = "UPDATE_INITIAL_INVESTMENT"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // userName to userData
        var userData = yield select(getUserData)
        userData.initialInvestment = initialInvestment

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore({ userData: userData })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_INITIAL_INVESTMENT"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('update allowable loss rate error... \n', code)
    }
}

function* handleUpdateBankruptcyReductionRateRequest(action) {
    try {
        const { bankruptcyReductionRate } = action.payload

        // loading true
        const loadingStatus = "UPDATE_BANKRUPTCY_REDUCTION_RATE"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // userName to userData
        var userData = yield select(getUserData)
        userData.bankruptcyReductionRate = bankruptcyReductionRate

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore({ userData: userData })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_BANKRUPTCY_REDUCTION_RATE"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('update bankruptcy reduction rate error... \n', code)
    }
}

function* handleUpdateAllowableLossRateRequest(action) {
    try {
        const { allowableLossRate } = action.payload

        // loading true
        const loadingStatus = "UPDATE_ALLOWABLE_LOSS_RATE"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // userName to userData
        var userData = yield select(getUserData)
        userData.allowableLossRate = allowableLossRate

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore({ userData: userData })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_ALLOWABLE_LOSS_RATE"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('update initial inbestment error... \n', code)
    }
}

function* handleUpdateTradingCurrencyRequest(action) {
    try {
        const { tradingCurrency } = action.payload

        // loading true
        const loadingStatus = "UPDATE_TRADING_CURRENCY"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // userName to userData
        var userData = yield select(getUserData)
        userData.tradingCurrency = tradingCurrency

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore({ userData: userData })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_TRADING_CURRENCY"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('update trading currency error... \n', code)
    }
}

function* handleUpdateTradingIssuesRequest(action) {
    try {
        const { tradingIssues } = action.payload

        // loading true
        const loadingStatus = "UPDATE_TRADING_ISSUES"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // userName to userData
        var userData = yield select(getUserData)
        userData.tradingIssues = tradingIssues

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore({ userData: userData })
        //yield put({ type: UPDATE_USER_DATA_TO_STORE, payload: { userData: userData }, error: false})

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_TRADING_ISSUES"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('Update trading issues error... \n', code)
    }
}

function* handleUpdateEmailRequest(action) {
    try {
        const { email } = action.payload

        // loading true
        const loadingStatus = "UPDATE_EMAIL"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // update email at auth
        yield updateEmail({ email: email })

        // modified user data
        var userData = yield select(getUserData)
        userData.email = email

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        yield updateUserDataToStore({ userData: userData })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_EMAIL"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('Update email error... \n', code)
    }
}

function* handleUpdatePasswordRequest(action) {
    try {
        const { email } = action.payload

        // loading true
        const loadingStatus = "UPDATE_PASSWORD"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // update email at auth
        yield sendPasswordResetEmail({ email: email })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_PASSWORD"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('Update password error... \n', code)
    }
}

function* handleDeleteAccountRequest(action) {
    try {
        // loading true
        const loadingStatus = "DELETE_ACCOUNT"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // delete account
        const userData = yield select(getUserData)
        const { userId } = userData
        yield deleteAccountAndDatabaseFromFirestore({ userId: userId })

        // delete store
        yield updateUserDataToStore({ userData: {} })

        // signout
        const userStatus = 'SIGNOUT'
        yield updateUserStatusToStore({ userStatus: userStatus })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "DELETE_ACCOUNT"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('Delete account error... \n', code)
    }
}

function* handlePostInquiryRequest(action) {
    try {
        const { subject, body } = action.payload.inquiryForm

        // loading true
        const loadingStatus = "POST_INQUIRY"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "POST_INQUIRY"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('Post inquiry error... \n', code)
    }
}

function* handleUpdateUserIconRequest(action) {
    try {
        const { urls } = action.payload

        // loading true
        const loadingStatus = "UPDATE_USER_ICON"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // userId
        const userData = yield select(getUserData)
        const { userId, userDataId } = userData
        // create to firestore
        var fileDir = '/users/' + userId + '/icon/'
        const { imagePaths, imageSizes } = yield uploadImageToStorage({
            urls: urls,
            fileDir: fileDir,
        })

        // modified userData
        userData.icon = imagePaths[0]
        // update userdata to firestore
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })
        // update userData to store
        yield updateUserDataToStore({ userData: userData })
        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_USER_ICON"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('update userIcon error... \n', code)
    }
}

function* handleUpdateTagsRequest(action) {
    try {
        const { tag } = action.payload

        // loading true
        const loadingStatus = "UPDATE_TAGS"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // userData
        var userData = yield select(getUserData)
        const { userId, userDataId, tags } = userData
        tags.push(tag)
        userData.tags = tags

        // update userdata to firestore
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore({ userData: userData })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "UPDATE_TAGS"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('update Tags error... \n', code)
    }
}

function* handleDeleteTagsRequest(action) {
    try {
        const { deleteTag } = action.payload

        // loading true
        const loadingStatus = "DELETE_TAGS"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false })

        // userData
        var userData = yield select(getUserData)
        const { userId, userDataId, tags } = userData
        tags.map((tag, index)=>{
            if(tag === deleteTag){
                tags.splice(index, 1)
            }
        })
        userData.tags = tags

        // update userdata to firestore
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })
        // update userData to store
        yield updateUserDataToStore({ userData: userData })
        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false })
    } catch ({ code, message }) {
        // error
        const error_message = checkErrorCode(code)
        const loadingStatus = "DELETE_TAGS"
        yield updateLoadingState({
            loadingStatus: loadingStatus,
            isLoading: false,
            error: true,
            error_message: error_message,
        })
        console.log('delete Tags error... \n', code)
    }
}

function* signSaga(context) {
    yield takeEvery(UPDATE_USER_NAME_REQUEST, handleUpdateUserNameRequest)
    yield takeEvery(UPDATE_USER_STATUS_REQUEST, handleUpdateUserStatusRequest)
    yield takeEvery(UPDATE_EMAIL_REQUEST, handleUpdateEmailRequest)
    yield takeEvery(UPDATE_PASSWORD_REQUEST, handleUpdatePasswordRequest)
    yield takeEvery(DELETE_ACCOUNT_REQUEST, handleDeleteAccountRequest)
    yield takeEvery(POST_INQUIRY_REQUEST, handlePostInquiryRequest)
    yield takeEvery(
        UPDATE_NOTIFICATION_REQUEST,
        handleUpdateNotificationRequest
    )
    yield takeEvery(UPDATE_LANGUAGE_REQUEST, handleUpdateLanguageRequest)
    yield takeEvery(
        UPDATE_INITIAL_INVESTMENT_REQUEST,
        handleUpdateInitialInvestmentRequest
    )
    yield takeEvery(
        UPDATE_BANKRUPTCY_REDUCTION_RATE_REQUEST,
        handleUpdateBankruptcyReductionRateRequest
    )
    yield takeEvery(
        UPDATE_ALLOWABLE_LOSS_RATE_REQUEST,
        handleUpdateAllowableLossRateRequest
    )
    yield takeEvery(
        UPDATE_TRADING_CURRENCY_REQUEST,
        handleUpdateTradingCurrencyRequest
    )
    yield takeEvery(
        UPDATE_TRADING_ISSUES_REQUEST,
        handleUpdateTradingIssuesRequest
    )
    yield takeEvery(UPDATE_USER_ICON_REQUEST, handleUpdateUserIconRequest)
    yield takeEvery(UPDATE_TAGS_REQUEST, handleUpdateTagsRequest)
    yield takeEvery(DELETE_TAGS_REQUEST, handleDeleteTagsRequest)
}
export default signSaga
