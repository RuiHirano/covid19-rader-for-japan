import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { Data } from '../../../types';

const actionCreator = actionCreatorFactory();

export const initialState: Data = {
	PatientsData: [],
	PrefsData: [],
	StatsData: [],
}

export enum DataActions {
	UPDATE_PATIENT_INFO = "UPDATE_PATIENT_INFO",
}

export const dataActions = {
	updateData: actionCreator<Data>(DataActions.UPDATE_PATIENT_INFO),
};

const dataModule = reducerWithInitialState(initialState)
	.case(dataActions.updateData, (preData, data) => {
		return data
	})

export default dataModule