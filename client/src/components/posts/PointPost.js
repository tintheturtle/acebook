import React from 'react'

import './Posts.css'

const PointPost = ({data}) => {
    return (
        <div className="profilepic-container" >
            <div className="post-type" style={{background: '#CC3399'}}>
                Family Points
            </div>
            <div className="profilepic-content" style={{alignContent: 'center '}}>
                <div className="">
                    <img src={
                        data.imagePath 
                    } className="ace-image" alt="points" />
                    
                </div>
                <span className="grey-text">{data.timestamp}</span>
                <div className="post-info">
                    <b>{data.name}</b>'s family has received +5 points!
                </div>
            </div>
        </div>
    )
}

export default PointPost