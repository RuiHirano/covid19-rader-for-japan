import { all } from 'redux-saga/effects'
import signSaga from './signSaga'
import itemSaga from './itemSaga'
import userSaga from './userSaga'

export function* rootSaga(context) {
    yield all([signSaga(context), itemSaga(context), userSaga(context)])
}
