import React  from 'react'
import ProfileImage from '../images/profile.png'
import '../styles/CardProfile.css'

const CardProfile = ({data}) => {
    return (
        <div className="card-div">
            <div className="card-info">
                <img src={ProfileImage} className="match-image" alt="profile" />
                <p className="match-name match-info"> {data.name} </p>
                <p className="match-email match-info"> {data.email} </p> 
                <p className="match-percentage match-info"> {(data.percentage.toPrecision(4) * 100).toString().substring(0,5)}% match</p>
                <button className="btn btn-med waves-effect waves-light hoverable light-blue accent-3">
                    Message!
                </button>
            </div>
            
        </div>
    )
}

export default CardProfile