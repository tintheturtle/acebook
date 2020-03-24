import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getUsers } from '../actions/listActions'


class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        console.log(getUsers())
    }
    

    render() {

        const { user } = this.props.auth

        return(
            <div style={{ height: "75vh" }} className="container">
                <div id="dashboard-header" className="row">
                    <div className="col s12 center-align">
                        <h4>
                        <b>Welcome,</b> {user.name.split(" ")[0]}
                        <p className="flow-text grey-text text-darken-1">
                            Meet some new people!
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

List.propTypes = {
    auth: PropTypes.object.isRequired,
  }
  const mapStateToProps = state => ({
    auth: state.auth
  })
export default connect(mapStateToProps)(List)