import { handleActions , createAction} from 'redux-actions'

export const initialState = {
    loadingStatus: '',
    isLoading: false,
    error: false,
    errorMessage: '',
}

export default handleActions(
    {
        // Update isLoading
        UPDATE_IS_LOADING_TO_STORE: (state, action) => {
            const { payload, error, meta } = action

            if (error) {
                return {
                    loadingStatus: payload.loadingStatus,
                    isLoading: payload.isLoading,
                    error: error,
                    errorMessage: meta,
                }
            } else {
                return {
                    loadingStatus: payload.loadingStatus,
                    isLoading: payload.isLoading,
                    error: error,
                    errorMessage: '',
                }
            }
        },
    },
    initialState
)

// UPDATE_IS_LOADING
export const UPDATE_IS_LOADING_TO_STORE = 'UPDATE_IS_LOADING_TO_STORE'
export const updateIsLoadingToStore = createAction(UPDATE_IS_LOADING_TO_STORE)
