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

  componentDidMount() {
    apiManager.getUsers().then(users => {
      console.log(users);
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

  searchUsers = searchString => {
    const searchMatchUsers = [];
    this.state.users.forEach(user => {
      if (user.name.includes(searchString)) {
        searchMatchUsers.push(user);
      }
    });
    return searchMatchUsers;
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
          <SearchedFriends
            searchUsers={this.searchUsers}
            addFriendInput={this.state.addFriendInput}
          />
        </div>
      );
    } else {
      return (
        <div className="friends">
          <h4>Your Friends</h4>
          <button id="add-friend-btn" onClick={this.setAddFriendMode}>
            Search Friends By Name
          </button>
          {this.state.friends.map(user => <Friend key={user.id} user={user} />)}
        </div>
      );
    }
  }
}
