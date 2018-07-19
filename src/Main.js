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
      console.log("phils test", friendList);
      this.setState({
        friends: friendList
      });
    });
  };

  beFriend = friendToAddId => {
    API.addFriend(
      sessionStorage.getItem("activeUser") ||
        localStorage.getItem("activeUser"),
      friendToAddId
    ).then(() => {
      this.readFriends();
    });
  };

  componentDidMount() {
    this.readFriends();
  }

  // beFriend = (buddy) => {
  //     if (this.state.friendList.includes(buddy)){
  //         alert("You're already friends with this person!")
  //         return
  //     }
  //     API.postFriend(buddy, sessionStorage.getItem('activeUser'))
  //         .then(response => {
  //             console.log('post friend response', response)
  //             API.allFriends()
  //                 .then(friends => {
  //                     this.setState({ friendList: friends });
  //                 })
  //         })
  // }

  render() {
    return (
      <React.Fragment>
        <Header />
        <News friends={this.state.friendList} />
        <Friends
          beFriend={this.beFriend}
          friends={this.state.friendList}
          readFriends={this.state.readFriends}
        />
        <Chat beFriend={this.beFriend} />
        <Events friends={this.state.friendList} />
        <Tasks />
      </React.Fragment>
    );
  }
}
