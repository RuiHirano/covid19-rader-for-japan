import { combineReducers } from 'redux'
import itemModule from './Item'
import userModule from './User'
import appModule from './App'

const rootModule = combineReducers({
    itemModule,
    userModule,
    appModule,
})

export default rootModule
