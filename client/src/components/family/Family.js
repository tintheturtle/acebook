import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import io from 'socket.io-client'
import moment from 'moment'
import 'whatwg-fetch'


import { getFamily } from '../../actions/familyActions'
import ProfilePicture from '../../images/profile.png'
import '../../styles/Family.css'

class Family extends Component {
    constructor(props){
        super(props)
        this.state = {
            family: false,
            chat: [],
            content: '',
            name: this.props.auth.user.email
        }
        this.socket = io('http://localhost:8000', 
            { query:  
                {
                    from: this.state.name,
                }
            }
        )
    }

    // Scoreboard
    // Component did mount get your family information and remaining families 
    async componentDidMount() {
        await this.props.getFamily({
            email: this.props.auth.user.email
        }).then( () => {
            this.setState({
                family: this.props.family.family
            })
        })

        this.socket.emit('family_init', {
            members: this.props.family.family.members
        })
        this.socket.on('family_start', (msg) => {
            this.setState((state) => ({
              chat: [...state.chat, ...msg.list],
            }), this.scrollToBottom)
          })

        this.socket.on('family_chat', (pushedMessage) => {
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
                this.socket.emit('family', {
                  name: this.state.name,
                  content: this.state.content,
                  members: this.props.family.family.members,
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
        if (!this.props.family) {
            const chat = document.getElementById('chat')
            chat.scrollTop = chat.scrollHeight
        }
      }

    render() {
        
        const { family } = this.props.family
        const { memberObjects } = family
        const { user } = this.props.auth

        return(
            <div style={{  }} className="container">
                {
                            !family ? 
                    (
                        <div id="message-header" style={{ height: "100vh"  }}className="message-header-row row">
                            <div className="col s12 center-align">
                                <h4>
                                    <b> Hello, </b>  {this.props.auth.user.name}
                                </h4>
                                <p className=" grey-text text-darken-1">
                                    You have not yet been matched, please check back again later.
                                </p>
                            </div>
                        </div>
                     ) : 
                (<>
                    <div id="message-header" className="message-header-row row">
                        <div className="col s12 center-align">
                            <h4>
                                <b>Welcome to your Family Dashboard </b>  
                                <p className="flow-text grey-text text-darken-1">
                                </p>
                            </h4>
                        </div>
                    </div>
                    <div className="row">     
                        <div>
                            <div className="col m6 family-div" style={{ height: "50vh"}}>
                                <div className="col s12 center-align ">                                
                                    <div style={{ paddingTop: '30px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                                        { memberObjects.map((data, indx) => {
                                            return (
                                                data.headshotURL ? (
                                                    <img 
                                                        src={data.headshotURL} 
                                                        className="family-image" 
                                                        alt="profile" 
                                                        style={{padding: '5px'}}
                                                        key={indx}
                                                    />
                                                ) : (
                                                    <img 
                                                        src={ProfilePicture} 
                                                        className="family-image" 
                                                        alt="profile" 
                                                        style={{padding: '5px'}}
                                                        key={indx}
                                                    />
                                                )
                                            )   
                                        })}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col m6 family-div" style={{ height: "50vh"}}>
                                <div className="col s12 center-align">
                                    <div>
                                        <h4> {family.name}</h4>
                                    </div>
                                </div>
                                <div className="col s12">
                                    <div className="left-align">
                                        <h5>Members</h5>
                                        { memberObjects.map((data, indx) => {
                                            if (data.email !== this.props.auth.user.email) {
                                                return (
                                                    <p key={indx} className="flow-text grey-text text-darken-1"> 
                                                        {data.name} ({data.ACE})
                                                    </p> 
                                                )
                                            }
                                            return (
                                                <p className="flow-text grey-text text-darken-1" key={indx}> 
                                                    You ({user.ACE})
                                                </p> 
                                            )
                                        })}
                                        <h5>Created on: </h5>
                                            <p className="flow-text grey-text text-darken-1">
                                                {family.time}
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col s12 center-align family-picture-container" style={{marginBottom: '30px'}}>
                            <h4>
                                <b> ACE Family Pictures </b>  
                                <p className="flow-text grey-text text-darken-1">
                                </p>
                            </h4>
                        </div>
                        {   family.pictures.length > 0 ? (
                            family.pictures.map((data, indx) => {
                                return (
                                    <div key={indx} id="family-picture-border" className="col s6">
                                        <div className="family-picture">
                                            <img src={
                                                data.filepath 
                                            } className="ace-image" alt="profile" />
                                            <p className="grey-text text-darken-1">
                                                {data.caption}
                                            </p>
                                            <p className="grey-text text-darken-1">
                                                <b>From: </b> {data.email} <br/> {data.time}
                                            </p>
                                        </div>
                                        
                                    </div>
                                )
                            })) :
                            <div>
                                <div className="col s12 center-align">
                                    <p className="flow-text grey-text text-darken-1">
                                        No family have been uploaded yet.
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="row">
                        <div className="col s12 center-align family-picture-container" style={{marginBottom: '30px'}}>
                            <h4>
                                <b> Family Group Chat </b>  
                                <p className="flow-text red-text text-darken-1">
                                </p>
                            </h4>
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
                                                    onChange={this.onChange}
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
                                                    marginBottom: "100px",
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
                </>) 
                }
            </div>
       )
    }
}

Family.propTypes = {
    auth: PropTypes.object.isRequired,
    family: PropTypes.object.isRequired,
    getFamily: PropTypes.func.isRequired,
  }
const mapStateToProps = state => ({
    auth: state.auth,
    family: state.family,
    message: state.message
})
export default connect(mapStateToProps, { getFamily })(Family)