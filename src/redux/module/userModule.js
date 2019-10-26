import { handleActions, createAction } from 'redux-actions'

const initialState = {
    userStatus: 'WELCOME',
    isMatchPassword: "false",
    userData: {
        userId: '',
        userdataId: '',
        userName: '',
        email: '',
        statusMessage: '',
        language: 'default',
        icon: '',
        notification: {
            isNotification: true,
            isEmailNotification: true,
            isPushNotification: true,
        },
        userPlan: 'FREE',
        initialInvestment: 500000,
        tradingCurrency: [],
        tradingIssues: [],
    },
}

export default handleActions(
    {
        UPDATE_USER_DATA_TO_STORE: (state, action) => {
            const payload = action.payload

            return {
                userStatus: state.userStatus,
                isMatchPassword: state.isMatchPassword,
                userData: payload.userData,
            }
        },

        UPDATE_USER_STATUS_TO_STORE: (state, action) => {
            const payload = action.payload

            return {
                userData: state.userData,
                isMatchPassword: state.isMatchPassword,
                userStatus: payload.userStatus,
            }
        },

        UPDATE_IS_MATCH_PASSWORD_TO_STORE: (state, action) => {
            const payload = action.payload

            return {
                userData: state.userData,
                isMatchPassword: payload.isMatchPassword,
                userStatus: state.userStatus,
            }
        },
    },
    initialState
)

export const UPDATE_USER_DATA_TO_STORE = 'UPDATE_USER_DATA_TO_STORE'
export const updateUserdataSuccess = createAction(UPDATE_USER_DATA_TO_STORE)

export const UPDATE_USER_STATUS_TO_STORE = 'UPDATE_USER_STATUS_TO_STORE'
export const updateUserStatusToStore = createAction(UPDATE_USER_STATUS_TO_STORE)

export const UPDATE_IS_MATCH_PASSWORD_TO_STORE = 'UPDATE_IS_MATCH_PASSWORD_TO_STORE'
export const updateIsMatchPasswordToStore = createAction(UPDATE_IS_MATCH_PASSWORD_TO_STORE)
