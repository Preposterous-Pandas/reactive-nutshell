import React from "react";

const deleteEvent = event => {
  const buttonId = event.target.id;
  const deleteId = parseInt(buttonId);
  apiManager.delEvent(deleteId).then(response => {});
};
