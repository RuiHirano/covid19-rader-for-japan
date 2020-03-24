import { combineReducers } from 'redux'
import patientModule from './patient'
import { Patient } from '../../types'

export interface ReduxState {
	Patients: Patient[]
}

const rootModule = combineReducers<ReduxState>({
	Patients: patientModule
})

export default rootModule
