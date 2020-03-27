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
        console.log(family)

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
                <div className="row">
                    {this.state.family.toString()}
                </div>
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