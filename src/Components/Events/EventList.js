import React, { Component } from "react";
import NewEventButton from "./NewEventButton";
import Event from "./Event";

export default class EventList extends Component {
  state = {
    events: []
  };

  getEvents = () => {
    console.log("hello");
    return fetch(
      // ?userId=${currentUser}&${friendString}_sort=date&_order=asc`
      `http://localhost:5002/events/?userId=${sessionStorage.getItem(
        "activeUser"
      )}&_sort=date&_order=asc`
    )
      .then(e => e.json())
      .then(events => this.setState({ events: events }));
  };

  componentDidMount() {
    this.getEvents();
  }

  render() {
    return (
      <React.Fragment>
        <div className="events">
          <NewEventButton
            getEvents={() => {
              this.getEvents();
            }}
          />
          {this.state.events.map(event => {
            return (
              <Event
                key={event.id}
                event={event}
                getEvents={() => {
                  this.getEvents().then(events =>
                    this.setState({ events: events })
                  );
                }}
              />
            );
          })}
          <h3 className="section-headline">Events</h3>
        </div>
      </React.Fragment>
    );
  }
}
