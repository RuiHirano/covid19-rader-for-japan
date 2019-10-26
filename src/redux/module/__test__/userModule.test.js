import reducer, { initialState, updateUserDataToStore, updateUserStatusToStore, updateIsMatchPasswordToStore } from './../userModule' // action

describe('reducer', () => {

  	it('initialState should be returned', () => {
    	expect(reducer(undefined, {})).toEqual(initialState);
  	});

	/*it('handle updateIsLoadingToStore', () => {
		const action = updateIsLoadingToStore({loadingStatus: "test", isLoading: true, error: false })
    	expect(reducer(initialState, action)).toEqual({
			loadingStatus: "test",
            isLoading: true,
            error: false,
            errorMessage: "",
		});
  	});*/
})