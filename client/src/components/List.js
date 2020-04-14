import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import axios from 'axios'

import Pagination from './pagination/Pagination'
import { getUsers } from '../actions/listActions'
import CardProfile from './CardProfile'

import '../styles/List.css'

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: [],
            currentUsersList: [],
            currentPage: null,
            totalPages: null,
            recentsList: []
        }
    }

    async componentDidMount() {
        await getUsers().then(data => {
            this.setState({
                userList: data.userList
            })
        })

        await axios
            .get('/api/users/update', {
                params: {
                  email: this.props.auth.user.email
                }
              })
            .then(res => {
                this.setState({
                    recentsList: res.data.list.reverse()
                })
            })

    }

    // Pagination method for calculating current page of scoreboard
    onPageChanged = data => {
        const allUsers  = this.state.userList
        const { currentPage, totalPages, pageLimit } = data    
        // Pagination calculations
        const offset = (currentPage - 1) * pageLimit;
        const currentUsersList = allUsers.slice(offset, offset + pageLimit)
        // Setting states for pagination 
        this.setState({ currentPage,  currentUsersList, totalPages })
    }

    onClick = email => {
        console.log('Ive been clicked', email)
    }
    

    render() {
        const { userList, currentUsersList } = this.state
        const { user } = this.props.auth
        if(userList.length === 0) return null

        console.log(this.state.recentsList)

        return(
            <div>
                <div className="container">
                    <div id="list-header" className="row">
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
                        <div className="pagination-container">
                            <Pagination totalRecords={userList.length} pageLimit={6} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                        </div>
                        <div className="card-container">
                            { currentUsersList.map((data, indx) => {
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
                <div id="sticky-left">
                    <div className="sticky">
                    <p className="recent-title"> Recently Messaged:
                    </p>
                    { this.state.recentsList.slice(0,10).map((data, indx) => {
                                    let string = data.split('|')
                                    return (
                                            <button key={indx} id="recent-button" onSubmit={this.onClick(string[0])} style={{ backgroundColor: 'white'}}>
                                                <div id="recent-block" style={{ left: '0' }}>
                                                    <b>{string[1]}</b> 
                                                    <br/>
                                                    <p id="recent-timestamp">
                                                        {string[2]}
                                                        </p>
                                                </div>
                                            </button>
                                    )
                                
                            })
                    }
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