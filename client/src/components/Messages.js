import React, { Component } from 'react'
import openSocket from 'socket.io-client'
import 'whatwg-fetch'


const socket = openSocket('http://localhost:8000')

class Messages extends Component {
    
    onMessage = (e) => {
        socket.emit('example_message', 'demo')
        

    }


    render() {
        console.log(this.props.location.state)

        return (
            <div style={{ height: "75vh" }} className="container">
                <div id="dashboard-header" className="row">
                    <div className="col s12 center-align">
                        <h4>
                        <b>Hey there,</b> 
                        <p className="flow-text grey-text text-darken-1">
                            You are logged into a full-stack{" "}
                            <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
                        </p>
                        </h4>
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
            </div>
        )
    }
    
}

export default Messages