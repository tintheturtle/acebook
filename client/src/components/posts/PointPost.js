import React from 'react'

import './Posts.css'

const PointPost = ({data}) => {
    return (
        <div className="profilepic-container" style={{alignContent: 'center', display: 'inline-block'}}>
            <div>
                <img 
                    src={data.imagePath} 
                    alt="familypicture"
                    className="ace-image"
                />
            </div>
            <span className="grey-text">{data.timestamp}</span>
            <div className="post-info">
                The {data.uploader} family has received +5 points!
            </div>
        </div>
    )
}

export default PointPost