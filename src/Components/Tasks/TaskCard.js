import React from "react"
import Moment from "react-moment"

export default props => {
  return (
    <section className="task__card">
      <h3>{props.currentTask.description}</h3>
      <p>Due: <Moment format="ddd, MMM Do, YYYY">
        {props.currentTask.date}
      </Moment></p>
      <label>Completed?</label>
      <input type="checkbox" />
    </section>
  )
}