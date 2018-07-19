import React, { Component } from "react"
import Moment from "react-moment"
import apiManager from "../API/apiManager"

export default class TaskCard extends Component {

  completeTask = (evt) => {
    console.log("Box checked:");
    const completionStatus = (evt.target.checked);
    console.log(completionStatus);
    const taskId = parseInt(evt.target.id);
    console.log(taskId);
    apiManager.completeTask(taskId)
      .then(this.props.loadTasks);

  }

  render() {
    return (
      <section className="task__card">
        <h3>{this.props.currentTask.description}</h3>
        <p>Due: <Moment format="ddd, MMM Do, YYYY">
          {this.props.currentTask.date}
        </Moment></p>
        <label>Completed?</label>
        <input type="checkbox"
          id={`${this.props.currentTask.id}checkbox`}
          onChange={this.completeTask} />
      </section>
    )
  }
}