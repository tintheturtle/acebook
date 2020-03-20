import React  from 'react'
import '../styles/Card.css'
import ProfileImage from '../images/profile.png'

const Card = ({data}) => {
    return (
        <div className="card-div">
            <div className="card-info">
                <img src={ProfileImage} className="match-image" alt="profile" />
                <p className="match-name match-info"> {data.name} </p>
                <p className="match-email match-info"> {data.email} </p> 
                <p className="match-percentage match-info"> {(data.percentage.toFixed(4) * 100).toString()}% match</p>
            </div>
            
        </div>
    )
}

export default Card