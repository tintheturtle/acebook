import React  from 'react'
import ProfileImage from '../images/profile.png'
import 'whatwg-fetch'
import openSocket from 'socket.io-client'
import { useHistory } from 'react-router-dom'

import '../styles/CardProfile.css'

const socket = openSocket('http://localhost:8000')

const CardProfile = ({data}) => {

    let history = useHistory()

    const onSend = () => {
        socket.emit('example_message', 'demo')
        let path = '/messages'
        history.push(path)
    }

    return (
        <div className="card-div">
            <div className="card-info">
                <img src={ProfileImage} className="match-image" alt="profile" />
                <p className="match-name match-info"> {data.name} </p>
                <p className="match-email match-info"> {data.email} </p> 
                <p className="match-percentage match-info"> {(data.percentage.toPrecision(4) * 100).toString().substring(0,5)}% match</p>
                <button 
                    className="btn btn-med waves-effect waves-light hoverable light-blue accent-3"
                    onClick={() => onSend()}
                    >
                    Message!
                </button>
            </div>
            
        </div>
    )
}

export default CardProfile