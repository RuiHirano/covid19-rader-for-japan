
import { AppState } from '../module/rootModule'

export const getItems = (state: AppState) => state.Items
export const getUser = (state: AppState) => state.User
export const getApp = (state: AppState) => state.App
export const getAppState = (state: AppState) => state.App.State
export const getIsSignIn = (state: AppState) => state.App.Loading.IsLoading
