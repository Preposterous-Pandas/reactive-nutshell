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
      return <div>NewTaskForm goes here</div>
    } else {
      return <button onClick={this.toggleState}>Go ahead; add another task</button>
    }
  }
}
