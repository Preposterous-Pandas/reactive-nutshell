import React, { Component } from "react"
import Moment from "react-moment"
import apiManager from "../API/apiManager"
import TaskForm from "./TaskForm"


export default class TaskCard extends Component {

  state = {
    editingTask: false,
  }

  // This function gets the id of the box clicked, parses it into an integer, passes the integer into the completeTask method from the apiManager, and then loads all the tasks
  completeTask = (evt) => {
    const taskId = parseInt(evt.target.id);
    apiManager.completeTask(taskId)
      .then(this.props.loadTasks);
  }

  hideEditTaskForm = () => {
    this.setState({ editingTask: false })
  }

  render() {
    if (this.state.editingTask) {
      return (
        <TaskForm
          currentTask={this.props.currentTask}
          today={this.props.today}
          hideForm={this.hideEditTaskForm}
          loadTasks={this.props.loadTasks}
        />
      )
    } else {
      return (
        <section className="task__card">

          <h3
            id={`${this.props.currentTask.id}edit`}
            onClick={() => { this.setState({ editingTask: true }) }}>
            {this.props.currentTask.description} (click to edit)
          </h3>

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