import { combineReducers, CombinedState } from 'redux'
import { Data } from '../../types'
import dataModule from './data'
import { getCombinedReducer, BasedState } from 'harmoware-vis';

export interface ReduxState {
	Data: Data
}

const rootModule = getCombinedReducer({ Data: dataModule })

export default rootModule
