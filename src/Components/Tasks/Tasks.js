import React, { Component } from "react";

export default class Tasks extends Component {
  render() {
    const sessionUser = sessionStorage.getItem("activeUser");
    return (
      <React.Fragment>
        <div className="tasks" />
      </React.Fragment>
    );
  }
}
