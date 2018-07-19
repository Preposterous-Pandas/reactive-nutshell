import React, { Component } from "react";

export default class Events extends Component {
  state = {
    events: [],
    isFirst: false
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
        <div>
          {this.state.events.slice(0, 1).map(killme => {
            return (
              <div id={1}>
                <h5>{killme.name}</h5>
                <p>{killme.location}</p>
                <p>{killme.date}</p>
              </div>
            );
          })}
          {/* <div id={1}>
            <h5>{this.state.events[0].name}</h5>
            <p>{this.state.events[0].location}</p>
            <p>{this.state.events[0].date}</p>
          </div> */}
          {this.state.events.slice(1).map(eventref => {
            return (
              <div key={Math.floor(Math.random() * 101)}>
                <h5>{eventref.name}</h5>
                <p>{eventref.location}</p>
                <p>{eventref.date}</p>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
