//////// App ///////
export interface App {
	Loading: Loading,
	Error: Error,
	State: State,
}

export interface State {
	IsSignIn: boolean,
	SearchTags: string[],
	IsMatchPassword: boolean,
}

export interface Error {
	IsError: boolean,
	Status: string,
}

export interface Loading {
	IsLoading: boolean,
	LoadingState: LoadingState,
}

export enum LoadingState {
	NONE,
	UPDATE_EMAIL,
	UPDATE_PASSWORD,
	DELETE_ACCOUNT,
	UPDATE_PLAN,
	UPDATE_NOTIFICATION,
	UPDATE_CONTENT,
	UPDATE_LANGUAGE,
	UPDATE_PROFILE,
	SIGN_IN,
	SIGN_UP,
	SIGN_OUT,
	CREATE_ITEM,
	UPDATE_ITEM,
	DELETE_ITEM,
}

export interface Status{
	Progress: number,
	Log: string,
	Error: string,
	Loading: boolean
}