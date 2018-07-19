import React from "react";
import apiManager from "../API/apiManager";

export default class stuff {
  addEvent = () => {
    const eventName = document.querySelector("#eventName").value;
    const eventLocation = document.querySelector("#eventLocation").value;
    const eventDate = document.querySelector("#eventDate").value;

    apiManager.postEvent(
      sessionStorage.getItem("activeUser"),
      eventName,
      eventLocation,
      eventDate
    );
  };
}
