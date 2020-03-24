import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { Patient } from '../../../types';

const actionCreator = actionCreatorFactory();

export const initialState: Patient[] = []

export enum PatientActions {
	UPDATE_PATIENT_INFO = "UPDATE_PATIENT_INFO",
}

export const patientActions = {
	updatePatientInfo: actionCreator<Patient[]>(PatientActions.UPDATE_PATIENT_INFO),
};

const patientModule = reducerWithInitialState(initialState)
	.case(patientActions.updatePatientInfo, (prePatients, patients) => {
		return patients
	})

export default patientModule