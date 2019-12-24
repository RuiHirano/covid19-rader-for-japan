import { combineReducers } from 'redux'
import itemModule from './Item'
import userModule from './User'
import appModule from './App'
import { App, Item, User } from '../../types'
import { UserClass } from '../../types/user'
import { ItemClass } from '../../types/item'

export interface AppState {
	App: App,
	Items: ItemClass[],
	User: UserClass
}

const rootModule = combineReducers<AppState>({
	Items: itemModule,
	User: userModule,
	App: appModule,
})

export default rootModule
