import React, { Component } from 'react'
import axios from 'axios'

import Pagination from './pagination/Pagination'

class Scoreboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            list: [],
            isLoading: false,
            currentMatches: [],
            leng: 0,
            currentPage: null, 
            totalPages: null
        }
    }

    async componentDidMount() {
        await axios
                .get('/api/family/score')
                .then(res => {
                    this.setState({
                        list: res.data.list,
                        leng: res.data.list.length
                    })
                })
    }

    onPageChanged = data => {
        const allMatches  = this.state.list
        const { currentPage, totalPages, pageLimit } = data    
        const offset = (currentPage - 1) * pageLimit;
        const currentMatches = allMatches.slice(offset, offset + pageLimit)
    
        this.setState({ currentPage, currentMatches, totalPages })
    }

    render() {
        const { currentMatches, currentPage, totalPages, list } = this.state
        const familyLength = list.length

        if (familyLength === 0) return null

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
                    {this.state.isLoading ? (
                        <div>Loading ...</div>
                            ) : (
                            <div className="scorelist" style={{height: '60vh'}}>
                                <div className="pagination-container">
                                    <Pagination totalRecords={familyLength} pageLimit={3} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                                </div>
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
                                {currentMatches.map( (item, index) => (
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
}

export default Scoreboard