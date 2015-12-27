/// <reference path='../../typings/react/react.d.ts'/>

import * as React from 'react';

import Rooms from './Rooms';

interface SideBarProps {
  roomActions: any;
};

class SideBar extends React.Component<SideBarProps, any> {

  render() {
    return (
      <div id="col-rooms">
        <Rooms actions={this.props.roomActions} />
        <div id="title">HipSlack</div>
      </div>
    );
  }
}

export default SideBar;
