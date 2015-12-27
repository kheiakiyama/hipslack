/// <reference path='../../typings/redux/redux.d.ts'/>

import { combineReducers } from 'redux';

import rooms from './rooms';

const rootReducer = combineReducers({
  rooms: rooms
});

export { rootReducer };
