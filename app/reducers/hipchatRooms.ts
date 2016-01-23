/// <reference path='../../typings/lodash/lodash.d.ts'/>
/// <reference path='../../typings/redux-actions/redux-actions.d.ts'/>

import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import { Room } from '../models/rooms';
import {
  HIPCHAT_ROOMS,
} from '../constants/ActionTypes';

const initialState = [];

export default handleActions<Room[]>({
  [HIPCHAT_ROOMS]: (state: Room[], action: Action): Room[] => {
    return <Room[]>state.concat(
      (<Room[]>action.payload).filter(room => 
        !state.some(target => target.id === room.id))
    );
  }
}, initialState);
