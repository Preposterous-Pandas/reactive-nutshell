import React, { Component } from "react"
import Moment from "react-moment"
import apiManager from "../API/apiManager"

export default class TaskCard extends Component {

  state = {
    editingTask: false,
    taskName: ""
  }

  // This function gets the id of the box clicked, parses it into an integer, passes the integer into the completeTask method from the apiManager, and then loads all the tasks
  completeTask = (evt) => {
    const taskId = parseInt(evt.target.id);
    apiManager.completeTask(taskId)
      .then(this.props.loadTasks);
  }

  // This function gets the id of the edit
  editTask = (evt) => {
    evt.preventDefault();
    console.log("Edit clicked:");
    this.setState({ editingTask: true });
    const editId = parseInt(evt.target.id);
    console.log(editId);

  }

  saveTask = (evt) => {
    evt.preventDefault();
    console.log("Saving...");
    this.setState({ editingTask: false });
  }

  render() {
    if (this.state.editingTask) {
      return (
        <form onSubmit={this.saveTask}>
          <label>New task description:</label>
          <input type="text"
            id={`${this.props.currentTask.id}input`}
            defaultValue={this.props.currentTask.description} />
            <button type="submit">Save changes</button>
        </form>
      )
    } else {
      return (
        <section className="task__card">
          <h3>{this.props.currentTask.description}</h3>

          <a href=""
            id={`${this.props.currentTask.id}edit`}
            onClick={this.editTask}>(edit task description)</a>

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
}