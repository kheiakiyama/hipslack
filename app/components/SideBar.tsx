/// <reference path='../../typings/react/react.d.ts'/>

import * as React from 'react';

import Rooms from './Rooms';

interface SideBarProps {
  roomActions: any;
  rooms: any;
};

class SideBar extends React.Component<SideBarProps, any> {

  render() {
    const { rooms, roomActions } = this.props;
    return (
      <div id="col-rooms">
        <Rooms openedRooms={rooms} actions={roomActions} />
        <div id="title">HipSlack</div>
      </div>
    );
  }
}

export default SideBar;
