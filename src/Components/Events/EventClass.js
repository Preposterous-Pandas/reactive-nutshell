import React from "react";

export default class Event {
  constructor(userId, name, date, location) {
    this.userId = userId;
    this.name = name;
    this.date = date;
    this.location = location;
  }
}
