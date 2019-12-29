import { combineReducers } from 'redux'
import itemModule from './Item'
import userModule from './User'
import appModule from './App'
import { App, Item, User, Items } from '../../types'

export interface AppState {
	App: App,
	Items: Items,
	User: User
}

const rootModule = combineReducers<AppState>({
	Items: itemModule,
	User: userModule,
	App: appModule,
})

export default rootModule
