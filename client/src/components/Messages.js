import React, { Component } from 'react'
import io from 'socket.io-client'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import moment from 'moment'
import axios from 'axios'
import 'whatwg-fetch'

import { sendMessageTo } from '../actions/messageActions'
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
            messageID: '',
            recentsList: [],
            userList: []
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

    async componentDidMount() {
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

        await axios
            .get('/api/users/update', {
                params: {
                  email: this.props.auth.user.email
                }
              })
            .then(res => {
                this.setState({
                    recentsList: res.data.list.reverse()
                })
            })
        await axios
            .get('/api/users/list')
            .then(res => {
                this.setState({
                    userList: res.data.userList
                })
            })

    }

    componentWillUnmount() {
        this.socket.close();
    }

    onClick = email => {
        const other = this.state.userList.find(user => user.email === email)

        this.props.sendMessageTo(other)
        let path = '/messages'
        this.props.history.push(path)
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
            <div className="container" style={{paddingBottom: '50px', paddingLeft: '100px'}}>
                <div className="message-container">
                    <div id="message-header" className="message-header-row row message-shadow">
                        <div className="other-profile-container">
                            <img src={
                                other.headshotURL ? other.headshotURL  : ProfileImage 
                                } className="match-image" alt="profile" />
                            <div className="match-profile">
                                <h5>
                                    <b>You are messaging: </b>  {other.name.split(" ")[0]}
                                </h5>
                                <b>Major: </b> {other.name} <br/>
                                <b>Year: </b> {other.name}
                                <p className="grey-text text-darken-1">
                                    Who is a <b>{other.ACE}</b> and whose email is <b>{other.email}</b>
                                </p>
                            </div>
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

                        <form onSubmit={this.onSubmit} className="message-form">
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.content}
                                    id="content"
                                    type="text"
                                    className={classnames("")}
                                    maxlength="200"
                                />
                                <label htmlFor="content">Message</label>
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
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Message
                                </button>
                            </div>
                        </form>
                        
                    </div>
                </div>
                <div id="sticky-left">
                    <div className="sticky">
                    <p className="recent-title"> Recently Messaged:
                    </p>
                    { this.state.recentsList.slice(0,10).map((data, indx) => {
                                    let string = data.split('|')
                                    return (
                                            <button key={indx} id="recent-button" onClick={e => this.onClick(string[0])} style={{ backgroundColor: 'white'}}>
                                                <div id="recent-block" style={{ left: '0' }}>
                                                    <b>{string[1]}</b> 
                                                    <br/>
                                                    <p id="recent-timestamp">
                                                        {string[2]}
                                                        </p>
                                                </div>
                                            </button>
                                    )
                                
                            })
                    }
                    </div>
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
export default connect(mapStateToProps, { sendMessageTo })(Messages)
