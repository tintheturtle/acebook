import React, { Component } from 'react'
import openSocket from 'socket.io-client'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from "classnames"
import 'whatwg-fetch'


const socket = openSocket('http://localhost:8000')

class Messages extends Component {
    constructor() {
        super()
        this.state = {
            message: ""
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }
    
    onMessage = (e) => {

        const { user } = this.props.auth
        const { other } = this.props.message

        const username = user.name
        const othername = other.name

        socket.emit('messaging', { username, othername  })

    }
    render() {

        console.log(this.state)

        const { user } = this.props.auth
        const { other } = this.props.message
        return (
            <div style={{ height: "75vh" }} className="container">
                <div id="dashboard-header" className="row">
                    <div className="col s12 center-align">
                        <h4>
                        <b>You are messaging: </b>  {other.name.split(" ")[0]}
                        <p className="flow-text grey-text text-darken-1">
                            Who is a {other.ACE} and whose email is {other.email}
                        </p>
                        </h4>
                    </div>
                </div>
                <div>
                <div className="input-field col s12">
                                <input
                                onChange={this.onChange}
                                value={this.state.message}
                                id="message"
                                type="text"
                                className={classnames("")}
                                />
                                <label htmlFor="password">Message</label>
                </div>
                <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        onClick={this.onMessage}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                        Message
                        </button>
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
