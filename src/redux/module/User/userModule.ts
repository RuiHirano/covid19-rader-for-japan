import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { User, Content, Setting, BankAccount, Profile, Notification, Device, Plan, Language } from '../../../types/types'
import { UserClass } from '../../../types/user';

const actionCreator = actionCreatorFactory();

export const initialState = new UserClass()

export enum UserActions {
	UPDATE_USER_STORE = "UPDATE_USER_STORE",
}

export const userActions = {
	updateUserStore: actionCreator<UserClass>(UserActions.UPDATE_USER_STORE),
};

export const userModule = reducerWithInitialState(initialState)
	.case(userActions.updateUserStore, (state, action) => {
		const user = action
		return user
	})
