import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { App, Loading, Error, State, LoadingState } from '../../../types'

const actionCreator = actionCreatorFactory();


export const initialState: App = {
	Loading: <Loading>{
		IsLoading: false,
		LoadingState: LoadingState.NONE,
	},
	Error: <Error>{
		IsError: false,
		Status: ""
	},
	State: <State>{
		IsSignIn: false,
		SearchTags: [],
		IsMatchPassword: false,
	},
}

export enum AppActions {
	UPDATE_LOADING_STORE = "UPDATE_LOADING_STORE",
	UPDATE_ERROR_STORE = "UPDATE_ERROR_STORE",
	UPDATE_APP_STATE_STORE = "UPDATE_APP_STATE_STORE",
}

export const appActions = {
	updateLoadingStore: actionCreator<Loading>(AppActions.UPDATE_LOADING_STORE),
	updateErrorStore: actionCreator<Error>(AppActions.UPDATE_ERROR_STORE),
	updateAppStateStore: actionCreator<State>(AppActions.UPDATE_APP_STATE_STORE),
};

const appModule = reducerWithInitialState(initialState)
	.case(appActions.updateLoadingStore, (state, action) => {
		const Loading = action
		return {
			...state,
			Loading: Loading
		}
	})
	.case(appActions.updateErrorStore, (state, action) => {
		const Error = action
		return {
			...state,
			Error: Error
		}
	})
	.case(appActions.updateAppStateStore, (state, action) => {
		const State = action
		return {
			...state,
			State: State
		}
	})

export default appModule