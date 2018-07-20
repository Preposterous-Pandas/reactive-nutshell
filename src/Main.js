import React, { Component } from "react";
import "./styles/grid.css";
import News from "./Components/News/News";
import Tasks from "./Components/Tasks/Tasks";
import Chat from "./Components/Chat/Chat";
import Events from "./Components/Events/EventList";
import Friends from "./Components/Friends/Friends";
import Header from "./Components/Header";
import API from "./Components/API/apiManager";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faKey,
  faCog,
  faEdit,
  faTimesCircle,
  faBan,
  faSave,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faEnvelope,
  faKey,
  faCog,
  faEdit,
  faTimesCircle,
  faBan,
  faSave,
  faUserPlus
);

export default class Main extends Component {
  state = {
    friendList: [],
    friends: []

  };

  componentDidMount() {
    this.readFriends();
  }

  readFriends = () => {
    API.getFriendsList(
      sessionStorage.getItem("activeUser") || localStorage.getItem("activeUser")
    ).then(friendList => {
      this.setState({
        friendList: friendList
      });
    });
    API.allFriends()
      .then(friends => {
        this.setState({ friends: friends });
      })
  };



  beFriend = buddy => {
    if (this.state.friendList.includes(buddy)) {
      alert("You're already friends with that person!");
      return;
    }
    API.postFriend(
      String(buddy),
      String(sessionStorage.getItem("activeUser"))
    ).then(() => {
      this.readFriends();
    });
  };

  render() {
    return (
      <React.Fragment>
        <div id="main-container">
          <Header />
          <News friends={this.state.friends} />
          <Friends
            beFriend={this.beFriend}
            friends={this.state.friendList}
            readFriends={this.readFriends}
          />
          <Chat beFriend={this.beFriend} />
          <Events friends={this.state.friendList} />
          <Tasks />
        </div>
      </React.Fragment>
    );
  }
}
