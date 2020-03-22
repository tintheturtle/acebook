import React, { Component } from 'react'
import io from 'socket.io-client'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from "classnames"
import 'whatwg-fetch'

import '../styles/Message.css'



class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            chat: [],
            content: '',
            name: this.props.auth.user.email
        }

    }

    componentDidMount() {

        this.socket = io.connect('http://localhost:8000')

        this.socket.on('init', (msg) => {
            console.log(this.state.chat)
            this.setState((state) => ({
              chat: [...state.chat, ...msg.reverse()]
            }))
          })


        this.socket.on('push', (pushedMessage) => {
            console.log(this.state)
            this.setState((state) => ({
                chat: [...state.chat, pushedMessage]
            }))
        })

        console.log(this.state)
    
        
    }
    

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
        console.log(this.state.content)
    }

    onSubmit = e => {
        e.preventDefault()

        
        try {
            // this.socket.emit('test', {name: this.state.name, content: this.state.content })
        
            // const message = this.state.name + ': ' + this.state.content
            // this.setState((state) => ({
            //     chat: [...state.chat, message]
            // }))

            this.setState((state) => {
                console.log(state);
                console.log('this', this.socket);
                // Send the new message to the server.
                this.socket.emit('test', {
                  name: this.state.name,
                  content: this.state.content,
                });
          
                // Update the chat with the user's message and remove the current message.
                return {
                  chat: [...this.state.chat, {
                    name: this.state.name,
                    content: this.state.content,
                  }],
                  content: '',
                };
              })
            
        
        }
        catch {
            console.log('Whoops something went wrong.')
        }


    }

    render() {

        const { other } = this.props.message
        return (
            <div style={{ height: "75vh" }} className="container">
                <div id="dashboard-header" className="row">
                    <div className="col s12 center-align">
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
                                <div key={index}>
                                    <p> {data.name} : {data.content} </p> 
                                </div>
                            )
                        })}
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <div className="input-field col s12">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.content}
                                            id="content"
                                            type="text"
                                            className={classnames("")}
                                        />
                                        <label htmlFor="test">Message</label>
                        </div>
                        <div>
                                <button
                                        style={{
                                            width: "150px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1rem"
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
