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
  openedRooms: IHipslackRoom[];
};

interface RoomsStates {
  modalIsOpen: boolean;
  rooms: IRoom[];
  openedRooms: IHipslackRoom[];
}

class Rooms extends React.Component<RoomsProps, RoomsStates> {

  private hipchat = null;
  private rooms: IRoom[] = [];
  private openedRooms: IHipslackRoom[] = [];
  
  constructor(props?: RoomsProps, context?: any) {
    super(props, context);
    this.hipchat = HipchatFactory.GetClient();
    this.state = {
      modalIsOpen: false,
      rooms: this.rooms,
      openedRooms: this.openedRooms
    };
  }

  selectRoom(): void {
    this.hipchat.rooms((err, rooms) => {
      if(!err) {
        this.rooms = rooms;
        this._updateState(true);
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
    this.openedRooms.forEach(function(item) {
      item.active = false;
    });
    let index = this._indexOf(room);
    if (index === -1) {
      this.openedRooms.push({
        id: room.id,
        name: room.name,
        active: true
      });
    } else {
      this.openedRooms[index].active = true;
    }
    this._updateState(false);
  }
  
  _updateState(modalIsOpen: boolean): void {
    this.setState({
      modalIsOpen: modalIsOpen,
      rooms: this.rooms,
      openedRooms: this.openedRooms
    });
  }
  
  _indexOf(room: IRoom): number {
    let res = -1;
    this.openedRooms.forEach((item, index) => {
      if (item.id === room.id) {
        res = index;
      }
    });
    return res;
  }

  render() {
    const { actions } = this.props;
    const { openedRooms } = this.state;
    return (
      <div id="rooms">
        <div onClick={this.selectRoom.bind(this)} className="title">Rooms</div>
        <div id="opened-rooms">
          <ul>
          {openedRooms.map(room =>
            <li key={room.id} className={room.active ? "active" : ""}>
              <div onClick={actions.openRoom.bind(this, room)} className="item">
                <span className="name">{room.name}</span>
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
            {this.rooms.map(room =>
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
