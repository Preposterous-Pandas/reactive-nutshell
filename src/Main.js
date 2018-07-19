import React, { Component } from 'react'
import News from './Components/News/News';
import Tasks from "./Components/Tasks/Tasks"
import Chat from "./Components/Chat/Chat"
import Events from './Components/Events/EventList';
import Friends from "./Components/Friends/Friends"
import Header from "./Components/Header"
import API from './Components/API/apiManager'
import { library } from "@fortawesome/fontawesome-svg-core"
import { faEnvelope, faKey, faCog, faEdit, faTimesCircle, faBan, faSave, faUserPlus } from "@fortawesome/free-solid-svg-icons"

library.add(faEnvelope, faKey, faCog, faEdit, faTimesCircle, faBan, faSave, faUserPlus)


export default class Main extends Component {

    state = {
        friendList: []
    }

    componentDidMount() {
        API.allFriends()
            .then(friends => {
                this.setState({ friendList: friends });
                // console.log("Main all friends", this.state.friendList)
            })
    }

    beFriend = (buddy) => {
        if (this.state.friendList.includes(buddy)){
            alert("You're already friends with that person!")
            return
        }
        API.postFriend(buddy, sessionStorage.getItem('activeUser'))
            .then(response => {
                // console.log('post friend response', response)
                API.allFriends().then(friends => {
                  this.setState({ friendList: friends })
                })
            })
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                <News friends={this.state.friendList}/>
                <Friends beFriend={this.beFriend} friends={this.state.friendList}/>
                <Chat beFriend={this.beFriend}/>
                <Events friends={this.state.friendList}/>
                <Tasks />
            </React.Fragment>


        )
    }
}
