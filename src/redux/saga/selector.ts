
import { ReduxState } from '../module'

export const getItems = (state: ReduxState) => state.Items
export const getUser = (state: ReduxState) => state.User
export const getApp = (state: ReduxState) => state.App
export const getAppState = (state: ReduxState) => state.App.State
export const getIsSignIn = (state: ReduxState) => state.App.Loading.IsLoading
