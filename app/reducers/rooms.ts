/// <reference path='../../typings/lodash/lodash.d.ts'/>
/// <reference path='../../typings/redux-actions/redux-actions.d.ts'/>

import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import { Room } from '../models/rooms';
import {
  OPEN_ROOM,
  CLOSE_ROOM,
  NEW_ROOM,
} from '../constants/ActionTypes';

const initialState = [];

export default handleActions<Room[]>({
  [OPEN_ROOM]: (state: Room[], action: Action): Room[] => {
    let now = <Room[]>state.map(room => assign({}, room, { active: false }));
    if (now.some(room => room.id === action.payload.id)) {
      return <Room[]>now.map(room => 
        action.payload.id === room.id ? 
          assign({}, room, { active: true }) : 
          room
      );
    } else {
      return now.concat(<Room>{
        id: action.payload.id,
        name: action.payload.name,
        active: true,
      });
    }
  },
  
  [CLOSE_ROOM]: (state: Room[], action: Action): Room[] => {
    return <Room[]>state.filter(room => 
      action.payload.id !== room.id
    );
  },
    
  [NEW_ROOM]: (state: Room[], action: Action): Room[] => {
    return <Room[]>state.map(room => room);
  }
}, initialState);
