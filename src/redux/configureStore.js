import { createStore, applyMiddleware } from 'redux'
import rootModule from './module/rootModule'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './saga/rootSaga'
import {
    persistReducer,
    persistStore,
    createTransform,
    AsyncStorage,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export default function configureStore() {
    const dateTransform = createTransform(null, outboundState => {
        if (outboundState.items !== undefined) {
            var items = []
            outboundState.items.map(item => {
                item.startDate = new Date(item.startDate)
                item.endDate = new Date(item.endDate)
                items.push(item)
            })
            return { ...outboundState, items: items }
        } else {
            return outboundState
        }
    })

    // 永続化の設定
    const persistConfig = {
        key: 'root', // Storageに保存されるキー名を指定する
        storage, // 保存先としてlocalStorageがここで設定される
        transforms: [dateTransform],
        //whitelist: ['userStatus'] // Stateは`todos`のみStorageに保存する
        // blacklist: ['visibilityFilter'] // `visibilityFilter`は保存しない
    }

    const sagaMiddleware = createSagaMiddleware()
    const persistedReducer = persistReducer(persistConfig, rootModule)

    const store = createStore(
        persistedReducer,
        applyMiddleware(sagaMiddleware, logger)
    )

    sagaMiddleware.run(rootSaga)

    const persistor = persistStore(store)
    //persistor.purge()
    return { store, persistor }
}
