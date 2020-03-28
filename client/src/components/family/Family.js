import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getFamily } from '../../actions/familyActions'
import '../../styles/Family.css'

class Family extends Component {
    constructor(props){
        super(props)
        this.state = {
            family: false
        }
    }

    // Scoreboard
    // Component did mount get your family information and remaining families 
    async componentDidMount() {
        await this.props.getFamily({
            email: this.props.auth.user.email
        })
        this.setState({
            family: this.props.family.family
        })
    }

    render() {
        
        const { family } = this.props.family
        const { memberObjects } = family
        const { user } = this.props.auth

        return(
            <div style={{  }} className="container">
                {
                            !family ? 
                    (
                        <div id="message-header" className="message-header-row row">
                            <div className="col s12 center-align">
                                <h4>
                                    <b> Hello, </b>  {this.props.auth.user.name}
                                </h4>
                                <p className="flow-text grey-text text-darken-1">
                                    You have not yet been matched, please check back again later.
                                </p>
                            </div>
                        </div>
                     ) : 
                (<>
                    <div id="message-header" className="message-header-row row">
                        <div className="col s12 center-align">
                            <h4>
                                <b>Welcome to your Family Dashboard </b>  
                                <p className="flow-text grey-text text-darken-1">
                                </p>
                            </h4>
                        </div>
                    </div>
                    <div className="row">
                        
                        <div>
                            <div className="col m6 family-div" style={{ height: "50vh"}}>
                                <div className="col s12 center-align ">                                
                                    <div>
                                        { memberObjects.map((data, indx) => {
                                            if (data.email !== this.props.auth.user.email) {
                                                return (
                                                    <h5 key={indx}> {data.email} </h5> 
                                                )
                                            }
                                            return ''
                                    
                                        })}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col m6 family-div" style={{ height: "50vh"}}>
                                <div className="col s12 center-align">
                                    <div>
                                        <h4> {family.name}</h4>
                                    </div>
                                </div>
                                <div className="col s12">
                                    <div className="left-align">
                                        <h5>Members</h5>
                                        { memberObjects.map((data, indx) => {
                                            if (data.email !== this.props.auth.user.email) {
                                                return (
                                                    <p key={indx} className="flow-text grey-text text-darken-1"> 
                                                        {data.name} ({data.ACE})
                                                    </p> 
                                                )
                                            }
                                            return (
                                                <p className="flow-text grey-text text-darken-1" key={indx}> 
                                                    You ({user.ACE})
                                                </p> 
                                            )
                                        })}
                                        <h5>Created on: </h5>
                                            <p className="flow-text grey-text text-darken-1">
                                                {family.time}
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col s12 center-align family-picture-container" style={{marginBottom: '30px'}}>
                            <h4>
                                <b> ACE Family Pictures </b>  
                                <p className="flow-text grey-text text-darken-1">
                                </p>
                            </h4>
                        </div>
                        {   family.pictures.length > 0 ? (
                            family.pictures.map((data, indx) => {
                                return (
                                    <div key={indx} className="family-picture col s6">
                                        <img src={
                                            data.filepath 
                                        } className="family-image" alt="profile" />
                                        <p className="grey-text text-darken-1">
                                            {data.caption}
                                        </p>
                                        <p className="grey-text text-darken-1">
                                            <b>From: </b> {data.email} on {data.time}
                                        </p>
                                    </div>
                                )
                            })) :
                            <div>
                                <div className="col s12 center-align">
                                    <p className="flow-text grey-text text-darken-1">
                                        No family have been uploaded yet.
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="row">
                        <div className="col s12 center-align family-picture-container" style={{marginBottom: '30px'}}>
                            <h4>
                                <b> Family Group Chat </b>  
                                <p className="flow-text grey-text text-darken-1">
                                </p>
                            </h4>
                        </div>
                    </div>
                </>) 
                }
            </div>
       )
    }
}

Family.propTypes = {
    auth: PropTypes.object.isRequired,
    family: PropTypes.object.isRequired,
    getFamily: PropTypes.func.isRequired,
  }
const mapStateToProps = state => ({
    auth: state.auth,
    family: state.family,
    message: state.message
})
export default connect(mapStateToProps, { getFamily })(Family)