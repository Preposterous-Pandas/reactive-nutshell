

class apiManager {
  getField(resource) {
    return fetch(`http://localhost:5002/${resource}`).then(e => e.json())
  }

  allFriends() {
    return fetch(`http://localhost:5002/friends`)
      .then(e => e.json())
      .then(friends => {
        const fList = []
        const User = sessionStorage.getItem("activeUser")
        friends.forEach(friend => {
          if (friend.yourId == User) {
            fList.push(friend.userId)
          }
        })
        console.log("API friends", fList)
        return fList
      })
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
    })
  }
    delEvent(id) {
        return fetch(`http://localhost:5002/events/${id}`, {
            method: "DELETE"
        })
    }

    postNews(user, title, url, syn, time) {
        
        return fetch("http://localhost:5002/news", {
            headers: {
                'Content-Type': 'application/json'
            },            method: "POST",
            body: JSON.stringify({
                "userId": user,
                "title": title,
                "url": url,
                "synopsis": syn,
                "timestamp": time
            })
        })
    }

    delNews(id) {
        return fetch(`http://localhost:5002/news/${id}`, {
            method: "delete"
        }).then(e => e.json())
    }

    postTask(user, description, date) {
        return fetch("http://localhost:5002/tasks", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userId": user,
                "description": description,
                "date": date,
                "completed": false
            })
        })
    }

    putTask(user, description, done, date, id) {
        return fetch(`http://localhost:5002/tasks/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userId": user,
                "description": description,
                "date": date,
                "completed": done
            })
        })
    }

    postFriend(user, yourid) {
        return fetch("http://localhost:5002/friends", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                "userId": user,
                "yourId": yourid
            })
        })
    }
  getUser(userId) {
    return fetch(`http://localhost:5002/users/${userId}`).then(e => e.json())
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
    })
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
    })
  }

  delEvent(id) {
    return fetch(`http://localhost:5002/events/${id}`, {
      method: "DELETE"
    })
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
    })
  }

  delNews(id) {
    return fetch(`http://localhost:5002/news/${id}`, {
      method: "delete"
    }).then(e => e.json())
  }

  postTask(user, task, date) {
    return fetch("http://localhost:5002/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user,
        task: task,
        date: date,
        completed: false
      })
    })
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
    })
  }

  postFriend(user, yourid) {
    return fetch("http://localhost:5002/friends", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        userId: user,
        yourId: yourid
      })
    })
  }

  delFriend(id) {
    return fetch(`http://localhost:5002/friends/${id}`, {
      method: "DELETE"
    })
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
    }).then(e => e.json())
  }

  getUser(userId) {
    return fetch(`http://localhost:5002/users/${userId}`).then(e => e.json())
  }

  ///////////////////////////////////MESSAGES API CALLS////////////////////////////////////////////////
  getMessages() {
    return fetch(
      "http://localhost:5002/messages?_expand=user&_sort=timeStamp&_order=asc"
    ).then(e => e.json())
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
    })
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
    })
  }

  delMessage(msgId) {
    return fetch(`http://localhost:5002/messages/${msgId}`, {
      method: "DELETE"
    })
  }
  ///////////////////////////////////MESSAGES API CALLS////////////////////////////////////////////////

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
    })
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
    })
  }

  delEvent(id) {
    return fetch(`http://localhost:5002/events/${id}`, {
      method: "DELETE"
    })
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
    })
  }

  delNews(id) {
    return fetch(`http://localhost:5002/news/${id}`, {
      method: "DELETE"
    })
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
    })
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
    })
  }

  postFriend(user, yourid) {
    return fetch("http://localhost:5002/friends", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        userId: user,
        yourId: yourid
      })
    })
  }

  delFriend(id) {
    return fetch(`http://localhost:5002/friends/${id}`, {
      method: "DELETE"
    })
  }
}

const API = new apiManager();
export default API;

