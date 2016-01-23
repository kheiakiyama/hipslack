/// <reference path='../../typings/redux-actions/redux-actions.d.ts'/>

import { createAction, Action } from 'redux-actions';

import { Room } from '../models/rooms';
import * as types from '../constants/ActionTypes';

const hipchatRooms = createAction<Room[]>(
  types.HIPCHAT_ROOMS,
  (rooms: Room[]) => rooms
);

export {
  hipchatRooms,
}
