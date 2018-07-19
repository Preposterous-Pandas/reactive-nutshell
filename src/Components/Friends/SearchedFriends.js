import React from "react";
import SearchedFriend from "./SearchedFriend";

export default class SearchedFriends extends React.Component {
  state = {
    searchMatchUsers: []
  };
  componentDidMount() {
    this.setState({
      searchMatchUsers: this.props.searchUsers(this.props.addFriendInput)
    });
  }
  render() {
    return (
      <ul>
        {this.state.searchMatchUsers.map(user => (
          <SearchedFriend key={user.id} user={user} />
        ))}
      </ul>
    );
  }
}

// Animal.propTypes = {
//   animal: PropTypes.object.isRequired,
//   checkOutAnimal: PropTypes.func.isRequired
// };
