import React, { Component } from "react";
import APIManager from "../API/apiManager";
import "./chat.css";
import Message from "./Message";

const messagesApi = new APIManager();

export default class Chat extends Component {
  state = {
    currentUser: "",
    buildSource: "",
    newMessageInput: "",
    messages: [],
    editMsgButtonDisplay: false
  };

  read = buildSource => {
    messagesApi.getMessages().then(msgArr => {
      this.setState({
        messages: msgArr
      });
      this.setState({
        buildSource: buildSource
      });
    });
  };

  create = (userId, message) => {
    const curTimeStamp = new Date();
    messagesApi.postMessage(userId, message, curTimeStamp).then(() => {
      this.read("createNew");
    });
  };

  update = (msgId, userId, newMessage, messageTimeStamp) => {
    messagesApi
      .putMessage(msgId, userId, newMessage, messageTimeStamp)
      .then(() => {
        this.read();
      });
  };

  delete = msgId => {
    messagesApi.delMessage(msgId).then(this.read);
  };

  isAuthenticated = () => {
    return (
      sessionStorage.getItem("credentials") ||
      localStorage.getItem("credentials")
    );
  };

  componentDidMount() {
    const currentUser = this.isAuthenticated();
    if (currentUser) {
      this.setState({
        currentUser: currentUser
      });
      this.read();
    }
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  render() {
    return (
      <div className="chat" id="messagesDiv">
        <div id="messengerHeaderDiv">
          <h2 className="messengerHeader" />
          <button id="msgOptionButton">
            <i className="fa fa-cogs" />
          </button>
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
                currentUser={this.currentUser}
                editMsgButtonDisplay={this.editMsgButtonDisplay}
              />
            ))}
          </div>
        </div>
        <div id="messageNewDiv">
          <input id="newMessageInput" />
          <button id="newMessageSubmitButton">
            <i className="fa fa-paper-plane-o" />
          </button>
        </div>
      </div>
    );
  }
}
