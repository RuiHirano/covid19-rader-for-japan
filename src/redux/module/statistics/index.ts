import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { Item, StatsResult, Statistics, Graphs } from '../../../types';

const actionCreator = actionCreatorFactory();

export const initialState: StatsResult = {
	Statistics: new Statistics(),
	Graphs: new Graphs()
}

export enum StatsActions {
	UPDATE_STATISTICS = "UPDATE_STATISTICS",
}

export const statsActions = {
	updateStatistics: actionCreator<StatsResult>(StatsActions.UPDATE_STATISTICS),
};

const statsModule = reducerWithInitialState(initialState)
	.case(statsActions.updateStatistics, (state, action) => {
		const statsResult: StatsResult = action
		return statsResult
	})


export default statsModule