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

interface RoomsProps {
  actions: any;
  openedRooms: any;
};

interface RoomsStates {
  modalIsOpen: boolean;
  rooms: IRoom[];
}

class Rooms extends React.Component<RoomsProps, RoomsStates> {

  private hipchat = null;
  private rooms: IRoom[] = [];
  
  constructor(props?: RoomsProps, context?: any) {
    super(props, context);
    this.hipchat = HipchatFactory.GetClient();
    this.state = {
      modalIsOpen: false,
      rooms: this.rooms
    };
  }

  selectRoom(): void {
    this.hipchat.rooms((err, rooms) => {
      if(!err) {
        this.rooms = rooms;
        this.setState({
          modalIsOpen: true, 
          rooms: this.rooms
        });
      }
    });
    this.setState({
      modalIsOpen: true, 
      rooms: this.rooms
    });
  }

  closeModal(): void {
    this.setState({
      modalIsOpen: false,
      rooms: this.rooms
    });
  }

  handleNewRoom(): void {
    this.props.actions.newRoom();
  }
  
  openRoom(room: IRoom): void {
    console.log(room);
  }

  render() {
    const { openedRooms, actions } = this.props;
    return (
      <div id="rooms">
        <div onClick={this.selectRoom.bind(this)} className="title">Rooms</div>
        <div id="opened-rooms">
          <ul>
          {openedRooms.map(room =>
            <li className={room.active ? "active" : ""}>
              <div onClick={actions.openRoom(room)} className="item">
                <span className="name">{room.name}</span>
                <span onClick={actions.closeRoom(room)} className="glyphicon glyphicon-remove close"></span>
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
