import React, { Component } from "react"
import apiManager from "../API/apiManager"


// This module renders the section of the Tasks pane used for adding new Tasks
export default class NewTaskSection extends Component {

  state = {
    // This property is used in the render function is to determine whether to show the Add Task button or the New Task form
    // It is toggled to 'true' by clicking the Add Task button and to 'false' by clicking the Save Task button on the form
    addingTask: false,

    // These two properties are updated by handleFieldChange() and used in addNewTask() as the properties that get passed to the POST
    newTaskName: "",
    newTaskDate: ""
  }

  // Updates state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  // Handles the submit event for the task form
  addNewTask = (evt) => {
    evt.preventDefault()

    const currentUserId = sessionStorage.getItem("activeUser");
    const taskName = this.state.newTaskName;
    const taskDate = this.state.newTaskDate;

    apiManager.postTask(currentUserId, taskName, taskDate)
      .then(
        this.props.updateTasks()
          .then(
            this.setState({ addingTask: false })
          )
      )

  }

  render() {

    // This conditional checks if you are adding a new task. If so, it prints the form to add the task; if not, it prints the button which, when clicked, will open the form by changing state
    if (this.state.addingTask) {
      return (
        <form onSubmit={this.addNewTask}>
          <section>
            <label htmlFor="newTaskName">Task name:</label>
            <input type="text" id="newTaskName"
              onChange={this.handleFieldChange}>
            </input>
          </section>

          <section>
            <label htmlFor="newTaskDate">Date due:</label>
            <input type="date" id="newTaskDate"
              onChange={this.handleFieldChange}>
            </input>
          </section>

          <section>
            <button type="submit">Save task</button>
          </section>
        </form>
      )
    } else {
      return (
        <button
          onClick={() => {
            this.setState({ addingTask: true })
          }}>New task</button>
      )
    }
  }
}
