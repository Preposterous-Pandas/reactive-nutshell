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
    friends: []
  };

  readFriends = () => {
    API.getFriendsList(
      sessionStorage.getItem("activeUser") || localStorage.getItem("activeUser")
    ).then(friends => {
      console.log("phils test", friends);
      this.setState({
        friends: friends
      });
    });
  };

  createFriend = friendToAddId => {
    API.addFriend(
      sessionStorage.getItem("activeUser") ||
        localStorage.getItem("activeUser"),
      friendToAddId
    ).then(() => {
      this.read();
    });
  };

  componentDidMount() {
    this.readFriends();
  }

  //   beFriend = buddy => {
  //     API.postFriend(buddy, sessionStorage.getItem("activeUser")).then(
  //       response => {
  //         console.log("post friend response", response);
  //         this.setState({ friendList: API.allFriends() });
  //       }
  //     );
  //   };
  render() {
    return (
      <React.Fragment>
        <Header />
        <News friends={this.state.friends} />
        <Friends
          createFriend={this.createFriend}
          friends={this.state.friends}
        />
        {/* <Chat beFriend={this.createFriend} /> */}
        <Events friends={this.state.friends} />
        <Tasks />
      </React.Fragment>
    );
  }
}
