import { combineReducers } from 'redux'
import itemModule from './item'
import userModule from './user'
import { Item, User, } from '../../types'

export interface ReduxState {
	Items: Item[],
	User: User
}

const rootModule = combineReducers<ReduxState>({
	Items: itemModule,
	User: userModule,
})

export default rootModule
