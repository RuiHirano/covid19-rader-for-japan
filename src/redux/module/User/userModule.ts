import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { User } from '../../../types';

const actionCreator = actionCreatorFactory();

export const initialState = new User()

export enum UserActions {
	UPDATE_USER_STORE = "UPDATE_USER_STORE",
}

export const userActions = {
	updateUserStore: actionCreator<User>(UserActions.UPDATE_USER_STORE),
};

export const userModule = reducerWithInitialState(initialState)
	.case(userActions.updateUserStore, (state, action) => {
		const user: User = action
		return user
	})
