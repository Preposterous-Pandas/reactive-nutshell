import React, { Component } from "react";
import NewEventButton from "./NewEventButton";

export default class EventList extends Component {
  render() {
    const sessionUser = sessionStorage.getItem("activeUser");
    return (
      <React.Fragment>
        <div className="events">
          <NewEventButton />
        </div>
      </React.Fragment>
    );
  }
}
