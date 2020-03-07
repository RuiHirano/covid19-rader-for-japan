import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { User } from '../../../types';

const actionCreator = actionCreatorFactory();

export const initialState = new User()

export enum UserActions {
	UPDATE_USER_INFO = "UPDATE_USER_INFO",
}

export const userActions = {
	updateUserInfo: actionCreator<User>(UserActions.UPDATE_USER_INFO),
};

const userModule = reducerWithInitialState(initialState)
	.case(userActions.updateUserInfo, (preUser, user) => {
		return user
	})

export default userModule