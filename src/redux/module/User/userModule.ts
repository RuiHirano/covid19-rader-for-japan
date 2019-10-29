import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import {User, Content, Setting, BankAccount, Profile, Notification, Device, Plan, Language} from '../../../types/domainTypes'

const actionCreator = actionCreatorFactory();

export const initialState: User = {
    ID: 0,
    Profile: <Profile>{
        Name: "",
	    Age: "",
	    Sex: "",
	    Message: "",
	    Thumbnail: "",
    },
    Setting: <Setting>{
	    Email: "",
	    BankAccount: <BankAccount>{
            AccountNumber: "",
        },
        Language: Language.ja,
        Notification: <Notification>{
            Email: true,
            Push: true,
        },
        Content: <Content>{
            InitialInvestment: 0,
            AllowableLossRate: 0,
            BankruptcyReductionRate: 0,
	        Currencies: [],
            Stocks: [],
            SearchTags: [],
        },
        Plan: Plan.FREE,
        Device: Device.PC,
    },
}

export enum UserActions{
    UPDATE_USER_STORE = "UPDATE_USER_STORE",
}

export const userActions = {
    updateUserStore: actionCreator<User>(UserActions.UPDATE_USER_STORE),
};

export const userModule = reducerWithInitialState(initialState)
  .case(userActions.updateUserStore, (state, action) => {
    const User = action
        return {
            ...state,
            User: User
        }
  })
