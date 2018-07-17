import React, { Component } from 'react'

export default class Friends extends Component {
    state = {
        number: 1
    }
    genRando=()=>{
        let newNum = Math.floor(Math.random()*10+1)
        this.setState({number: newNum})
    }
    render(){
        return (
            <React.Fragment>
                <div className="friends">
                    <h4>Friends</h4>
                    <h3>{this.state.number}</h3>
                    <button onClick={this.genRando}>New Number</button>
                </div>
            </React.Fragment>
        )
    }
}