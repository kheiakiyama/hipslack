/// <reference path='../../typings/react/react.d.ts'/>
/// <reference path='../../typings/redux/redux.d.ts'/>
/// <reference path='../../typings/react-redux/react-redux.d.ts'/>

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import SideBar from '../components/SideBar';
import * as RoomActions from '../actions/rooms';
import * as HipChatRoomActions from '../actions/hipchatRooms';

// It would be nice to specify an AppProps interface for this component, but it
// does not play nicely with the {() => <App/>} usage in main.
class App extends React.Component<any, any> {
  render() {
    const { rooms, openedRooms, dispatch } = this.props;
    const roomActions = bindActionCreators(RoomActions, dispatch);
    const hipchatRoomActions = bindActionCreators(HipChatRoomActions, dispatch);

    return (
      <SideBar rooms={rooms} openedRooms={openedRooms}
               roomActions={roomActions} hipChatRoomActions={hipchatRoomActions} />
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.rooms,
  openedRooms: state.openedRooms
});

export default connect(mapStateToProps)(App);
