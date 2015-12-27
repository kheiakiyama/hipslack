/// <reference path='../../typings/redux-actions/redux-actions.d.ts'/>

import { createAction, Action } from 'redux-actions';

import { Room } from '../models/rooms';
import * as types from '../constants/ActionTypes';

const openRoom = createAction<Room>(
  types.OPEN_ROOM,
  (room: Room) => room
);

const closeRoom = createAction<Room>(
  types.CLOSE_ROOM,
  (room: Room) => room
);

export {
  openRoom,
  closeRoom
}
