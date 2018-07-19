import React, { Component } from "react";
import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Message extends Component {
  state = {
    editMode: false
  };

  componentDidMount() {
    this.setState({
      editedMessage: this.props.message.message
    });
    localStorage.setItem("messageChange", 1);
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  render() {
    // Normal Display
    let classNamesForUser = "";
    if (this.props.message.user.id == this.props.currentUser) {
      classNamesForUser = "msgUser msgText me";
    } else {
      classNamesForUser = "msgUser msgText other";
    }

    if (!this.props.editMsgButtonDisplay) {
      // console.log("reg mode")
      return (
        <p id={this.props.message.id} className="msgItem">
          <span className={classNamesForUser}>
            {this.props.message.user.name}
          </span>
          <span className="msgSeperator msgText">:</span>
          <span className="msgContent msgText">
            {this.props.message.message}
          </span>
        </p>
      );
    }

    // Display Edit Options
    else if (this.props.editMsgButtonDisplay && !this.state.editMode) {
      if (this.props.message.user.id == this.props.currentUser) {
        return (
          <p id={this.props.message.id} className="msgItem">
            <button
              className="editMsgButton"
              onClick={() => {
                this.setState({
                  editMode: true
                });
              }}
            >
              <FontAwesomeIcon icon="edit" />
              Edit
            </button>
            <span className={classNamesForUser}>
              {this.props.message.user.name}
            </span>
            <span className="msgSeperator msgText">:</span>
            <span className="msgContent msgText">
              {this.props.message.message}
            </span>
          </p>
        );
      } else {
        return (
          <p id={this.props.message.id} className="msgItem">
            <button
              className="addFriendButton"
              onClick={() => {
                alert(`You added ${this.props.message.user.name} as a friend!`);
                this.props.beFriend(String(this.props.message.user.id));
              }}
            >
              <FontAwesomeIcon icon="user-plus" />
            </button>
            <span className={classNamesForUser}>
              {this.props.message.user.name}
            </span>
            <span className="msgSeperator msgText">:</span>
            <span className="msgContent msgText">
              {this.props.message.message}
            </span>
          </p>
        );
      }
    } else {
      return (
        <p id={this.props.message.id} className="msgItem">
          <button
            className="saveMsgEditsButton"
            onClick={() => {
              // console.log("clicked!")
              this.props.update(
                this.props.message.id,
                this.props.currentUser,
                this.state.editedMessage,
                this.props.message.timeStamp
              );
              this.setState({ editMode: false });
            }}
          >
            <FontAwesomeIcon icon="save" />
          </button>
          <button
            className="deleteMsgButton"
            onClick={() => {
              this.props.delete(this.props.message.id);
            }}
          >
            <FontAwesomeIcon icon="times-circle" />
          </button>
          <button
            className="cancelMsgEditButton"
            onClick={() => {
              this.setState({
                editMode: false
              });
            }}
          >
            <FontAwesomeIcon icon="ban" />
          </button>
          <span className="msgUser msgText me">
            {this.props.message.user.name}
          </span>
          <span className="msgSeperator msgText" />
          <input
            onFocus={e => e.target.select()}
            className="editMsgInput msgText"
            value={this.state.editedMessage}
            onChange={this.handleFieldChange}
            type="text"
            id="editedMessage"
            required=""
            autoFocus=""
          />
        </p>
      );
    }
  }
}
