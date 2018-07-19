import React, { Component } from "react"
import messagesApi from "../API/apiManager"
import "./chat.css"
import Message from "./Message"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default class Chat extends Component {
  state = {
    currentUser: "",
    buildSource: "",
    newMessageInput: "",
    messages: [],
    editMsgButtonDisplay: false,
    scrolltopValue: 0
  }

  read = buildSource => {
    messagesApi.getMessages().then(msgArr => {
      this.setState({
        messages: msgArr
      })
      this.setState({
        buildSource: buildSource
      })
      console.log(this.refs.messengerBody.scrollTop)
      this.refs.chatBottom.scrollIntoView({ behavior: "smooth" })
    })
  }

  create = (e, userId, message) => {
    e.preventDefault()
    const curTimeStamp = new Date()
    messagesApi.postMessage(userId, message, curTimeStamp).then(() => {
      this.read("createNew")
    })
    this.refs.newMessageInput.value = ""
  }

  update = (msgId, userId, newMessage, messageTimeStamp) => {
    console.log("updating")
    messagesApi.putMessage(msgId, userId, newMessage, messageTimeStamp)
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
    switch (this.state.editMsgButtonDisplay){
        case true:
          this.setState({ editMsgButtonDisplay: false})
          break
        case false:
          this.setState({ editMsgButtonDisplay: true})
          break
      }
    }

  handleFieldChange = evt => {
    this.setState({ editMsgButtonDisplay: false})
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  render() {
    return <div className="chat" id="messagesDiv">
        <div id="messengerHeaderDiv">
          <h2 className="messengerHeader" />
        <button onClick={this.editModeEnable} id="msgOptionButton">
          <FontAwesomeIcon icon="cog" id="awesome-cog"/>
        </button>
        </div>
        <div id="messengerBodyDiv">
          <div id="messengerBodyContent" ref="messengerBody">
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
                beFriend={this.props.beFriend}
              />
            ))}
            <div ref="chatBottom"></div>
          </div>
        </div>
        <div id="messageNewDiv">
        <form onSubmit={(e) => { this.create(e, this.state.currentUser, this.state.newMessageInput) }}>
        <input onChange={(evt) => { this.handleFieldChange(evt) }} id="newMessageInput" ref="newMessageInput"/>
          <button onClick={(e) => {this.create(e, this.state.currentUser, this.state.newMessageInput)}} id="newMessageSubmitButton">
            <FontAwesomeIcon icon="envelope" id="awesome-envelope"/>
          </button>
          </form>
        </div>
      </div>
  }
}
