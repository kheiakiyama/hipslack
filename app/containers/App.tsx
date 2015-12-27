/// <reference path='../../typings/react/react.d.ts'/>
/// <reference path='../../typings/redux/redux.d.ts'/>
/// <reference path='../../typings/react-redux/react-redux.d.ts'/>

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import SideBar from '../components/SideBar';
import * as RoomActions from '../actions/rooms';

// It would be nice to specify an AppProps interface for this component, but it
// does not play nicely with the {() => <App/>} usage in main.
class App extends React.Component<any, any> {
  render() {
    const { rooms, dispatch } = this.props;
    const roomActions = bindActionCreators(RoomActions, dispatch);

    return (
      <div id="app">
        <SideBar rooms={rooms} roomActions={roomActions} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.rooms
});

export default connect(mapStateToProps)(App);
