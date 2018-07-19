import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Animal = ({ handleFieldChange, addFriendInput }) => {
  return (
    <input
      id="addFriendInput"
      onChange={handleFieldChange}
      value={addFriendInput}
    />
  );
};

Animal.propTypes = {
  animal: PropTypes.object.isRequired,
  checkOutAnimal: PropTypes.func.isRequired
};

export default Animal;
