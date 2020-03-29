import React, { Component } from 'react'
import io from 'socket.io-client'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import moment from 'moment'
import 'whatwg-fetch'

import ProfileImage from '../images/profile.png'
import '../styles/Message.css'



class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            chat: [],
            content: '',
            name: this.props.auth.user.email,
            messageID: ''
        }

        this.socket = io('http://localhost:8000', 
            { query:  
                {
                    from: this.state.name,
                    to: this.props.message.other.email
                }
            }
        )
    }

    componentDidMount() {
        this.socket.emit('private_init')
        this.socket.on('init', (msg) => {
            this.setState((state) => ({
              chat: [...state.chat, ...msg.list],
              messageID: msg.uniqueCode
            }), this.scrollToBottom)
          })

        this.socket.on('private_chat', (pushedMessage) => {
            this.setState((state) => ({
                chat: [...state.chat, pushedMessage],
            }), this.scrollToBottom)
        }) 
    }

    componentWillUnmount() {
        this.socket.close();
    }
    

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }
    

    onSubmit = e => {
        e.preventDefault()
            this.setState((state) => {
                // Send the new message to the server.
                this.socket.emit('private', {
                  name: this.state.name,
                  content: this.state.content,
                  messageID: this.state.messageID,
                  receiver: this.props.message.other.email,
                  from: this.state.name
                });
          
                // Update the chat with the user's message and remove the current message.
                return {
                  chat: [...this.state.chat, {
                    name: this.state.name,
                    content: this.state.content,
                    time: moment().format('LT')
                  }],
                  content: '',
                };
              }, this.scrollToBottom)
    }

    scrollToBottom() {
        const chat = document.getElementById('chat');
        chat.scrollTop = chat.scrollHeight;
      }

    render() {

        const { other } = this.props.message
        return (
            <div className="container">
                <div id="message-header" className="message-header-row row">
                    <div className="col s12 center-align">
                        <img src={
                            other.headshotURL ? other.headshotURL  : ProfileImage 
                            } className="match-image" alt="profile" />
                        <h4>
                            <b>You are messaging: </b>  {other.name.split(" ")[0]}
                            <p className="flow-text grey-text text-darken-1">
                                Who is a <b>{other.ACE}</b> and whose email is <b>{other.email}</b>
                            </p>
                        </h4>
                    </div>
                </div>
                <div>
                    <div id="chat" elevation={3}>
                        {this.state.chat.map((data, index) => {

                            return (
                                <div className="chat-class" key={index}>
                                    <p className="chat-content"> <b>{data.name}</b> : {data.content} </p> 
                                    <p className="chat-time-stamp"> { data.time }</p>
                                </div>
                            )
                        })}
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <div className="input-field col s12">
                            <input
                                nChange={this.onChange}
                                value={this.state.content}
                                id="content"
                                type="text"
                                className={classnames("")}
                                maxlength="200"
                            />
                            <label htmlFor="test">Message</label>
                        </div>
                        <div>
                            <button
                                disabled={!this.state.content}
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem",
                                    marginBottom: "100px"
                                    }}
                                type="submit"
                                lassName="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Message
                            </button>
                        </div>
                    </form>
                    
                </div>
            </div>

        )
    }
    
}

Messages.propTypes = {
    auth: PropTypes.object.isRequired
  }
  const mapStateToProps = state => ({
    auth: state.auth,
    message: state.message
  })
export default connect(mapStateToProps)(Messages)
