import React, { Component } from 'react'
import News from './Components/News/News';
import Tasks from "./Components/Tasks/Tasks"
import Chat from "./Components/Chat/Chat"
import Events from './Components/Events/EventList';
import Friends from "./Components/Friends/Friends"
import Header from "./Components/Header"
import API from './Components/API/apiManager'


export default class Main extends Component {

    state = {
        friendList: []
    }

    componentDidMount() {
        API.allFriends()
        .then(friends => {
            this.setState({ friendList: friends });
            console.log("Main all friends", this.state.friendList)
        })
    }

    beFriend = (buddy) => {
        API.postFriend(buddy, sessionStorage.getItem('activeUser'))
            .then(response => {
                console.log('post friend response', response)
                this.setState({ friendList: API.allFriends() });
            })
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                <News friends={this.state.friendList}/>
                <Friends beFriend={this.beFriend} friends={this.state.friendList}/>
                <Chat beFriend={this.befreind}/>
                <Events friends={this.state.friendList}/>
                <Tasks />
            </React.Fragment>


        )
    }
}
