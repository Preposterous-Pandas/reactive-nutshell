import React, { Component } from "react"
import messagesApi from "../API/apiManager"
import "./chat.css"
import Message from "./Message"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStroopwafel, faCoffee } from "@fortawesome/free-solid-svg-icons"

library.add(faStroopwafel, faCoffee)

export default class Chat extends Component {
  state = {
    currentUser: "",
    buildSource: "",
    newMessageInput: "",
    messages: [],
    editMsgButtonDisplay: false
  }

  read = buildSource => {
    messagesApi.getMessages().then(msgArr => {
      this.setState({
        messages: msgArr
      })
      this.setState({
        buildSource: buildSource
      })
    })
  }

  create = (userId, message) => {
    const curTimeStamp = new Date()
    messagesApi.postMessage(userId, message, curTimeStamp).then(() => {
      this.read("createNew")
    })
  }

  update = (msgId, userId, newMessage, messageTimeStamp) => {
    messagesApi
      .putMessage(msgId, userId, newMessage, messageTimeStamp)
      .then(() => {
        this.read()
      })
  }

  delete = msgId => {
    messagesApi.delMessage(msgId).then(this.read)
  }

  isAuthenticated = () => {
    return (
      sessionStorage.getItem("activeUser") ||
      localStorage.getItem("activeUser")
    )
  }

  componentDidMount = () => {
    const activeUser = this.isAuthenticated()
    if (activeUser) {
      this.setState({
        currentUser: activeUser
      })
      this.read()
    }
  }

  editModeEnable = () => {
    this.setState({ editMsgButtonDisplay: true})
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  render() {
    return <div className="chat" id="messagesDiv">
        <div id="messengerHeaderDiv">
          <h2 className="messengerHeader" />
        <button onClick={this.editModeEnable} id="msgOptionButton">Options</button>
          {/* <FontAwesomeIcon icon="faCoffee" /> */}
        </div>
        <div id="messengerBodyDiv">
          <div id="messengerBodyContent">
            {this.state.messages.map(message => (
              <Message
                key={message.id}
                message={message}
                create={this.create}
                read={this.read}
                update={this.update}
                delete={this.delete}
                currentUser={this.state.currentUser}
                editMsgButtonDisplay={this.state.editMsgButtonDisplay}
              />
            ))}
          </div>
        </div>
        <div id="messageNewDiv">
        <input onChange={(evt) => { this.handleFieldChange(evt) }} id="newMessageInput" />
          <button onClick={() => {this.create(this.state.currentUser, this.state.newMessageInput)}} id="newMessageSubmitButton">
            {/* <FontAwesomeIcon className="fa fa-paper-plane-o" /> */}
            Send
          </button>
        </div>
      </div>
  }
}
