/// <reference path='../../typings/react/react.d.ts'/>
/// <reference path='../../typings/react-modal/react-modal.d.ts'/>

import * as React from 'react';
import * as ReactModal from 'react-modal';

interface RoomsProps {
  actions: any;
  openedRooms: any;
};

interface RoomsStates {
  modalIsOpen: boolean;
}

class Rooms extends React.Component<RoomsProps, RoomsStates> {

  constructor(props?: RoomsProps, context?: any) {
    super(props, context);
    this.state = {
      modalIsOpen: false
    };
  }

  selectRoom(): void {
    this.setState({modalIsOpen: true});
  }

  closeModal(): void {
    this.setState({modalIsOpen: false});
  }

  handleNewRoom(): void {
    this.props.actions.newRoom();
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
        <ReactModal.Modal
            id="rooms-dialog"
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}>
            <h3>
                Select Room
                <button type="button" className="glyphicon glyphicon-remove close" ng-click="closeClick()"></button>
            </h3>
            <ul className="content">
                <li ng-repeat="room in rooms" className="room">
                    <div ng-click="roomClick(room)">room.name</div>
                </li>
            </ul>
        </ReactModal.Modal>
      </div>
    );
  }
}

export default Rooms;
