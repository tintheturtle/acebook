import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getUsers } from '../actions/listActions'
import CardProfile from './CardProfile'


class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    async componentDidMount() {
        await getUsers().then(data => {
            this.setState({
                list: data.userList
            })
        })
    }
    

    render() {

        const { user } = this.props.auth

        return(
            <div style={{  }} className="container">
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
                    <div className="card-container">
                        { this.state.list.map((data, indx) => {
                            if (data.email !== user.email) {
                                return (
                                    <CardProfile data={data} key={indx}/>
                                )
                            }
                            return ""
                        })}
                    </div>
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