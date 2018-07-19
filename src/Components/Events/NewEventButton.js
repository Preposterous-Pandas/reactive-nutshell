import React, { Component } from "react";
import formLogic from "./FormLogic";

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
              save
                .addEvent()
                .then(
                  this.setState({ viewForm: false }),
                  this.props.getEvents()
                );
              console.log(this.props);
            }}
          >
            Save
          </button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
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
