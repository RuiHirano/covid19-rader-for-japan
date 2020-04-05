import { createStore, applyMiddleware } from 'redux'
import { getCombinedReducer } from 'harmoware-vis';
import rootModule from '../module'
import logger from 'redux-logger'

export default function configureStore() {

	const store = createStore(
		rootModule,
		applyMiddleware(logger),
	)
	return { store }
}