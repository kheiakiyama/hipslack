/// <reference path='../../typings/react/react.d.ts'/>

import * as React from 'react';

interface RoomsProps {
  actions: any;
  openedRooms: any;
};

class Rooms extends React.Component<RoomsProps, any> {

  handleNewRoom(): void {
    this.props.actions.newRoom();
  }

  render() {
    const { openedRooms, actions } = this.props;
    return (
      <div id="rooms">
        <div onClick={this.handleNewRoom.bind(this)} className="title">Rooms</div>
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
      </div>
    );
  }
}

export default Rooms;
