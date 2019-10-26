import { combineReducers } from 'redux'
import itemModule from './itemModule'
import userModule from './userModule'
import appModule from './appModule'

const rootModule = combineReducers({
    itemModule,
    userModule,
    appModule,
})

export default rootModule
