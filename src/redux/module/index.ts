import { combineReducers } from 'redux'
import itemModule from './item'
import userModule from './user'
import statsModule from './statistics'
import { App, Item, User, Statistics, StatsResult } from '../../types'

export interface ReduxState {
	Statistics: StatsResult,
	Items: Item[],
	User: User
}

const rootModule = combineReducers<ReduxState>({
	Statistics: statsModule,
	Items: itemModule,
	User: userModule,
})

export default rootModule
