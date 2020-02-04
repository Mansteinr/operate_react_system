
import todoSagas from './sagas'
import reducer from './reducer'
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux'

const logger = createLogger()

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
const enhancer = composeEnhancers(applyMiddleware(logger, sagaMiddleware))

const store = createStore(reducer, enhancer)
sagaMiddleware.run(todoSagas)

export default store
