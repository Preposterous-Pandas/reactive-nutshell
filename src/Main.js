import React, { Component } from 'react'
import News from './Components/News/News';
import Tasks from "./Components/Tasks/Tasks"
import Chat from "./Components/Chat/Chat"
import Events from './Components/Events/EventList';
import Friends from "./Components/Friends/Friends"
import Header from "./Components/Header"


export default class Main extends Component {

    state = {
        friendList: []
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                <News />
                <Friends />
                <Chat />
                <Events />
                <Tasks />
            </React.Fragment>


        )
    }
}
