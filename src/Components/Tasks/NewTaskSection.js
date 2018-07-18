import React, { Component } from "react"


// This module renders the section of the Tasks pane used for adding new Tasks
export default class NewTaskSection extends Component {

  state = {
    addingTask: false,
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



    this.setState({ addingTask: false })
  }

  render() {

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
