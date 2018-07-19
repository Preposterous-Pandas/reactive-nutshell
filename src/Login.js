import React, { Component } from "react"
// import { Redirect } from "react-router-dom"
import apiController from "./Components/API/apiManager" //was api
import "./styles/login.css"

// const apiController = new api

export default class Login extends Component {
  // Set initial state
  state = {
    username: "",
    email: "",
    remember: false,
    redirect: false
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }
  setRemember = e => {
    // console.log(e.target.checked)
    switch (e.target.checked) {
      default:
        this.setState({ remember: false })
        break

      case true:
        this.setState({ remember: true })
        break

      case false:
        this.setState({ remember: false })
        break
    }
  }

  // Simplistic handler for login submit
  handleLogin = e => {
    e.preventDefault()
    apiController.getField(`users?name=${this.state.username}`).then(user => {
      // console.log(user)

      //Check whether or not user exists by checking the return from ajax call. If return is empty array, or if the username or email dont match throw error
      if (
        user.length === 0 ||
        (user[0].email !== this.state.email ||
          user[0].name !== this.state.username)
      ) {
        alert(
          "I'm sorry, that username or email is incorrect or non-existent. Please try again."
        )
        return
      } else if (
        user[0].email === this.state.email && user[0].name === this.state.username) {
        sessionStorage.setItem("activeUser", user[0].id)
        this.setStorageType()
        this.props.logUserIn()
      }
    })
  }

  registerUser(e){
      e.preventDefault()
      apiController.getField(`users?name=${this.state.username}`).then(nameResponse => {
          apiController.getField(`users?email=${this.state.email}`).then(emailResponse => {
                      //Check to see if username or email are already registered
                      if (nameResponse.length === 0 && emailResponse.length === 0) {
                          //if not, then register the user
                          apiController.postUser(this.state.username, this.state.email).then((response) => {
                            sessionStorage.setItem("activeUser", response.id)
                              this.setStorageType()
                              this.props.logUserIn()
                          })
                      }
                      else {
                          //if username or email are already registered, throw an error
                          alert("Sorry, that username or email is already registered")
                          return
                      }
                  })
              })
          }

setStorageType(){
    if (this.state.remember) {
        localStorage.setItem(
            "credentials",
            JSON.stringify({
                username: this.state.username,
                email: this.state.email
            })
        )
    } else {
        sessionStorage.setItem(
            "credentials",
            JSON.stringify({
                username: this.state.username,
                email: this.state.email
            })
        )
    }
}
  render() {
    // if (this.state.redirect) {
    //     return <Redirect to="/" />
    // } else {
    return (
      <div id="login-stuff">
      <form>
        <h1 className="main-headline">Welcome to Reactive Nutshell</h1>
        <h3 className="secondary-headline">Please Log In</h3>
        <label htmlFor="inputUname">Username</label>
        <input
          onChange={this.handleFieldChange}
          type="text"
          ref="usernameInput"
          id="username"
          placeholder="Username"
          required=""
          autoFocus=""
          className="login-input"
        />
        <label htmlFor="inputEmail">E-mail</label>
        <input
          onChange={this.handleFieldChange}
          type="email"
          ref="emailInput"
          id="email"
          placeholder="E-mail"
          required=""
          className="login-input"
        />
        <label htmlFor="rememberMe">Remember Me
          <input className="input-checkbox" type="checkbox" ref="rememberMe" onChange={this.setRemember} />
        </label>
        <button className="login-button" type="submit" onClick={this.handleLogin}>Sign in</button>
        <button className="login-button register" onClick={(e) => this.registerUser(e)}>Register</button>
      </form>
      </div>
    )
  }
}
// }
