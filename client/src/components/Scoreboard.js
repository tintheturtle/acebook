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
        <div className="container" style={{ height: "100vh"  }}>
            <div id="message-header" className="message-header-row row">
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
                    <div >
                        <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}> 
                            <div className="col s3">
                                <p className="flow-text grey-text text-darken-1">
                                    Family Name
                                </p>
                            </div>
                            <div className="col s3">
                                <p className="flow-text grey-text text-darken-1">
                                    Members
                                </p>
                            </div>
                            <div className="col s3">
                                <p className="flow-text grey-text text-darken-1">
                                    Score
                                </p>
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
    )
}   

export default Scoreboard