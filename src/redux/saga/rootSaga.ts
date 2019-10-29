import { all } from 'redux-saga/effects'
import signSaga from './Sign'
import itemSaga from './Item'
import userSaga from './User'

export default function* rootSaga() {
    yield all([signSaga(), itemSaga(), userSaga()])
}
