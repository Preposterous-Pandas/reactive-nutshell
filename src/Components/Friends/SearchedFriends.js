import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class SearchedFriends extends Component {
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
