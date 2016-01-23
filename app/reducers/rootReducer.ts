/// <reference path='../../typings/redux/redux.d.ts'/>

import { combineReducers } from 'redux';

import rooms from './rooms';
import hipchatRooms from './hipchatRooms';

const rootReducer = combineReducers({
  openedRooms: rooms,
  rooms: hipchatRooms
});

export { rootReducer };
