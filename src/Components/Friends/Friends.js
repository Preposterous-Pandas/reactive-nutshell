import React, { Component } from "react";
import APIManager from "../API/apiManager";

const apiManager = APIManager;

export default class Friend extends Component {
  state = {
    activeUser: "",
    friends: [],
    users: [],
    addFriendMode: false,
    addFriendInput: ""
  };

  //   read = activeUser => {
  //     apiManager.getFriendsList(activeUser).then(friends => {
  //       this.setState({
  //         friends: friends
  //       });
  //     });
  //   };

  //   create = (currentUserId, friendToAddId) => {
  //     apiManager.addFriend(currentUserId, friendToAddId).then(() => {
  //       this.read();
  //     });
  //   };

  delete = relId => {
    apiManager.deleteFriend(relId).then(this.read);
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

  render() {
    let addFriendInput = null;
    let listTitle = null;
    let suggestedFriendsList = null;
    if (this.state.addFriendMode) {
      addFriendInput = (
        <input
          id="addFriendInput"
          onChange={this.handleFieldChange}
          value={this.state.addFriendInput}
        />
      );

      let suggestedFriends = [];
      this.state.users.forEach(user => {
        if (user.name.includes(this.state.addFriendInput)) {
          suggestedFriends.push(user);
        }
      });

      let suggestedFriendsItems = suggestedFriends.map(friend => {
        return <li>{friend.name}</li>;
      });

      suggestedFriendsList = <ul>{suggestedFriendsItems}</ul>;
      listTitle = <h6>Users</h6>;
    } else {
      listTitle = <h6>Friends</h6>;
    }

    return (
      <div className="friends">
        <button
          id="add-friend-btn"
          onClick={() => {
            if (this.state.addFriendMode === false) {
              this.setState({
                addFriendMode: true
              });
            } else {
              this.setState({
                addFriendMode: false
              });
            }
          }}
        >
          Add Friend By Name
        </button>
        {addFriendInput}
        {listTitle}
        {suggestedFriendsList}
        <ul>
          {this.props.friends.map(friend => {
            return <li>{friend.user.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

//         const addFriendBtn = $(
//           "<button id='add-friend-btn'>Add Friend By Name</button>"
//         );

//         addFriendBtn.click(() => {
//           addFriendBtn.hide();
//           friendActions.makeDomComponents();
//         });

//         const friendsList = $("#friends");
//         const currentUser = sessionStorage.getItem("activeUser");
//         $("#friendListContainer").remove();
//         friendsList.append(addFriendBtn);
//         addFriendBtn.show();
//         friendsList.append(
//           $("<div id='friendListContainer'><ul id='friendUL'></ul></div>")
//         );
//         let currentFriendsList = apiController
//           .getFriendsList(currentUser)
//           .then(response => {
//             response.forEach(friend => {
//               let delElement = $(
//                 "<button class='button is-small delete is-danger'>"
//               );
//               delElement.click(e => {
//                 addFriendBtn.remove();
//                 friendActions.deleteFriend(e);
//               });
//               // let liElement = $(`<li>${friend.user.name}</li>`)
//               let liElement = $(`<li id=${friend.id}>`);
//               liElement.text(`${friend.user.name}`);
//               liElement.prepend(delElement);
//               $("#friendUL").append(liElement);
//             });
//           });
//       }
//     },
//     makeDomComponents: {
//       value: function() {
//         const addFriendBtn = $("#add-friend-btn");
//         const currentUser = sessionStorage.getItem("activeUser");
//         const friendNameInput = $(
//           "<input type='text' placeholder='Enter Friend Name' autofocus></input>"
//         );
//         const saveButton = $("<button>");
//         saveButton.text("Save Friend");
//         $("#friendUL")
//           .prepend(saveButton)
//           .append(friendNameInput);
//         //Event handlers for submit button click and or enter key in input field
//         saveButton.click(() => {
//           friendName = friendNameInput.val().toLowerCase();
//           friendActions.addFriend(
//             friendName,
//             saveButton,
//             friendNameInput,
//             addFriendBtn
//           );
//         });
//         friendNameInput.keyup(event => {
//           if (event.which === 13) {
//             friendName = friendNameInput.val().toLowerCase();
//             friendActions.addFriend(
//               friendName,
//               saveButton,
//               friendNameInput,
//               addFriendBtn
//             );
//           }
//         });
//       }
//     },
//     addFriend: {
//       value: function(friendName, addFriendBtn, saveButton, friendNameInput) {
//         const currentUser = sessionStorage.getItem("activeUser");
//         let friendsToCheck = [];
//         apiController.getFriendsList(currentUser).then(response => {
//           //populate array with response from API
//           friendsToCheck = response;
//           //map array to pull out only user names to check against
//           friendNameArray = friendsToCheck.map((currentValue, index) => {
//             return friendsToCheck[index].user.name;
//           });
//           //if input field is empty
//           if (friendName === "") {
//             alert("Please enter a valid username");
//             if (saveButton) {
//               saveButton.remove();
//             }
//             if (friendNameInput) {
//               friendNameInput.remove();
//             }
//             if (addFriendBtn) {
//               addFriendBtn.show();
//             }
//             return;
//           }
//           //Check whether or not friendship already exists
//           else if (friendNameArray.includes(friendName)) {
//             alert(`You're already friends with ${friendName}`);
//             if (saveButton) {
//               saveButton.remove();
//             }
//             if (friendNameInput) {
//               friendNameInput.remove();
//             }
//             if (addFriendBtn) {
//               addFriendBtn.show();
//             }
//             return;
//           } else {
//             apiController.getUserId(friendName).then(response => {
//               //Get friend from database and run checks
//               //check if friend exists in database
//               if (response.length === 0) {
//                 alert(`I'm sorry, user ${friendName} doesn't exist`);
//                 if (saveButton) {
//                   saveButton.remove();
//                 }
//                 if (friendNameInput) {
//                   friendNameInput.remove();
//                 }
//                 addFriendBtn.show();
//               }
//               //check if user is adding themselves as a friend
//               else if (String(response[0].id) === currentUser) {
//                 alert("You cannot add yourself as a friend, friend.");
//                 if (saveButton) {
//                   saveButton.remove();
//                 }
//                 if (friendNameInput) {
//                   friendNameInput.remove();
//                 }
//                 if (addFriendBtn) {
//                   addFriendBtn.show();
//                 }
//                 return;
//               }
//               //add friend and reload DOM
//               else {
//                 apiController.addNewFriend(currentUser, response[0].id);
//                 if (friendNameInput) {
//                   friendNameInput.remove();
//                 }
//                 if (saveButton) {
//                   saveButton.remove();
//                 }
//                 friendActions.displayFriendList();
//                 addFriendBtn.remove();
//                 // addFriendBtn.show()
//               }
//             });
//           }
//         });
//       }
//     },
//     deleteFriend: {
//       value: function(e) {
//         // $("#add-friend-btn").remove()
//         let currentUser = sessionStorage.getItem("activeUser");
//         const relId = parseInt(e.target.parentNode.id);
//         apiController.deleteFriend(relId).then(response => {
//           friendActions.displayFriendList();
//         });
//       }
//     }
//   }
// );
// module.exports = friendActions;
