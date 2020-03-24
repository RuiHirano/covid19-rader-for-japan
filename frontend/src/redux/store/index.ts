import { createStore, applyMiddleware } from 'redux'
import rootModule from '../module'
import logger from 'redux-logger'
import {
	persistReducer,
	persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export default function configureStore() {

	// 永続化の設定
	const persistConfig = {
		key: 'root2', // Storageに保存されるキー名を指定する
		storage, // 保存先としてlocalStorageがここで設定される
		transforms: [],
		//whitelist: ['userStatus'] // Stateは`todos`のみStorageに保存する
		// blacklist: ['visibilityFilter'] // `visibilityFilter`は保存しない
	}

	const persistedReducer = persistReducer(persistConfig, rootModule)

	const store = createStore(
		persistedReducer,
		applyMiddleware(logger)
	)

	const persistor = persistStore(store)
	//persistor.purge()
	return { store, persistor }
}