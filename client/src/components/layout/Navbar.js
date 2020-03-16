import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <div clsasName="navbar-fixed">
                <nav className="z-depth-o">
                    <div className="nav-wrapper-white">
                        <Link
                            to="/"
                            style={{ 
                                fontFamily: "monospace"
                            }}
                            className="col s5 brand-logo center black-text"
                        >
                            <i className="material-icons"> Code </i>
                            MERN
                        </Link>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar