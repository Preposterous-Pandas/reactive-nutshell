import React, { Component } from "react"
import Moment from "react-moment"
import apiManager from "../API/apiManager"

export default class TaskCard extends Component {

  state = {
    editingTask: false,
    taskToEdit: 0,
    editedTaskName: ""
  }

  // This function gets the id of the box clicked, parses it into an integer, passes the integer into the completeTask method from the apiManager, and then loads all the tasks
  completeTask = (evt) => {
    const taskId = parseInt(evt.target.id);
    apiManager.completeTask(taskId)
      .then(this.props.loadTasks);
  }

  // This function updates state to load the edit form and get the id of the task being edited
  editTask = (evt) => {
    evt.preventDefault();
    const editId = parseInt(evt.target.id);
    this.setState({ editingTask: true });
    this.setState({ taskToEdit: editId })
  }

  // This function keeps track of all the changes to the input field and stores them in state
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  // This function takes the new task description and the task's id out of state, passes them to the apiManager, and then reloads all the tasks
  saveTask = (evt) => {
    evt.preventDefault();
    console.log("Saving...");
    const taskId = this.state.taskToEdit;
    const newDescription = this.state.editedTaskName;
    apiManager.editTask(taskId, newDescription)
      .then(this.props.loadTasks, this.setState({ editingTask: false })
      )
  }

  render() {
    if (this.state.editingTask) {
      return (
        <form onSubmit={this.saveTask} id={`${this.props.currentTask.id}form`}>
          <label>Edit task description:</label>
          <input type="text" id="editedTaskName"
            onChange={this.handleFieldChange}
            defaultValue={this.props.currentTask.description} />
          <button type="submit">Save changes</button>
          <button onClick={() => {
              this.setState({ editingTask: false })
            }}>Cancel</button>
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