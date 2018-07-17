import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import apiController from "./Components/API/apiManager"

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

    // Simplistic handler for login submit
    handleLogin = e => {
        e.preventDefault()
        apiController.getField(`users?name=${this.state.username}`).then(user => {
                    console.log(user)

                    //Check whether or not user exists by checking the return from ajax call. If return is empty array, or if the username or email dont match throw error
                    if (user.length === 0 || (user[0].email !== this.state.email || user[0].name !== this.state.username)) {
                        alert("I'm sorry, that username or email is incorrect or non-existent. Please try again.")
                        return
                    }
                    else if (user[0].email === this.state.email && user[0].name === this.state.username){
                        this.props.logUserIn()
                        // this.setState({redirect: true})
                    }
                })
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
        this.setState({ redirect: true })
    }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect to="/" />
        // } else {
            return (
                <form onSubmit={this.handleLogin}>
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
                    <button type="submit">Sign in</button>
                </form>
            )
        }
    }
// }
