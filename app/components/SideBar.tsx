/// <reference path='../../typings/react/react.d.ts'/>

import * as React from 'react';

import Rooms from './Rooms';

interface SideBarProps {
  roomActions: any;
  hipChatRoomActions: any;
  rooms: any;
  openedRooms: any;
};

class SideBar extends React.Component<SideBarProps, any> {

  render() {
    const { rooms, openedRooms, roomActions, hipChatRoomActions } = this.props;
    return (
      <div id="col-rooms">
        <Rooms rooms={rooms} openedRooms={openedRooms} 
               actions={roomActions} hipchatActions={hipChatRoomActions} />
        <div id="title">HipSlack</div>
      </div>
    );
  }
}

export default SideBar;
