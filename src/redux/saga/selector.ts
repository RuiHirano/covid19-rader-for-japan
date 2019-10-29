
import { Item, App, User, State } from './../../types'

export const getItems = (state: Item[]) => state
export const getUser = (state: User) => state
export const getApp = (state: App) => state
export const getAppState = (state: State) => state
export const getIsSignIn = (state: App) => state.Loading.IsLoading
