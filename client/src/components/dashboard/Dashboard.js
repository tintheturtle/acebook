import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'

import CardProfile from '../CardProfile'
import Spotlight from '../Spotlight'
import Event from '../events/Event'
import Pagination from '../pagination/Pagination'
import { logoutUser } from '../../actions/authActions'
import ProfileImage from '../../images/profile.png'

import '../../styles/Dashboard.css'

class Dashboard extends Component {
    constructor(props) {
        super(props)
            this.state = {
                events: [],
                spotlight: [],
                currentMatches: [],
                currentPage: null, 
                totalPages: null
            }
    }

    async componentDidMount() {
        await axios
                .get('/api/users/events')
                .then(res => {
                    this.setState({
                        events: res.data.events
                    })
                })
        await axios
                .get('/api/users/spotlight')
                .then(res => {
                    this.setState({
                        spotlight: res.data.spotlightee
                    })
                })
    }

    onLogoutClick = e => {
        e.preventDefault()
        this.props.logoutUser()
    }

    onUploadClick = e => {
        this.props.history.push('/upload')
    }

    onFamilyClick = e => {
        this.props.history.push('/family')
    }

    onAdminClick = e => {
        this.props.history.push('/admin')
    }

    onPageChanged = data => {
        const allMatches  = this.props.auth.user.matches
        const { currentPage, totalPages, pageLimit } = data
    
        const offset = (currentPage - 1) * pageLimit;
        const currentMatches = allMatches.slice(offset, offset + pageLimit)
    
        this.setState({ currentPage, currentMatches, totalPages })
    }

    render() {
        const { user } = this.props.auth   
    return (
        <div className="container">
            <div id="dashboard-header" className="row">
                <div className="col s12 center-align">
                    <img src={
                            this.props.auth.user.headshotURL ? this.props.auth.user.headshotURL  : ProfileImage 
                            } className="match-image" alt="profile" />
                    <h4>
                    <b>Hey there,</b> {user.name.split(" ")[0]}
                    <p className="flow-text grey-text text-darken-1">
                        You are logged into a full-stack{" "}
                        <span style={{ fontFamily: "monospace" }}>ACEBOOK</span> app 👏
                    </p>
                    </h4>
                    <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            margin: "1rem"
                        }}
                        onClick={this.onLogoutClick}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                    Logout
                    </button>
                    <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            margin: "1rem"
                        }}
                        onClick={this.onUploadClick}
                        className="btn btn-large waves-effect waves-light hoverable red accent-3"
                    >
                    Upload
                    </button>
                    <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            margin: "1rem"
                        }}
                        onClick={this.onFamilyClick}
                        className="btn btn-large waves-effect waves-light hoverable green accent-3"
                    >
                    Family
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="events-container">
                    <h4>
                        Upcoming Events
                    </h4>
                    { 
                        this.state.events.length > 0 ? (
                            this.state.events.map((data, indx) => (
                            <Event data={data} key={indx}/>
                            ))
                        ) :
                        (
                            <div className="row">
                                No upcoming events, check out our <a href="https://www.facebook.com/buvsa/">Facebook</a> page to stay connected with BUVSA! 
                            </div>
                        )
                    }
                </div>
            </div>
            {
                this.props.auth.user.email === 'familyChair@tin.com' ? (
                    <div className="admin-container row">
                        <h4>
                            Admin Functions
                        </h4>
                        <p styles={{padding: '20px'}}>
                            Go to the admin page to make announcements and pair families together. To create an event hit the red upload button above.
                        </p>
                        <div className="center-align">
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    margin: "1rem"
                                }}
                                onClick={this.onAdminClick}
                                className="btn btn-large waves-effect waves-light hoverable accent-3"
                            >
                                Go
                            </button>
                        </div>
                    </div>
                ) : 
            (
            <div className="row dash-match-container" style={{ paddingBottom: '50px'}}>
                <div className="messages-message center-align">
                    <h4> Message your matches! </h4>
                </div>
                {
                    user.matches.length > 0 ? (
                        <div>
                            <div className="pagination-container">
                                <Pagination totalRecords={user.matches.length} pageLimit={3} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                            </div>
                            <div className="card-container">
                                { this.state.currentMatches.map((data, indx) => (
                                    <CardProfile data={data} key={indx}/>
                                ))}
                            </div> 
                        </div>  
                    ) : (
                        <div className="pagination-container">
                            No current matches at the moment, please check back later for updates. 
                        </div>
                    )
                    
                }
            </div>
            )}
            <div className="row">
                <div className="spotlights-container">
                    <h4>
                        Community Spotlight
                    </h4>
                    { 
                        this.state.spotlight.length > 0 ? (
                            this.state.spotlight.map((data, indx) => (
                            <Spotlight data={data} key={indx}/>
                            ))
                        ) : (
                            
                            <div className="row">
                                Not available at the moment, check out our <a href="https://www.facebook.com/buvsa/">Facebook</a> page to stay connected with BUVSA! 
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        )
    }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps,{ logoutUser })(Dashboard)