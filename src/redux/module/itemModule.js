import { handleActions, createAction } from 'redux-actions'

const initialState = {
    items: [],
    passData: {},
    searchTags: [],
}

export default handleActions(
    {
        UPDATE_PASS_DATA_TO_STORE: (state, action) => {
            const payload = action.payload

            return {
                ...state,
                passData: payload.passData,
            }
        },

        UPDATE_ITEMS_TO_STORE: (state, action) => {
            const payload = action.payload
            return {
                ...state,
                items: payload.items,
            }
        },

        UPDATE_SEARCH_TAGS_TO_STORE: (state, action) => {
            const {searchTags} = action.payload
            return {
                ...state,
                searchTags: searchTags,
            }
        },
    },
    initialState
)

export const UPDATE_ITEMS_TO_STORE = 'UPDATE_ITEMS_TO_STORE'
export const updateItemsToStore = createAction(UPDATE_ITEMS_TO_STORE)

export const UPDATE_PASS_DATA_TO_STORE = 'UPDATE_PASS_DATA_TO_STORE'
export const updatePassDataToStore = createAction(UPDATE_PASS_DATA_TO_STORE)

export const UPDATE_SEARCH_TAGS_TO_STORE = 'UPDATE_SEARCH_TAGS_TO_STORE'
export const updateSearchTagsToStore = createAction(UPDATE_SEARCH_TAGS_TO_STORE)