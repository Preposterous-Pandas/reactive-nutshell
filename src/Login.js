import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import api from "./Components/API/apiManager"

const apiController = new api

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

  //Find state of checkbox
  setRemember = e => {
    console.log(e.target.checked)
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


  //Handler for login
  handleLogin = e => {
    //prevent page from reloading because of <form> tag submit
    e.preventDefault()
    //Find user object by username from API
    apiController.getField(`users?name=${this.state.username}`).then(user => {
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
        //Set session storage ActiveUser to the user ID of who just logged in
          sessionStorage.setItem("activeUser", user[0].id)
        //Save credentials to either local or session storage depending on state of checkbox
          this.setStorageType()
          //Function to set state of Main page to flag as logged in
        this.props.logUserIn()
      }
    })
  }

  registerUser(e){
        //prevent page from reloading because of <form> tag submit
      e.preventDefault()
      //Query database for username and email to see if either already exists
      apiController.getField(`users?name=${this.state.username}`).then(nameResponse => {
          apiController.getField(`users?email=${this.state.email}`).then(emailResponse => {
                      //Check to see if username or email are already registered
                      if (nameResponse.length === 0 && emailResponse.length === 0) {
                          //if not, then register the user
                          apiController.postUser(this.state.username, this.state.email).then((response) => {
                              //Check where to store credentials depending on checkbox
                              this.setStorageType()
                              //set state to logged in on Main page
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
  //If box is checked, store credentials in local storage. Otherwise store in session storage
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
    return (
      <form>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputUname">Username</label>
        <input
          onChange={this.handleFieldChange}
          type="text"
          ref="usernameInput"
          id="username"
          placeholder="Username"
          required=""
          autoFocus=""
        />
        <label htmlFor="inputEmail">E-mail</label>
        <input
          onChange={this.handleFieldChange}
          type="email"
          ref="emailInput"
          id="email"
          placeholder="E-mail"
          required=""
        />
        <label htmlFor="rememberMe">Remember Me</label>
        <input type="checkbox" ref="rememberMe" onChange={this.setRemember} />
        <button type="submit" onClick={this.handleLogin}>Sign in</button>
        <button onClick={(e) => this.registerUser(e)}>Register</button>
      </form>
    )
  }
}
