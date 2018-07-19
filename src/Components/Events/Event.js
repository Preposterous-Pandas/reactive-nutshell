import React, { Component } from "react";
import "./firstEvent.css";
import apiManager from "./../API/apiManager";
export default class Events extends Component {
  state = {
    edit: false,
    eventId: 0,
    eventName: "",
    eventLocation: "",
    eventDate: ""
  };

  editEvent = e => {
    e.preventDefault();
    const editId = parseInt(e.target.id);
    this.setState({});
    this.setState({});
    this.setState({
      edit: true,
      eventId: editId,
      eventName: this.props.event.name,
      eventLocation: this.props.event.location,
      eventDate: this.props.event.date
    });
  };

  handleFieldChange = e => {
    const stateToChange = {};
    stateToChange[e.target.id] = e.target.value;
    this.setState(stateToChange);
  };

  saveEvent = e => {
    e.preventDefault();
    console.log("Saving...");
    const currentUser = sessionStorage.getItem("activeUser");
    const eventId = this.state.eventId;
    const newName = this.state.eventName;
    const newLocation = this.state.eventLocation;
    const newDate = this.state.eventDate;
    apiManager
      .putEvent(currentUser, newName, newLocation, newDate, eventId)
      .then(this.props.loadEvent, this.setState({ edit: false }));
  };

  render() {
    if (this.state.edit) {
      return (
        <form onSubmit={this.saveEvent} id={this.props.event.id}>
          <input
            type="text"
            onChange={this.handleFieldChange}
            defaultValue={this.props.event.name}
            id="eventName"
          />
          <input
            type="text"
            onChange={this.handleFieldChange}
            defaultValue={this.props.event.location}
            id="eventLocation"
          />
          <input
            type="date"
            onChange={this.handleFieldChange}
            defaultValue={this.props.event.date}
            id="eventDate"
          />
          <button type="submit" id={this.props.event.id}>
            Save
          </button>
        </form>
      );
    } else {
      return (
        <React.Fragment>
          <div key={this.props.event.id}>
            <h5>{this.props.event.name}</h5>
            <p>{this.props.event.location}</p>
            <p>{this.props.event.date}</p>
          </div>
          <button id={this.props.event.id} onClick={this.editEvent}>
            Edit
          </button>
        </React.Fragment>
      );
    }
  }
}
