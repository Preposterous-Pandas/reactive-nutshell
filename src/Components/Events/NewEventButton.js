import React, { Component } from "react";
import formLogic from "./FormLogic";
import GetEvents from "./GetEvents";

export default class NewEventButton extends Component {
  state = {
    viewForm: false
  };
  render() {
    const save = new formLogic();
    if (this.state.viewForm) {
      return (
        <React.Fragment>
          <input id="eventName" type="text" />
          <br />
          <input id="eventLocation" type="text" />
          <br />
          <input id="eventDate" type="date" />
          <br />
          <button
            onClick={() => {
              save.addEvent();
              this.setState({ viewForm: false });
            }}
          >
            Save
          </button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <GetEvents />
          <button
            onClick={() => {
              this.setState({ viewForm: true });
            }}
          >
            New Event
          </button>
        </React.Fragment>
      );
    }
  }
}
