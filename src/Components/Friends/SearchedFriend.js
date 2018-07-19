import React from "react";

const SearchedFriend = ({ user }) => {
  return <li>{user.name}</li>;
};

// Animal.propTypes = {
//   animal: PropTypes.object.isRequired,
//   checkOutAnimal: PropTypes.func.isRequired
// };

export default SearchedFriend;
