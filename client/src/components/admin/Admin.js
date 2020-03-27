import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Admin extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {
        // Check to see if they have the correct permissions
    }

    render() {
        
        const { user } = this.props.auth

        return(
            <div style={{ height: "100vh" }} className="container">
                <div id="message-header" className="message-header-row row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey there,</b> {user.name.split(" ")[0]}
                            <p className="flow-text grey-text text-darken-1">
                                Welcome to the Admin Dashboard  
                            </p>
                        </h4>
                    </div>
                </div>
                <div className="row">
                </div>
            </div>
        )
    }
}

Admin.propTypes = {
    auth: PropTypes.object.isRequired,
  }
const mapStateToProps = state => ({
    auth: state.auth,
    message: state.message
})
export default connect(mapStateToProps)(Admin)