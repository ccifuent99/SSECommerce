import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import users from './users';
import plants from './plants';
import orders from './orders';
import lineitems from './lineitems';
import onlineUsers from './onlineUsers';

const reducer = combineReducers({
	auth,
	cart,
	plants,
	users,
	orders,
	lineitems,
	onlineUsers,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './cart';
export * from './plants';
export * from './users';
export * from './orders';
export * from './lineitems';
export * from './onlineUsers';
