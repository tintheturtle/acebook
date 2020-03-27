import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Family extends Component {

    // Scoreboard
    // Component did mount get your family information and remaining families 

    render() {
        return(
            <div style={{ height: "75vh" }} className="container">
                <div id="message-header" className="message-header-row row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Welcome to the Family Dashboard </b>  
                            <p className="flow-text grey-text text-darken-1">
                            </p>
                        </h4>
                    </div>
                </div>
            </div>
        )
    }
}

Family.propTypes = {
    auth: PropTypes.object.isRequired
  }
const mapStateToProps = state => ({
    auth: state.auth,
    message: state.message
})
export default connect(mapStateToProps)(Family)