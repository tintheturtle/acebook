import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
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

export default Navbar