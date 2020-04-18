import React, { Component } from 'react'
import axios from 'axios'

import Pagination from './pagination/Pagination'
import ProfilePicture from './posts/ProfilePicture'
import SpotlightPost from './posts/SpotlightPost'
import EventPost from './posts/EventPost'
import PointPost from './posts/PointPost'

import './posts/Posts.css'

class Scoreboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            familyList: [],
            isLoading: false,
            currentFamilies: [],
            listLength: 0,
            currentPage: null, 
            totalPages: null,
            posts: [],
            postPer: 1,
            postPage: 1,
        }
        this.handleScroll = this.handleScroll.bind(this)
    }

    async componentDidMount() {
        // Axios call to get list of scores from backend
        await axios
                .get('/api/family/score')
                .then(res => {
                    this.setState({
                        familyList: res.data.list,
                        listLength: res.data.list.length
                    })
                })
        await axios
                .get('/api/feed/posts', {
                    params: {
                      postPer: this.state.postPer
                    }
                  })
                .then(res => {
                    this.setState({
                        posts: res.data.posts,
                    })
                })
        window.addEventListener("scroll", this.handleScroll, false)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", 
            this.handleScroll, false)
    }

    // Pagination method for calculating current page of scoreboard
    onPageChanged = data => {
        const allFamilies  = this.state.familyList
        const { currentPage, totalPages, pageLimit } = data    
        // Pagination calculations
        const offset = (currentPage - 1) * pageLimit;
        const  currentFamilies = allFamilies.slice(offset, offset + pageLimit)
        // Setting states for pagination 
        this.setState({ currentPage,  currentFamilies, totalPages })
    }

    loadPosts = async () => {
        await axios
                .get('/api/feed/posts', {
                    params: {
                      postPer: this.state.postPer
                    }
                  })
                .then(res => {
                    this.setState({
                        posts: res.data.posts,
                        scrolling: false,
                    })
                })
    }

    loadMore = async () => {

        if (this.state.postPer < 5) {
            this.setState({
                postPage: this.state.postPage + 1,
                postPer: this.state.postPer + 1,
                scrolling: true
            })
            this.loadPosts()
        }
      }

    handleScroll = () => { 
        var lastChild = document.querySelector("div.postscontainer > div.post-container:last-child")
        var lastChildOffset = lastChild.offsetTop + lastChild.clientHeight
        var pageOffset = window.pageYOffset + window.innerHeight
        if (pageOffset > lastChildOffset) {
             this.loadMore()
        }
    }

    renderSwitch(props) {
        switch(props.purpose) {
            case 'profilePicture':
                return <ProfilePicture data={props} />
            case 'event':
                return <EventPost data={props} />
            case 'points':
                return <PointPost data={props} />
            case 'spotlight':
                return <SpotlightPost data={props} />
            default:
                return 'No purpose detected'
        }
    }

    render() {
        const { currentFamilies, familyList } = this.state
        const familyLength = familyList.length

        if (familyLength === 0) return null

        return (
            <div id="outerPostContainer" className="container" style={{ paddingBottom: '100px', paddingTop: '50px'  }}>
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
                    <div className=" row" >
                    {this.state.isLoading ? (
                        <div>Loading ...</div>
                            ) : (
                            <div className="scorelist">
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
                                { currentFamilies.map( (item, index) => (
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
                <div className="scoreboard-container" style={{ padding: '30px 0px', margin: '50px 0px'}}>
                    <div className="postscontainer">
                        {
                            this.state.posts.map( (post, index ) => (
                                <div key={index} className="post-container" style={{ padding: '30px'}}>
                                    {this.renderSwitch(post)}
                                </div>
                                )
                            )
                        }
                    </div>
                </div>
                
            </div>
        )

    }
}

export default Scoreboard