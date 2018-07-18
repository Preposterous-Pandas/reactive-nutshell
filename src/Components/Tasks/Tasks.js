import React, { Component } from "react";
import NewTaskSection from "./NewTaskSection"
import TaskCard from "./TaskCard"
import apiManager from "../API/apiManager"

export default class Tasks extends Component {

  state = {
    allTasks: []
  }

  componentDidMount() {
    // This code will get the active user's id from session storage and then build out the list of tasks
    const currentUser = sessionStorage.getItem("activeUser");
    const tableToAccess = "tasks";
    const filteredTable = `${tableToAccess}?_&userId=${currentUser}`;
    apiManager.getField(filteredTable)
      .then(allUserTasks => {
        console.log("All user's tasks: ", allUserTasks);
        this.setState({ allTasks: allUserTasks });
        console.log("State: ", this.state);
      })
  }

  render() {
    return (
      <React.Fragment>
        <div className="tasks">
          <h4>Tasks</h4>
          <NewTaskSection />
          <article>
            {
              this.state.allTasks.map(singleTask => {
                return <TaskCard
                  key={singleTask.id.toString()}
                  task={singleTask} />
              })
            }
          </article>
        </div>
      </React.Fragment>
    );
  }
}
