import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Scoreboard = () => {
    const [data, setData] = useState({list: []})
    const [isLoading, setLoading] = useState(false)

    useEffect( () => {
        setLoading(true)
        const fetchData = async () => {
            const result = await axios.get("/api/family/score")

            setData(result.data)
        }


        fetchData()
        setLoading(false)
    }, [isLoading])

    return (
        <div className="container" style={{ paddingBottom: '100px', paddingTop: '50px'  }}>
            <div className="scoreboard-container">
                <div id="scoreboard-header" className=" row" >
                    <div className="col s12 center-align">
                        <h4>
                            ACE Family Scoreboard
                        </h4>
                        <p className=" grey-text text-darken-1">
                            Keep up to date with family points!
                        </p>
                    </div>
                </div>
                <div>
                {isLoading ? (
                    <div>Loading ...</div>
                        ) : (
                        <div className="scorelist">
                            <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}> 
                                <div className="col s3">
                                    <h4>
                                        Family Name
                                    </h4>
                                </div>
                                <div className="col s3">
                                    <h4>
                                        Members
                                    </h4>
                                </div>
                                <div className="col s3">
                                    <h4>
                                        Score
                                    </h4>
                                </div>    
                            </div>
                            {data.list.map( (item, index) => (
                                <div key={index} className="row" style={{ display: 'flex', flexWrap: 'wrap' }}> 
                                    <div className="col s3">
                                        <p className="flow-text grey-text text-darken-1">
                                            {item.name}
                                        </p>
                                    </div>
                                    <div className="col s3 ">
                                        {item.members.map( (member, index) => (
                                            <p  key={index} className="flow-text grey-text text-darken-1">
                                                {member}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="col s3 ">
                                        <p className="flow-text grey-text text-darken-1">
                                            {item.score}
                                        </p>
                                    </div>
                                </div>
                                )
                            )
                            }
                        </div>
                    )
                }
                </div>
            </div>
            
        </div>
    )
}   

export default Scoreboard