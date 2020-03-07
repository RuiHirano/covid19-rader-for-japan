import { combineReducers } from 'redux'
import itemModule from './item'
import userModule from './user'
import appModule from './app'
import { App, Item, User } from '../../types'

export interface ReduxState {
	App: App,
	Items: Item[],
	User: User
}

const rootModule = combineReducers<ReduxState>({
	Items: itemModule,
	User: userModule,
	App: appModule,
})

export default rootModule
