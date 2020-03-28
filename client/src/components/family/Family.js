import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getFamily } from '../../actions/familyActions'

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

        return(
            <div style={{ height: "100vh" }} className="container">
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
                            <div className="col m6" style={{ background: '#ffb0cd', height: "50vh"}}>
                                <div className="col s12 center-align">                                
                                    <div>
                                        { memberObjects.map((data, indx) => {
                                            if (data.email !== this.props.auth.user.email) {
                                                return (
                                                    <h5 key={indx}> {data.name} </h5> 
                                                )
                                            }
                                            return ''
                                    
                                        })}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col m6" style={{ background: '#ffb0cd', height: "50vh"}}>
                                <div className="col s12 center-align">
                                    <div>
                                        { memberObjects.map((data, indx) => {
                                            if (data.email !== this.props.auth.user.email) {
                                                return (
                                                    <h5 key={indx}> {data.name} </h5> 
                                                )
                                            }
                                            return ''
                                    
                                        })}
                                    </div>
                                </div>
                            </div>
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