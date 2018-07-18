import React, { Component } from "react";
import APIManager from "../API/apiManager";
import "./chat.css";

export default class Message extends Component {
    state = {
        editMode: false
    };

    componentDidMount() {
        this.setState({
            editedMessage: this.props.message.message
        });
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    render() {
        // Normal Display
        if (!this.props.editMsgButtonDisplay) {
            return (
                <p id={this.props.message.id} className="msgItem">
                    {() => {
                        if (this.props.message.user.id === this.props.currentUser) {
                            return (
                                <span className="msgUser msgText me">
                                    {this.props.message.user.name}
                                </span>
                            );
                        } else {
                            return (
                                <span className="msgUser msgText other">
                                    {this.props.message.user.name}
                                </span>
                            );
                        }
                    }}

                    <span className="msgSeperator msgText">:</span>
                    <span className="msgContent msgText">
                        {this.props.message.message}
                    </span>
                </p>
            );
        }
        // Display Edit Options
        else if (this.props.editMsgButtonDisplay && !this.state.editMode) {
            return (
                <p id={this.props.message.id} className="msgItem">
                    {() => {
                        if (this.props.message.user.id === this.props.currentUser) {
                            return (
                                <button
                                    className="editMsgButton"
                                    onClick={() => {
                                        this.setState({
                                            editMode: true
                                        });
                                    }}
                                >
                                    <i className="fa fa-pencil" />
                                </button>
                            );
                        } else {
                            return (
                                <button className="addFriendButton">
                                    <i className="fa fa-plus" />
                                </button>
                            );
                        }
                    }}

                    {() => {
                        if (this.props.message.user.id === this.props.currentUser) {
                            return (
                                <span className="msgUser msgText me">
                                    {this.props.message.user.name}
                                </span>
                            );
                        } else {
                            return (
                                <span className="msgUser msgText other">
                                    {this.props.message.user.name}
                                </span>
                            );
                        }
                    }}

                    <span className="msgSeperator msgText">:</span>
                    <span className="msgContent msgText">
                        {this.props.message.message}
                    </span>
                </p>
            );
        }
        // Edit Mode
        // update = (msgId, userId, newMessage, messageTimeStamp) => {
        //   messagesApi
        //     .putMessage(msgId, userId, newMessage, messageTimeStamp)
        //     .then(() => {
        //       this.read();
        //     });
        // };

        // key={message.id}
        //             message={message}
        //             create={this.create}
        //             read={this.read}
        //             update={this.update}
        //             delete={this.delete}
        //             currentUser={this.currentUser}
        //             editMsgButtonDisplay={this.editMsgButtonDisplay}
        else {
            return (
                <p id={this.props.message.id} className="msgItem">
                    <button
                        className="saveMsgEditsButton"
                        onClick={() => {
                            this.props.update(
                                this.props.message.id,
                                this.props.currentUser,
                                this.state.editedMessage,
                                this.props.message.timeStamp
                            );
                        }}
                    >
                        <i className="fa fa-floppy-o" />
                    </button>
                    <button
                        className="deleteMsgButton"
                        onClick={() => {
                            this.props.delete(this.props.message.id);
                        }}
                    >
                        <i className="fa fa-trash-o" />
                    </button>
                    <button
                        className="cancelMsgEditButton"
                        onClick={() => {
                            this.setState({
                                editMode: false
                            });
                        }}
                    >
                        <i className="fa fa-times" />
                    </button>
                    <span className="msgUser msgText me">
                        {this.props.message.user.name}
                    </span>
                    <span className="msgSeperator msgText" />
                    <input
                        className="editMsgInput msgText"
                        value={this.state.editedMessage}
                        onChange={this.handleFieldChange}
                        type="text"
                        id="editedMessage"
                        required=""
                        autoFocus=""
                    />
                </p>
            );
        }
    }
}
