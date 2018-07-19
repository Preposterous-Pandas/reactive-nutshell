import React, { Component } from "react";
import APIManager from "../API/apiManager";
import AddFriendInput from "./AddFriendInput";
import Friend from "./Friend";
import SearchedFriends from "./SearchedFriends";

const apiManager = APIManager;

export default class Friends extends Component {
  state = {
    users: [],
    addFriendMode: false,
    addFriendInput: ""
  };

  delete = relId => {
    apiManager.deleteFriend(relId).then(this.props.readFriends);
  };

  searchMatchUsers = () => {
    const searchString = this.state.addFriendInput;
    const users = this.state.users;
    const newSearchMatchUsers = [];
    users.forEach(user => {
      this.props.friends.forEach(friend => {
        if (
          String(user.id) !== String(friend.user.id) &&
          String(user.id) !== String(sessionStorage.getItem("activeUser")) &&
          String(user.id) !== String(localStorage.getItem("activeUser"))
        ) {
          const lowerUserName = user.name.toLowerCase();
          if (lowerUserName.includes(searchString.toLowerCase())) {
            newSearchMatchUsers.push(user);
          }
        }
      });
    });
    return newSearchMatchUsers;
  };

  componentDidMount() {
    apiManager.getUsers().then(users => {
      this.setState({
        users: users
      });
    });
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  setAddFriendMode = () => {
    if (this.state.addFriendMode === false) {
      this.setState({
        addFriendMode: true
      });
    } else {
      this.setState({
        addFriendMode: false
      });
    }
  };

  render() {
    if (this.state.addFriendMode) {
      return (
        <div className="friends">
          <h4>Enter Name</h4>
          <button id="cancel-add-friend-btn" onClick={this.setAddFriendMode}>
            Cancel
          </button>
          <AddFriendInput
            handleFieldChange={this.handleFieldChange}
            addFriendInput={this.state.addFriendInput}
          />
          <SearchedFriends searchMatchUsers={this.searchMatchUsers()} />
        </div>
      );
    } else {
      return (
        <div className="friends">
          <h4>Your Friends</h4>
          <button id="add-friend-btn" onClick={this.setAddFriendMode}>
            Search Friends By Name
          </button>
          {this.props.friends.map(friend => (
            <Friend key={friend.id} user={friend.user} />
          ))}
        </div>
      );
    }
  }
}
