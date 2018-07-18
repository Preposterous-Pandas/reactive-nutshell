import React, { Component } from "react"


// This module renders the section of the Tasks pane used for adding new Tasks
export default class NewTaskSection extends Component {

  state = {
    addingTask: false
  }

  toggleState = () => {
    if (this.state.addingTask) {
      this.setState({ addingTask: false })
    } else {
      this.setState({ addingTask: true })
    }
  }

  render() {

    if (this.state.addingTask) {
      return (
        <div>
          <section>
            <label htmlFor="task-name">Task name:</label>
            <input type="text"></input>
          </section>

          <section>
            <label htmlFor="task-duedate">Date due:</label>
            <input type="date"></input>
          </section>

          <section>
            <button onClick={() => {
              this.setState({ addingTask: false })
            }}>Save task</button>
          </section>
        </div>
      )
    } else {
      return (
        <button onClick={() => {
          this.setState({ addingTask: true })
        }}>Go ahead; add another task</button>
      )
    }
  }
}
