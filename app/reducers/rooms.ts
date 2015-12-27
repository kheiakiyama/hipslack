/// <reference path='../../typings/redux-actions/redux-actions.d.ts'/>

import { handleActions, Action } from 'redux-actions';

import { Room } from '../models/rooms';
import {
  OPEN_ROOM,
  CLOSE_ROOM,
} from '../constants/ActionTypes';

const initialState = [];

export default handleActions<Room[]>({
  [OPEN_ROOM]: (state: Room[], action: Action): Room[] => {
    return <Room[]>state.map(room => room);
  },
  
  [CLOSE_ROOM]: (state: Room[], action: Action): Room[] => {
    return <Room[]>state.map(room => room);
  }
}, initialState);
