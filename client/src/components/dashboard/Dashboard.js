import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CardProfile from '../CardProfile'
import Pagination from '../pagination/Pagination'
import { logoutUser } from '../../actions/authActions'
import ProfileImage from '../../images/profile.png'

import '../../styles/Dashboard.css'

class Dashboard extends Component {
    constructor(props) {
        super(props)
            this.state = {
                currentMatches: []
            }
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
                        <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
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
                </div>
            </div>
            <div className="row dash-match-container" style={{ paddingBottom: '150px'}}>
                <div className="messages-message center-align">
                    <h5> Message your matches! </h5>
                </div>
                <div className="">
                    <Pagination totalRecords={user.matches.length} pageLimit={3} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                </div>
                <div className="card-container">
                    { this.state.currentMatches.map((data, indx) => (
                        <CardProfile data={data} key={indx}/>
                    ))}
                </div>        
            </div>
            <div className="row">
                <div className="events-container">
                    <h4>
                        Community Spotlight
                    </h4>
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