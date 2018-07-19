import React, { Component } from "react";
import NewEventButton from "./NewEventButton";
import GetEvents from "./GetEvents";

export default class EventList extends Component {
  state = {
    events: []
  };

  getEvents = () => {
    return fetch(
      // ?userId=${currentUser}&${friendString}_sort=date&_order=asc`
      `http://localhost:5002/events/?userId=${sessionStorage.getItem(
        "activeUser"
      )}&_sort=date&_order=asc`
    ).then(e => e.json());
  };

  componentDidMount() {
    this.getEvents().then(events => this.setState({ events: events }));
  }

  render() {
    return (
      <React.Fragment>
        <div className="events">
          <NewEventButton />
          <GetEvents events={this.state.events} />
        </div>
      </React.Fragment>
    );
  }
}
