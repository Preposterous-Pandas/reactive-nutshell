import React from "react"

export default props => {
  return (
    <section className="card--task">
      <h4>{props.task.description}</h4>
      <p>Due: {props.task.date}</p>
    </section>
  )
}