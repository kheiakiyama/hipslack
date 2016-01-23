/// <reference path='../../typings/react/react.d.ts'/>

declare var require: any;
declare var global: any;

import * as React from 'react';
var Modal = require('react-modal');
var remote = global.require('remote');
var HipchatFactory = remote.require('./lib/hipchat-factory');

interface IRoom {
  id: string;
  name: string;
}

interface IHipslackRoom extends IRoom {
  active: boolean;
}

interface RoomsProps {
  actions: any;
  hipchatActions: any;
  rooms: IRoom[];
  openedRooms: IHipslackRoom[];
};

interface RoomsStates {
  modalIsOpen: boolean;
}

class Rooms extends React.Component<RoomsProps, RoomsStates> {

  private hipchat = null;
  
  constructor(props?: RoomsProps, context?: any) {
    super(props, context);
    this.hipchat = HipchatFactory.GetClient();
    this.state = {
      modalIsOpen: false,
    };
  }

  selectRoom(): void {
    this.hipchat.rooms((err, rooms) => {
      if(!err) {
        this.props.hipchatActions.hipchatRooms(rooms);
      }
    });
    this._updateState(true);
  }

  closeModal(): void {
    this._updateState(false);
  }

  handleNewRoom(): void {
    this.props.actions.newRoom();
  }
  
  openRoom(room: IRoom): void {
    this.props.actions.openRoom(room);
    this._updateState(false);
  }
  
  _updateState(modalIsOpen: boolean): void {
    this.setState({
      modalIsOpen: modalIsOpen
    });
  }
  
  render() {
    const { actions, openedRooms, rooms } = this.props;
    return (
      <div id="rooms">
        <div onClick={this.selectRoom.bind(this)} className="title">Rooms</div>
        <div id="opened-rooms">
          <ul>
          {openedRooms.map(room =>
            <li key={room.id} className={room.active ? "active" : ""}>
              <div className="item">
                <span onClick={this.openRoom.bind(this, room)} className="name">{room.name}</span>
                <span onClick={actions.closeRoom.bind(this, room)} className="glyphicon glyphicon-remove close"></span>
              </div>
            </li>
          )}
          </ul>
        </div>
        <Modal            
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal.bind(this)}>
          <div id="rooms-dialog">
            <h3 className="title">
              Select Room
              <button type="button" className="glyphicon glyphicon-remove close" onClick={this.closeModal.bind(this)}></button>
            </h3>
            <ul className="content">
            {rooms.map(room =>
              <li key={room.id} className="room">
                <div onClick={this.openRoom.bind(this, room)}>{room.name}</div>
              </li>
            )}
            </ul>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Rooms;
