import React, { Component } from "react";
import NewTaskSection from "./NewTaskSection"

export default class Tasks extends Component {

  state = {
    allTasks: []
  }

  componentDidMount() {
    // This code will get the active user's id from session storage and then build out the list of tasks
  }

  render() {
    return (
      <React.Fragment>
        <div className="tasks">
          <h4>Tasks</h4>
          <NewTaskSection />
          {
            this.state.allTasks.forEach(singleTask => {
              // <TaskCard task={singleTask} />
              console.log("Building task card...", singleTask)
            })
          }
        </div>
      </React.Fragment>
    );
  }
}
