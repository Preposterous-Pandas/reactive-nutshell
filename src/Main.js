import React, { Component } from 'react'
import EventList from './Components/Events/EventList';
import Friends from "./Components/Friends/Friends"

export default class Main extends Component {
    render() {
        return (
            <React.Fragment>
                <Friends />
                <EventList />
            </React.Fragment>
        )
    }
}