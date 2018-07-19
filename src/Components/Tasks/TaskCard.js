import React from "react"

export default props => {
  return (
    <section className="task__card">
      <h4>{props.currentTask.description}</h4>
      <p>Due: {props.currentTask.date}</p>
    </section>
  )
}