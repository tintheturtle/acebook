import React, { useState, useEffect } from 'react'

const Scoreboard = () => {
    const [data, setData] = useState()

    useEffect( () => {
        
    })

    return (
        <div className="container">
            <div id="message-header" style={{ height: "100vh"  }}className="message-header-row row">
                <div className="col s12 center-align">
                    <h4>
                        ACE Family Scoreboard
                    </h4>
                    <p className=" grey-text text-darken-1">
                        Keep up to date with family points!
                    </p>
                </div>
            </div>
        </div>
    )
}   

export default Scoreboard