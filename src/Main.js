import React, { Component } from 'react'
import News from './Components/News/News';
import Friends from "./Components/Tasks/Tasks"
import Friends from "./Components/Chat/Chat"
import Friends from "./Components/Events/Events"
import Friends from "./Components/Friends/Friends"


export default class Main extends Component {
    render(){
        return (
            < News />
            <Friends />
            <Chat />
            <Events />
           <Tasks />
        )
    }
}