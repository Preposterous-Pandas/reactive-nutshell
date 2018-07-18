import React from "react";

export default class apiManager {
  static getField(resource) {
    return fetch(`http://localhost:5002/${resource}`).then(e => e.json());
  }

  getField(resource) {
    return fetch(`http://localhost:5002/${resource}`).then(e => e.json());
  }

  getFriendsList(currentUserId) {
    return fetch(
      `http://localhost:5002/friends?_expand=user&yourId=${currentUserId}`
    ).then(e => e.json());
  }

  addNewFriend(currentUserId, friendToAddId) {
    return fetch("https://localhost:5002/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: friendToAddId,
        yourId: currentUserId
      })
    });
  }

  deleteFriend(relId) {
    return fetch(`http://localhost:5002/friends/${relId}`, {
      method: "DELETE"
    });
  }

  postUser(name, email) {
    return fetch("http://localhost:5002/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    });
  }

  getUser(userId) {
    return fetch(`http://localhost:5002/users/${userId}`).then(e => e.json());
  }

  getMessage(messageId) {
    return fetch(`http://localhost:5002/messages/${messageId}`).then(e =>
      e.json()
    );
  }

  postMessage(msg, user) {
    return fetch("http://localhost:5002/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user,
        message: msg
      })
    });
  }

  putMessage(user, msg, id) {
    return fetch(`http://localhost:5002/messages/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user,
        message: msg
      })
    });
  }

  postEvent(user, name, loc, date) {
    return fetch("http://localhost:5002/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user,
        name: name,
        location: loc,
        date: date
      })
    });
  }

  postUser(name, password, email) {
    return fetch("http://localhost:5002/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email
      })
    });
  }

  getUser(userId) {
    return fetch(`http://localhost:5002/users/${userId}`).then(e => e.json());
  }

  getMessages() {
    return fetch(
      "https://localhost:5002/messages?_expand=user&_sort=timeStamp"
    ).then(e => e.json());
  }

  postMessage(userId, message, timestamp) {
    return fetch("http://localhost:5002/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        message: message,
        timeStamp: timestamp
      })
    });
  }

  putMessage(msgId, userId, newMessage, messageTimeStamp) {
    return fetch(`http://localhost:5002/messages/${msgId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        message: newMessage,
        timeStamp: messageTimeStamp
      })
    });
  }

  delMessage(msgId) {
    return fetch(`http://localhost:5002/messages/${msgId}`, {
      method: "DELETE"
    });
  }

  postEvent(user, name, loc, date) {
    return fetch("http://localhost:5002/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user,
        name: name,
        location: loc,
        date: date
      })
    });
  }

  putEvent(user, name, loc, date, id) {
    return fetch(`http://localhost:5002/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user,
        name: name,
        location: loc,
        date: date
      })
    });
  }

  delEvent(id) {
    return fetch(`http://localhost:5002/events/${id}`, {
      method: "DELETE"
    });
  }

  postNews(user, title, url, syn, time) {
    return fetch("http://localhost:5002/news", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        userId: user,
        title: title,
        url: url,
        synopsis: syn,
        timestamp: time
      })
    });
  }

  delNews(id) {
    return fetch(`http://localhost:5002/news/${id}`, {
      method: "DELETE"
    });
  }

  postTask(user, task, done, date) {
    return fetch("http://localhost:5002/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user,
        task: task,
        date: date,
        completed: done
      })
    });
  }

  putTask(user, task, done, date, id) {
    return fetch(`http://localhost:5002/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user,
        task: task,
        date: date,
        completed: done
      })
    });
  }
}
