import React, { Component } from "react";
import News from "./Components/News/News";
import Tasks from "./Components/Tasks/Tasks";
import Chat from "./Components/Chat/Chat";
import Events from "./Components/Events/EventList";
import Friends from "./Components/Friends/Friends";
import Header from "./Components/Header";
import API from "./Components/API/apiManager";

export default class Main extends Component {
  state = {
    friendList: []
  };

  readFriends = () => {
    API.getFriendsList(
      sessionStorage.getItem("activeUser") || localStorage.getItem("activeUser")
    ).then(friendList => {
      this.setState({
        friendList: friendList
      });
    });
  };

  beFriend = friendToAddId => {
    API.postFriend(
      friendToAddId,
      String(
        sessionStorage.getItem("activeUser") ||
          localStorage.getItem("activeUser")
      )
    ).then(() => {
      this.readFriends();
    });
  };

  componentDidMount() {
    this.readFriends();
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <News friends={this.state.friendList} />
        <Friends
          beFriend={this.beFriend}
          friends={this.state.friendList}
          readFriends={this.readFriends}
        />
        <Chat beFriend={this.beFriend} />
        <Events friends={this.state.friendList} />
        <Tasks />
      </React.Fragment>
    );
  }
}
