import { createStore, applyMiddleware } from 'redux'
import rootModule from '../module'
import logger from 'redux-logger'

export default function configureStore() {

	const store = createStore(
		rootModule,
		applyMiddleware(logger)
	)
	return { store }
}