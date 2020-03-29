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
