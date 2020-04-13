import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import PropTypes from "prop-types"

import '../../styles/Navbar.css'

class Navbar extends Component {
    render() {

        const { email } = this.props.auth.user

        if (email) {
            return (
                <div className="navbar-fixed">
                    <nav className="z-depth-o" style={{ backgroundColor: "white"}}>
                        <div className="nav-wrapper-white">
                            <Link
                                to="/"
                                style={{ 
                                    fontFamily: "monospace",
                                    paddingLeft: '40px'
                                }}
                                className="brand-logo black-text"
                            >
                                <i className="material-icons"> code </i>
                                ACEBOOK
                            </Link>
                            <ul 
                                id="nav-mobile" 
                                className="right hide-on-med-and-down"
                                style={{
                                    paddingRight: '20px'
                                }}
                            >
                                <li>
                                    <Link
                                        to="/dashboard"
                                        style={{ 
                                            fontFamily: "monospace",
                                            paddingLeft: '40px',
                                            paddingRight: '40px'
                                        }}
                                        className="black-text"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/scoreboard"
                                        style={{ 
                                            fontFamily: "monospace",
                                            paddingLeft: '40px',
                                            paddingRight: '40px'
                                        }}
                                        className="black-text"
                                    >
                                        Scoreboard
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link
                                        to="/public-chat"
                                        style={{ 
                                            fontFamily: "monospace",
                                            paddingLeft: '40px',
                                            paddingRight: '40px'
                                        }}
                                        className="black-text"
                                    >
                                        Public Chat
                                    </Link>
                                </li> */}
                                <li>
                                    <Link
                                        to="/list"
                                        style={{ 
                                            fontFamily: "monospace",
                                            paddingLeft: '40px',
                                            paddingRight: '40px'
                                        }}
                                        className="black-text"
                                    >
                                        Message
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            )
        }

        return (
            <div className="navbar-fixed">
                <nav className="z-depth-o" style={{ backgroundColor: "white"}}>
                    <div className="nav-wrapper-white">
                        <Link
                            to="/"
                            style={{ 
                                fontFamily: "monospace"
                            }}
                            className="col s5 brand-logo center black-text"
                        >
                            <i className="material-icons"> code </i>
                            ACEBOOK
                        </Link>
                    </div>
                </nav>
            </div>
        )
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired
  }
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(Navbar)
