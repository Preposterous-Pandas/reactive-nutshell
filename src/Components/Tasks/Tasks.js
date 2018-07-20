import React, { Component } from "react";
import NewTaskSection from "./NewTaskSection";
import TaskCard from "./TaskCard";
import apiManager from "../API/apiManager";
import moment from "moment";


export default class Tasks extends Component {
  state = {
    today: moment().format("YYYY-MM-DD"),
    allTasks: []
  };

  // This code will get the active user's id from session storage and then build out the list of tasks
  // It runs after componentDidMount and is passed to the NewTaskSection to run after a new task is saved
  loadTasks = () => {
    // console.log("loading tasks...");
    const currentUser = sessionStorage.getItem("activeUser");
    const tableToAccess = "tasks";
    const notCompleted = "completed=false";
    const sortedByDate = "_sort=date&_order=asc";
    const notPast = `date_gte=${this.state.today}`;
    const filteredTable = `${tableToAccess}?_&userId=${currentUser}&${notCompleted}&${sortedByDate}&${notPast}`;
    apiManager.getField(filteredTable)
      .then(allUserTasks => {
        // console.log("All user's tasks: ", allUserTasks);
        this.setState({ allTasks: allUserTasks });
      });
  }

  componentDidMount() {
    this.loadTasks();
  }

  render() {
    return (
      <div className="tasks">
        <h4 className="section-headline">Tasks</h4>

        <NewTaskSection
          today={this.state.today}
          loadTasks={() => { this.loadTasks(); }} />

        <article id="task__list">
          {this.state.allTasks.map(singleTask => {
            return (
              <TaskCard
                key={singleTask.id.toString()}
                today={this.state.today}
                currentTask={singleTask}
                loadTasks={() => {
                  this.loadTasks();
                }}
              />
            );
          })}
        </article>
      </div>
    );
  }
}
