import React, { Component } from "react";
import apiManager from "./../API/apiManager";
import NewEventButton from "./NewEventButton";
import Event from "./Event";

export default class EventList extends Component {
  state = {
    events: []
  };

  getEvents = () => {
    const currentUser = sessionStorage.getItem("activeUser");
    let allFriendsString;
    apiManager
      .getFriendsList(currentUser)
      .then(allFriends => {
        console.log("gettingfriendlist");

        let allFriendsArray = [];
        allFriends.forEach(friend => {
          const friendId = friend.user.id;
          allFriendsArray.push(friendId);
        });
        // allFriendsArray = allFriendsArray.map(friendIdNumber => {
        //   return `userId=${friendIdNumber}&`;
        // });
        console.log(allFriendsArray);

        allFriendsString = allFriendsArray.join("");
        allFriendsString;
        // console.log(allFriendsString);
      })
      .then(() => {
        // apiManager
        //   .getField("events")
        //   .then(events => this.setState({ events: events }));
        return fetch(
          // ?userId=${currentUser}&${friendString}_sort=date&_order=asc`
          `http://localhost:5002/events/?userId=${currentUser}&userId=${allFriendsString}&_sort=date&_order=asc`
          // "http://localhost:5002/events/?userId=2&userId=1&_sort=date&_order=asc"
        );
      })
      .then(e => e.json())
      .then(events => {
        console.log(currentUser);

        console.log(allFriendsString);
        console.log(events);

        this.setState({ events: events });
      });
  };

  componentDidMount() {
    this.getEvents();
  }

  render() {
    return (
      <React.Fragment>
        <div className="events">
          <h3 className="section-headline">Events</h3>
          <NewEventButton
            getEvents={() => {
              this.getEvents();
            }}
          />
          {this.state.events.map(event => {
            return (
              <Event
                key={event.id}
                styling={
                  event.userId == sessionStorage.getItem("activeUser")
                    ? "normal"
                    : "italics"
                }
                event={event}
                getEvents={this.getEvents}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
