import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import {Items} from '../../../types/domainTypes'

const actionCreator = actionCreatorFactory();

export const initialState: Items = {
    Items: [],
}

export enum ItemActions{
    UPDATE_ITEMS_STORE = "UPDATE_ITEMS_STORE",
}

export const itemActions = {
    updateItemsStore: actionCreator<Items>(ItemActions.UPDATE_ITEMS_STORE),
};

export const itemModule = reducerWithInitialState(initialState)
  .case(itemActions.updateItemsStore, (state, action) => {
    const items = action
        return {
            ...state,
            items: items,
        }
  })

