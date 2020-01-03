import { combineReducers } from 'redux'
import itemModule from './item'
import userModule from './user'
import appModule from './app'
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
