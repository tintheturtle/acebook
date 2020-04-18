import React  from 'react'
import { useHistory } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'

import { sendMessageTo } from '../actions/messageActions'
import { SEND_MESSAGE_TO } from '../actions/types'
import ExtractInfo from '../utils/ExtractInfo'

import ProfileImage from '../images/profile.png'
import '../styles/CardProfile.css'

const CardProfile = ({data}) => {

    let history = useHistory()

    const dispatch = useDispatch()
 
    const onSend = () => {
        dispatch({
            type: SEND_MESSAGE_TO,
            payload: data
        })
        let path = '/messages'
        history.push(path)
    }

    const otherInfo = ExtractInfo(data.description)

    return (
        <div className="card-div">
            <div className="card-info">
                <img src={
                            data.headshotURL ? data.headshotURL  : ProfileImage 
                            } className="match-image" alt="profile" />
                <p className="match-name match-info"> <b>{data.name}</b> </p>
                <p className="match-email match-info"> <b>Major:</b><br/> {otherInfo[1][2]}, <br/> Class of {otherInfo[1][1]}</p> 
                <p className="match-percentage match-info"> {
                    (data.percentage) ?
                    ((data.percentage.toPrecision(4) * 100).toString().substring(0,5) + '% match') : "" }
                    </p>
                <button 
                    className="message-btn btn btn-med waves-effect waves-light hoverable light-red accent-3"
                    onClick={() => onSend()}
                    >
                    Message!
                </button>
            </div>
            
        </div>
    )
}

const mapStateToProps = state => ({
    message: state.messaging
})

export default connect(mapStateToProps,{ sendMessageTo })(CardProfile)