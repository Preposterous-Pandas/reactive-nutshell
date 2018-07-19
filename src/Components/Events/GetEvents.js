import React, { Component } from "react";
import apiManager from "./../API/apiManager";
export default class Events extends Component {
  state = {
    edit: false
  };

  render() {
    return (
      <React.Fragment>
        <div>
          {this.props.events.slice(0, 1).map(ev => {
            return (
              <div id={0} key={ev.id}>
                <h5>{ev.name}</h5>
                <p>{ev.location}</p>
                <p>{ev.date}</p>
              </div>
            );
          })}
          {this.props.events.slice(1).map(eventref => {
            return (
              <div key={eventref.id}>
                <h5>{eventref.name}</h5>
                <p>{eventref.location}</p>
                <p>{eventref.date}</p>
                <button onClick={() => {}}>Edit</button>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
