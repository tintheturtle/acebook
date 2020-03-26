import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CardProfile from '../CardProfile'
import { logoutUser } from '../../actions/authActions'
import ProfileImage from '../../images/profile.png'

import '../../styles/Dashboard.css'

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault()
        this.props.logoutUser()
    }

    onUploadClick = e => {
        this.props.history.push('/upload')
    }

    render() {
        console.log(this.props)

        const { user } = this.props.auth

    return (
        <div style={{ height: "75vh" }} className="container">
            <div id="dashboard-header" className="row">
                <div className="col s12 center-align">
                    <img src={
                            this.props.auth.url ? this.props.auth.url  : ProfileImage 
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
                            marginTop: "1rem"
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
                            marginTop: "1rem"
                        }}
                        onClick={this.onUploadClick}
                        className="btn btn-large waves-effect waves-light hoverable red accent-3"
                    >
                    Upload
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="card-container">
                    { user.matches.map((data, indx) => (
                        <CardProfile data={data} key={indx}/>
                    ))}
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