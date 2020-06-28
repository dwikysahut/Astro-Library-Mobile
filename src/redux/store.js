import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import allReducers from './reducers/';
// import reducerGenre from "./reducers/reducerGenre";

const logger = createLogger();
const enhancer = applyMiddleware(promiseMiddleware, logger);

const store = createStore(allReducers, enhancer);

export default store;
