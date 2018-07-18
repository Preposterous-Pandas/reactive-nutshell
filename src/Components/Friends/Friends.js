// import React, { Component } from 'react'

// export default class Friends extends Component {
//     render(){
//         return (
//             <React.Fragment>
//                 <div className="friends">
//                     <h4>Friends</h4>
//                 </div>
//             </React.Fragment>
//         )
//     }
// }

import React, { Component } from "react";
import APIManager from "../API/apiManager";
import "./chat.css";
import Message from "./Message";

const messagesApi = new APIManager();

export default class Friend extends Component {
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

//Friends functionality. This module is used to add friends and make dom components having to do with displaying and adding friends.
//Seth Dana seth.dana@gmail.com

const $ = require("jquery");
const apiController = require("./apiController");
const createObject = require("./objectConstructors");

//Get current active user ID from session storage
// const currentUser = sessionStorage.getItem("activeUser")

//capture DIV from DOM to append stuff to

const friendActions = Object.create(
  {},
  {
    displayFriendList: {
      value: function() {
        const addFriendBtn = $(
          "<button id='add-friend-btn'>Add Friend By Name</button>"
        );
        addFriendBtn.click(() => {
          addFriendBtn.hide();
          friendActions.makeDomComponents();
        });
        const friendsList = $("#friends");
        const currentUser = sessionStorage.getItem("activeUser");
        $("#friendListContainer").remove();
        friendsList.append(addFriendBtn);
        addFriendBtn.show();
        friendsList.append(
          $("<div id='friendListContainer'><ul id='friendUL'></ul></div>")
        );
        let currentFriendsList = apiController
          .getFriendsList(currentUser)
          .then(response => {
            response.forEach(friend => {
              let delElement = $(
                "<button class='button is-small delete is-danger'>"
              );
              delElement.click(e => {
                addFriendBtn.remove();
                friendActions.deleteFriend(e);
              });
              // let liElement = $(`<li>${friend.user.name}</li>`)
              let liElement = $(`<li id=${friend.id}>`);
              liElement.text(`${friend.user.name}`);
              liElement.prepend(delElement);
              $("#friendUL").append(liElement);
            });
          });
      }
    },
    makeDomComponents: {
      value: function() {
        const addFriendBtn = $("#add-friend-btn");
        const currentUser = sessionStorage.getItem("activeUser");
        const friendNameInput = $(
          "<input type='text' placeholder='Enter Friend Name' autofocus></input>"
        );
        const saveButton = $("<button>");
        saveButton.text("Save Friend");
        $("#friendUL")
          .prepend(saveButton)
          .append(friendNameInput);
        //Event handlers for submit button click and or enter key in input field
        saveButton.click(() => {
          friendName = friendNameInput.val().toLowerCase();
          friendActions.addFriend(
            friendName,
            saveButton,
            friendNameInput,
            addFriendBtn
          );
        });
        friendNameInput.keyup(event => {
          if (event.which === 13) {
            friendName = friendNameInput.val().toLowerCase();
            friendActions.addFriend(
              friendName,
              saveButton,
              friendNameInput,
              addFriendBtn
            );
          }
        });
      }
    },
    addFriend: {
      value: function(friendName, addFriendBtn, saveButton, friendNameInput) {
        const currentUser = sessionStorage.getItem("activeUser");
        let friendsToCheck = [];
        apiController.getFriendsList(currentUser).then(response => {
          //populate array with response from API
          friendsToCheck = response;
          //map array to pull out only user names to check against
          friendNameArray = friendsToCheck.map((currentValue, index) => {
            return friendsToCheck[index].user.name;
          });
          //if input field is empty
          if (friendName === "") {
            alert("Please enter a valid username");
            if (saveButton) {
              saveButton.remove();
            }
            if (friendNameInput) {
              friendNameInput.remove();
            }
            if (addFriendBtn) {
              addFriendBtn.show();
            }
            return;
          }
          //Check whether or not friendship already exists
          else if (friendNameArray.includes(friendName)) {
            alert(`You're already friends with ${friendName}`);
            if (saveButton) {
              saveButton.remove();
            }
            if (friendNameInput) {
              friendNameInput.remove();
            }
            if (addFriendBtn) {
              addFriendBtn.show();
            }
            return;
          } else {
            apiController.getUserId(friendName).then(response => {
              //Get friend from database and run checks
              //check if friend exists in database
              if (response.length === 0) {
                alert(`I'm sorry, user ${friendName} doesn't exist`);
                if (saveButton) {
                  saveButton.remove();
                }
                if (friendNameInput) {
                  friendNameInput.remove();
                }
                addFriendBtn.show();
              }
              //check if user is adding themselves as a friend
              else if (String(response[0].id) === currentUser) {
                alert("You cannot add yourself as a friend, friend.");
                if (saveButton) {
                  saveButton.remove();
                }
                if (friendNameInput) {
                  friendNameInput.remove();
                }
                if (addFriendBtn) {
                  addFriendBtn.show();
                }
                return;
              }
              //add friend and reload DOM
              else {
                apiController.addNewFriend(currentUser, response[0].id);
                if (friendNameInput) {
                  friendNameInput.remove();
                }
                if (saveButton) {
                  saveButton.remove();
                }
                friendActions.displayFriendList();
                addFriendBtn.remove();
                // addFriendBtn.show()
              }
            });
          }
        });
      }
    },
    deleteFriend: {
      value: function(e) {
        // $("#add-friend-btn").remove()
        let currentUser = sessionStorage.getItem("activeUser");
        const relId = parseInt(e.target.parentNode.id);
        apiController.deleteFriend(relId).then(response => {
          friendActions.displayFriendList();
        });
      }
    }
  }
);
module.exports = friendActions;
