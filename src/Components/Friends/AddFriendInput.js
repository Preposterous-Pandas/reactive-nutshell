import React from "react";

const AddFriendInput = ({ handleFieldChange, addFriendInput }) => {
  return (
    <input
      id="addFriendInput"
      onChange={handleFieldChange}
      value={addFriendInput}
    />
  );
};

// Animal.propTypes = {
//   animal: PropTypes.object.isRequired,
//   checkOutAnimal: PropTypes.func.isRequired
// };

export default AddFriendInput;
