import { put, takeEvery, call, take } from 'redux-saga/effects'
import { select } from 'redux-saga/effects'
import { getUser, getApp, getAppState } from '../selector'
//import { checkErrorCode } from '../../../app/firebase/errors'
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
} from '../utilSaga'
import actionCreatorFactory from 'typescript-fsa';
import { User, Item, Notification, Profile, Setting, Content, BankAccount, Loading, LoadingState, Error, App, State, Language, Plan } from '../../../types'


const actionCreator = actionCreatorFactory();

/*export interface UpdateUserNameState {
    userName: UserData["userName"]
}

export interface UpdateNotificationState {
    notification: Notification
}

export interface UpdateLanguageState{
    language: UserData["language"]
}

export interface UpdateUserStatusState {
    userStatus: UserState["userStatus"]
}
export interface UpdateEmailState {
    email: UserData["email"]
}
export interface UpdatePasswordState {
    email: UserData["email"],
}

export interface PostInquiryState {
    subject: string,
    body: string
}

export interface DownloadUserImageState {
    searchTags: string[],
}
export interface UpdateInitialInvestmentState {
    initialInvestment: UserData["initialInvestment"],
}
export interface UpdateBankruptcyReductionRateState {
    bankruptcyReductionRate: UserData["bankruptcyReductionRate"],
}
export interface UpdateAllowableLossRateState {
    allowableLossRate: UserData["allowableLossRate"],
}
export interface UpdateTradingIssuesState {
    tradingIssues: CurrencyData[],
}
export interface UpdateUserIconState {
    urls: string[],
}
export interface UpdateTradingCurrencyState {
    tradingCurrency: CurrencyData[],
}

export interface UpdateTagsState {
    tag: string
}

export interface DeleteTagsState {
    deleteTag: string,
}*/

export interface UpdateProfileState {
	profile: Profile,
}

export interface UpdateSettingState {
	setting: Setting,
}

export interface UpdateContentState {
	content: Content,
}

export interface UpdateEmailState {
	email: Setting["Email"],
}

export interface UpdatePasswordState {
	password: string,
}

export interface UpdateLanguageState {
	language: Language,
}

export interface UpdatePlanState {
	plan: Plan,
}

export interface UpdateUserState {
	user: User,
}

export interface UpdateNotificationState {
	emailNotify: boolean,
	pushNotify: boolean
}

export interface UpdateBankAccountState {
	bankAccount: BankAccount,
}

export enum UserActions {
	//UPDATE_PROFILE_ACTION = "UPDATE_PROFILE_ACTION",
	//UPDATE_SETTING_ACTION = "UPDATE_SETTING_ACTION",
	//UPDATE_CONTENT_ACTION = "UPDATE_CONTENT_ACTION",
	UPDATE_EMAIL_ACTION = "UPDATE_EMAIL_ACTION",
	UPDATE_PASSWORD_ACTION = "UPDATE_PASSWORD_ACTION",
	UPDATE_USER_ACTION = "UPDATE_USER_ACTION",
	//UPDATE_BANK_ACCOUNT_ACTION = "UPDATE_BANK_ACCOUNT_ACTION",
	//UPDATE_NOTIFICATION_ACTION = "UPDATE_NOTIFICATION_ACTION",
	//UPDATE_LANGUAGE_ACTION = "UPDATE_LANGUAGE_ACTION",
	//UPDATE_PLAN_ACTION = "UPDATE_PLAN_ACTION",
	DELETE_ACCOUNT_ACTION = "DELETE_ACCOUNT_ACTION",
}

export const userActions = {
	//updateProfileAction: actionCreator<UpdateProfileState>(UserActions.UPDATE_PROFILE_ACTION),
	//updateSettingAction: actionCreator<UpdateSettingState>(UserActions.UPDATE_SETTING_ACTION),
	//updateContentAction: actionCreator<UpdateContentState>(UserActions.UPDATE_CONTENT_ACTION),
	updateUserAction: actionCreator<UpdateUserState>(UserActions.UPDATE_USER_ACTION),
	updateEmailAction: actionCreator<UpdateEmailState>(UserActions.UPDATE_EMAIL_ACTION),
	updatePasswordAction: actionCreator<UpdatePasswordState>(UserActions.UPDATE_PASSWORD_ACTION),
	//updateNotificationAction: actionCreator<UpdateNotificationState>(UserActions.UPDATE_NOTIFICATION_ACTION),
	//updateLanguageAction: actionCreator<UpdateLanguageState>(UserActions.UPDATE_LANGUAGE_ACTION),
	//updatePlanAction: actionCreator<UpdatePlanState>(UserActions.UPDATE_PLAN_ACTION),
	//updateBankAccountAction: actionCreator<UpdateBankAccountState>(UserActions.UPDATE_BANK_ACCOUNT_ACTION),
	deleteAccountAction: actionCreator(UserActions.DELETE_ACCOUNT_ACTION),
    /*downloadUserImageRequest: actionCreator<DownloadUserImageState>('DOWNLOAD_USER_IMAGE_REQUEST'),
    postInquiryRequest: actionCreator<PostInquiryState>('POST_INQUIRY_REQUEST'),
    updateInitialInvestmentRequest: actionCreator<UpdateInitialInvestmentState>('UPDATE_INITIAL_INVESTMENT_REQUEST'),
    updateBankruptcyReductionRateRequest: actionCreator<UpdateBankruptcyReductionRateState>('UPDATE_BANKRUPTCY_REDUCTION_RATE_REQUEST'),
    updateAllowableLossRateRequest: actionCreator<UpdateAllowableLossRateState>('UPDATE_ALLOWABLE_LOSS_RATE_REQUEST'),
    updateTradingIssuesRequest: actionCreator<UpdateTradingIssuesState>('UPDATE_TRADING_ISSUES_REQUEST'),
    updateUserIconRequest: actionCreator<UpdateUserIconState>('UPDATE_USER_ICON_REQUEST'),
    updateTradingCurrencyRequest: actionCreator<UpdateTradingCurrencyState>('UPDATE_TRADING_CURRENCY_REQUEST'),
    updateTagsRequest: actionCreator<UpdateTagsState>('UPDATE_TAGS_REQUEST'),
    deleteTagsRequest: actionCreator<DeleteTagsState>('DELETE_TAGS_REQUEST'),*/
};


/*function* handleUpdateUserNameRequest(action: ReturnType<typeof userActions.updateUserNameRequest>) {
    try {
        const { userName } = action.payload

        // loading true
        const loadingStatus = "UPDATE_USER_NAME"

        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false, errorMessage: "" })

        // userName to userData
        var userData: UserData = yield select(getUserData)
        userData.userName = userName

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        yield updateUserDataToStore(userData)

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false, errorMessage: "" })
    } catch ({ code, message }) {
        // error
        const errorMessage = "checkErrorCode(code)"
        const loadingStatus = "UPDATE_USER_NAME"
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
        console.log('update username error... \n', code)
    }
}*/

/*function* handleUpdateUserStatusRequest(action: ReturnType<typeof userActions.updateUserStatusRequest>) {
    try {
        const { userStatus } = action.payload

        // loading true
        const loadingStatus = "UPDATE_USER_STATUS"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false, errorMessage: ""  })

        // userName to userData
        var userData: UserData = yield select(getUserData)
        userData.userStatus = userStatus

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore(userData)

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false, errorMessage: ""  })
    } catch ({ code, message }) {
        // error
        const errorMessage = "checkErrorCode(code)"
        const loadingStatus = "UPDATE_USER_STATUS"
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
        console.log('update userstatus error... \n', code)
    }
}*/

/*function* handleUpdateNotification(action: ReturnType<typeof userActions.updateNotificationRequest>) {
    try {
        const { notification } = action.payload

        // loading true
        const loadingStatus = "UPDATE_NOTIFICATION"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false, errorMessage: ""  })

        // userName to userData
        var userData: UserData = yield select(getUserData)
        userData.notification = notification

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore(userData)

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false, errorMessage: ""  })
    } catch ({ code, message }) {
        // error
        const errorMessage = "checkErrorCode(code)"
        const loadingStatus = "UPDATE_NOTIFICATION"
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
        console.log('update notification error... \n', code)
    }
}*/

/*function* handleUpdateLanguageRequest(action: ReturnType<typeof userActions.updateLanguageRequest>) {
    try {
        const { language } = action.payload

        // loading true
        const loadingStatus = "UPDATE_LANGUAGE"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false, errorMessage: ""  })

        // userName to userData
        var userData: UserData = yield select(getUserData)
        userData.language = language

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore(userData)

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false, errorMessage: ""  })
    } catch ({ code, message }) {
        // error
        const errorMessage = "checkErrorCode(code)"
        const loadingStatus = "UPDATE_LANGUAGE"
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
        console.log('update lunguage error... \n', code)
    }
}*/

/*function* handleUpdateInitialInvestmentRequest(action: ReturnType<typeof userActions.updateInitialInvestmentRequest>) {
    try {
        const { initialInvestment } = action.payload

        // loading true
        const loadingStatus = "UPDATE_INITIAL_INVESTMENT"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false, errorMessage: ""  })

        // userName to userData
        var userData: UserData = yield select(getUserData)
        userData.initialInvestment = initialInvestment

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore(userData)

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false, errorMessage: ""  })
    } catch ({ code, message }) {
        // error
        const errorMessage = "checkErrorCode(code)"
        const loadingStatus = "UPDATE_INITIAL_INVESTMENT"
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
        console.log('update allowable loss rate error... \n', code)
    }
}

function* handleUpdateBankruptcyReductionRateRequest(action: ReturnType<typeof userActions.updateBankruptcyReductionRateRequest>) {
    try {
        const { bankruptcyReductionRate } = action.payload

        // loading true
        const loadingStatus = "UPDATE_BANKRUPTCY_REDUCTION_RATE"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false, errorMessage: ""  })

        // userName to userData
        var userData: UserData = yield select(getUserData)
        userData.bankruptcyReductionRate = bankruptcyReductionRate

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore(userData)

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false, errorMessage: ""  })
    } catch ({ code, message }) {
        // error
        const errorMessage = "checkErrorCode(code)"
        const loadingStatus = "UPDATE_BANKRUPTCY_REDUCTION_RATE"
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
        console.log('update bankruptcy reduction rate error... \n', code)
    }
}

function* handleUpdateAllowableLossRateRequest(action: ReturnType<typeof userActions.updateAllowableLossRateRequest>) {
    try {
        const { allowableLossRate } = action.payload

        // loading true
        const loadingStatus = "UPDATE_ALLOWABLE_LOSS_RATE"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false, errorMessage: ""  })

        // userName to userData
        var userData: UserData = yield select(getUserData)
        userData.allowableLossRate = allowableLossRate

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore(userData)

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false, errorMessage: ""  })
    } catch ({ code, message }) {
        // error
        const errorMessage = "checkErrorCode(code)"
        const loadingStatus = "UPDATE_ALLOWABLE_LOSS_RATE"
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
        console.log('update initial inbestment error... \n', code)
    }
}*/

/*function* handleUpdateTradingCurrencyRequest(action: ReturnType<typeof userActions.updateTradingCurrencyRequest>) {
    try {
        const { tradingCurrency } = action.payload

        // loading true
        const loadingStatus = "UPDATE_TRADING_CURRENCY"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false, errorMessage: ""  })

        // userName to userData
        var userData: UserData = yield select(getUserData)
        userData.tradingCurrency = tradingCurrency

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore(userData)

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false, errorMessage: ""  })
    } catch ({ code, message }) {
        // error
        const errorMessage = "checkErrorCode(code)"
        const loadingStatus = "UPDATE_TRADING_CURRENCY"
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
        console.log('update trading currency error... \n', code)
    }
}*/

/*function* handleUpdateTradingIssuesRequest(action: ReturnType<typeof userActions.updateTradingIssuesRequest>) {
    try {
        const { tradingIssues } = action.payload

        // loading true
        const loadingStatus = "UPDATE_TRADING_ISSUES"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false, errorMessage: ""  })

        // userName to userData
        var userData: UserData = yield select(getUserData)
        userData.tradingIssues = tradingIssues

        // regist userdata to firebase
        const { userId, userDataId } = userData
        yield updateUserDataToFirestore({
            userId: userId,
            userDataId: userDataId,
            userData: userData,
        })

        // update userData to store
        yield updateUserDataToStore(userData)
        //yield put({ type: UPDATE_USER_DATA_TO_STORE, payload: userData, error: false, errorMessage: "" })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false, errorMessage: ""  })
    } catch ({ code, message }) {
        // error
        const errorMessage = "checkErrorCode(code)"
        const loadingStatus = "UPDATE_TRADING_ISSUES"
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
        console.log('Update trading issues error... \n', code)
    }
}*/

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
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_PASSWORD
		}
		yield updateLoadingStore(loading)

		const errorMessage = "checkErrorCode(code)"
		let error = <Error>{
			IsError: true,
			Status: errorMessage,
		}
		yield updateErrorStore(error)
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

		// loading true
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.DELETE_ACCOUNT
		}
		yield updateLoadingStore(loading)

		// delete account
		const user: User = yield select(getUser)
		yield deleteAllDataFirestore(user.ID)

		// delete store
		const newUser = new User()
		yield updateUserStore(newUser)

		// signout
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
			LoadingState: LoadingState.DELETE_ACCOUNT
		}
		yield updateLoadingStore(loading)

		const errorMessage = "checkErrorCode(code)"
		let error = <Error>{
			IsError: true,
			Status: errorMessage,
		}
		yield updateErrorStore(error)
		console.log('Delete account error... \n', code)
	}
}

function* handleUpdateUser(action: ReturnType<typeof userActions.updateUserAction>) {
	try {
		const { user } = action.payload

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// loading true
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_USER
		}
		yield updateLoadingStore(loading)

		// regist userdata to firebase
		yield updateUserFirestore(user)

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
			LoadingState: LoadingState.UPDATE_USER
		}
		yield updateLoadingStore(loading)


		console.log('update user error... \n', code)
	}
}

// Profileの更新
/*function* handleUpdateProfile(action: ReturnType<typeof userActions.updateProfileAction>) {
	try {
		const { profile } = action.payload

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// loading開始
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_PROFILE
		}
		yield updateLoadingStore(loading)

		// user情報取得
		var user: User = yield select(getUser)
		user.Profile = profile

		// firestoreに更新
		yield updateUserFirestore(user)

		// storeに更新
		yield updateUserStore(user)

		// loading　終了
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
			LoadingState: LoadingState.UPDATE_PROFILE
		}
		yield updateLoadingStore(loading)

		console.log('update profile error... \n', code, message)
	}
}

function* handleUpdateSetting(action: ReturnType<typeof userActions.updateSettingAction>) {
	try {
		const { setting } = action.payload

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// loading true
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_SETTING
		}
		yield updateLoadingStore(loading)

		// userName to userData
		var user: User = yield select(getUser)
		user.Setting = setting

		// regist userdata to firebase
		// regist userdata to firebase
		yield updateUserFirestore(user)

		yield updateUserStore(user)

		// loading false
		loading.IsLoading = false
		yield updateLoadingStore(loading)

	} catch ({ code, message }) {
		// error
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_SETTING
		}
		yield updateLoadingStore(loading)

		const errorMessage = "checkErrorCode(code)"
		let error = <Error>{
			IsError: true,
			Status: errorMessage,
		}
		yield updateErrorStore(error)
		console.log('update username error... \n', code)
	}
}

function* handleUpdateContent(action: ReturnType<typeof userActions.updateContentAction>) {
	try {
		const { content } = action.payload

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// loading true
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_CONTENT
		}
		yield updateLoadingStore(loading)

		// userName to userData
		let user: User = yield select(getUser)
		user.Setting.Content = content

		// regist userdata to firebase
		// regist userdata to firebase
		yield updateUserFirestore(user)

		yield updateUserStore(user)

		// loading false
		loading.IsLoading = false
		yield updateLoadingStore(loading)

	} catch ({ code, message }) {
		// error
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_CONTENT
		}
		yield updateLoadingStore(loading)

		const errorMessage = "checkErrorCode(code)"
		let error = <Error>{
			IsError: true,
			Status: errorMessage,
		}
		yield updateErrorStore(error)
		console.log('update username error... \n', code)
	}
}

function* handleUpdateNotification(action: ReturnType<typeof userActions.updateNotificationAction>) {
	try {
		const { emailNotify, pushNotify } = action.payload

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// loading true
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_NOTIFICATION
		}
		yield updateLoadingStore(loading)

		// userName to userData
		let user: User = yield select(getUser)
		user.Setting.Notification = <Notification>{
			Email: emailNotify,
			Push: pushNotify
		}

		// regist userdata to firebase
		yield updateUserFirestore(user)

		yield updateUserStore(user)

		// loading false
		loading.IsLoading = false
		yield updateLoadingStore(loading)

	} catch ({ code, message }) {
		// error
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_NOTIFICATION
		}
		yield updateLoadingStore(loading)

		const errorMessage = "checkErrorCode(code)"
		let error = <Error>{
			IsError: true,
			Status: errorMessage,
		}
		yield updateErrorStore(error)
		console.log('update username error... \n', code)
	}
}

function* handleUpdateLanguage(action: ReturnType<typeof userActions.updateLanguageAction>) {
	try {
		const { language } = action.payload

		console.log("language: ", language)

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// loading true
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_LANGUAGE
		}
		yield updateLoadingStore(loading)

		// userName to userData
		let user: User = yield select(getUser)
		user.Setting.Language = language

		// regist userdata to firebase
		yield updateUserFirestore(user)

		yield updateUserStore(user)

		// loading false
		loading.IsLoading = false
		yield updateLoadingStore(loading)

	} catch ({ code, message }) {
		// error
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_LANGUAGE
		}
		yield updateLoadingStore(loading)

		const errorMessage = "checkErrorCode(code)"
		let error = <Error>{
			IsError: true,
			Status: errorMessage,
		}
		yield updateErrorStore(error)
		console.log('update language error... \n', code)
	}
}


function* handleUpdateBankAccount(action: ReturnType<typeof userActions.updateBankAccountAction>) {
	try {
		const { bankAccount } = action.payload

		// errorをfalseにする
		let error = <Error>{
			IsError: false,
		}
		yield updateErrorStore(error)

		// loading true
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_BANK_ACCOUNT
		}
		yield updateLoadingStore(loading)

		// userName to userData
		var user: User = yield select(getUser)
		user.Setting.BankAccount = bankAccount

		// regist userdata to firebase
		// regist userdata to firebase
		yield updateUserFirestore(user)

		yield updateUserStore(user)

		// loading false
		loading.IsLoading = false
		yield updateLoadingStore(loading)

	} catch ({ code, message }) {
		// error
		let loading = <Loading>{
			IsLoading: true,
			LoadingState: LoadingState.UPDATE_BANK_ACCOUNT
		}
		yield updateLoadingStore(loading)

		const errorMessage = "checkErrorCode(code)"
		let error = <Error>{
			IsError: true,
			Status: errorMessage,
		}
		yield updateErrorStore(error)
		console.log('update username error... \n', code)
	}
}*/

/*function* handlePostInquiryRequest(action: ReturnType<typeof userActions.postInquiryRequest>) {
    try {
        const { subject, body } = action.payload

        // loading true
        const loadingStatus = "POST_INQUIRY"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false, errorMessage: ""  })

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false, errorMessage: ""  })
    } catch ({ code, message }) {
        // error
        const errorMessage = "checkErrorCode(code)"
        const loadingStatus = "POST_INQUIRY"
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
        console.log('Post inquiry error... \n', code)
    }
}*/

/*function* handleUpdateUserIconRequest(action: ReturnType<typeof userActions.updateUserIconRequest>) {
    try {
        const { urls } = action.payload

        // loading true
        const loadingStatus = "UPDATE_USER_ICON"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false, errorMessage: ""  })

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
        yield updateUserDataToStore(userData)
        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false, errorMessage: ""  })
    } catch ({ code, message }) {
        // error
        const errorMessage = "checkErrorCode(code)"
        const loadingStatus = "UPDATE_USER_ICON"
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
        console.log('update userIcon error... \n', code)
    }
}*/

/*function* handleUpdateTagsRequest(action: ReturnType<typeof userActions.updateTagsRequest>) {
    try {
        const { tag } = action.payload

        // loading true
        const loadingStatus = "UPDATE_TAGS"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false, errorMessage: ""  })

        // userData
        var userData: UserData = yield select(getUserData)
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
        yield updateUserDataToStore(userData)

        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false, errorMessage: ""  })
    } catch ({ code, message }) {
        // error
        const errorMessage = "checkErrorCode(code)"
        const loadingStatus = "UPDATE_TAGS"
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
        console.log('update Tags error... \n', code)
    }
}*/

/*function* handleDeleteTagsRequest(action: ReturnType<typeof userActions.deleteTagsRequest>) {
    try {
        const { deleteTag } = action.payload

        // loading true
        const loadingStatus = "DELETE_TAGS"
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: true, error: false, errorMessage: ""  })

        // userData
        var userData: UserData = yield select(getUserData)
        const { userId, userDataId, tags } = userData
        tags.map((tag: string, index: number)=>{
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
        yield updateUserDataToStore(userData)
        // loading false
        yield updateLoadingState({loadingStatus: loadingStatus, isLoading: false, error: false, errorMessage: ""  })
    } catch ({ code, message }) {
        // error
        const errorMessage = "checkErrorCode(code)"
        const loadingStatus = "DELETE_TAGS"
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
        console.log('delete Tags error... \n', code)
    }
}*/

function* signSaga() {
	//yield takeEvery(UserActions.UPDATE_PROFILE_ACTION, handleUpdateProfile)
	//yield takeEvery(UserActions.UPDATE_SETTING_ACTION, handleUpdateSetting)
	//yield takeEvery(UserActions.UPDATE_CONTENT_ACTION, handleUpdateContent)
	yield takeEvery(UserActions.UPDATE_EMAIL_ACTION, handleUpdateEmail)
	yield takeEvery(UserActions.UPDATE_PASSWORD_ACTION, handleUpdatePassword)
	//yield takeEvery(UserActions.UPDATE_LANGUAGE_ACTION, handleUpdateLanguage)
	yield takeEvery(UserActions.DELETE_ACCOUNT_ACTION, handleDeleteAccount)
	//yield takeEvery(UserActions.UPDATE_BANK_ACCOUNT_ACTION, handleUpdateBankAccount)
	//yield takeEvery(UserActions.UPDATE_NOTIFICATION_ACTION, handleUpdateNotification)
	yield takeEvery(UserActions.UPDATE_USER_ACTION, handleUpdateUser)
    /*yield takeEvery(userActions.updateLanguageRequest.toString(), handleUpdateLanguageRequest)
    yield takeEvery(
        userActions.updateInitialInvestmentRequest.toString(),
        handleUpdateInitialInvestmentRequest
    )
    yield takeEvery(
        userActions.updateBankruptcyReductionRateRequest.toString(),
        handleUpdateBankruptcyReductionRateRequest
    )
    yield takeEvery(
        userActions.updateAllowableLossRateRequest.toString(),
        handleUpdateAllowableLossRateRequest
    )
    yield takeEvery(
        userActions.updateTradingCurrencyRequest.toString(),
        handleUpdateTradingCurrencyRequest
    )
    yield takeEvery(
        userActions.updateTradingIssuesRequest.toString(),
        handleUpdateTradingIssuesRequest
    )
    yield takeEvery(userActions.updateUserIconRequest.toString(), handleUpdateUserIconRequest)
    yield takeEvery(userActions.updateTagsRequest.toString(), handleUpdateTagsRequest)
    yield takeEvery(userActions.deleteTagsRequest.toString(), handleDeleteTagsRequest)*/
}
export default signSaga
