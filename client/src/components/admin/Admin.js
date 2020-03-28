import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { createFamily } from '../../actions/familyActions'

class Admin extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            name: '',
            subject: '',
            message: '',
            errors: {}
        }
    }

    async componentDidMount() {
        // Check to see if they have the correct permissions
    }

    componentDidUpdate(prevProps) {
        if (prevProps.errors !== this.props.errors) {
            console.log(this.state.errors)
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    onSubmitCreate = e => {

        const newFamily = {
            email: this.state.email,
            name: this.state.name,
        }

        this.props.createFamily(newFamily)

    }

    render() {
        
        const { user } = this.props.auth
        const { errors } = this.state

        return(
            <div style={{ height: "100vh" }} className="container">
                <div id="message-header" className="message-header-row row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey there,</b> {user.name}
                            <p className="flow-text grey-text text-darken-1">
                                Welcome to the Admin Dashboard  
                            </p>
                        </h4>
                    </div>
                </div>
                <div className="row">

                    <div className="col m6">
                        <div className="col s12 center-align">
                            <h5>
                                Create Family
                            </h5>
                        </div>
                        <form noValidate onSubmit={this.onSubmitCreate}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email || errors.emailnotfound
                                    })}
                                />
                                <label htmlFor="email">Email List</label>
                                <span className="red-text">
                                    {errors.email}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                onChange={this.onChange}
                                value={this.state.name}
                                error={errors.name}
                                id="name"
                                type="text"
                                className={classnames("", {
                                    invalid: errors.name
                                  })}
                                />
                                <label htmlFor="password">Family Name</label>
                                <span className="red-text">
                                  {errors.name}
                                </span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                    >
                                    Create
                                </button>
                            </div>
                            <span className="red-text">
                                  {errors.family}
                            </span>
                        </form>
                    </div>

                <div className="col m6" style={{ }}>
                    <div className="col s12 center-align">
                            <h5>
                                Send Announcement
                            </h5>
                        </div>
                        <form noValidate onSubmit={this.onSubmitCreate}>
                            <div className="input-field col s12">
                                <input
                                onChange={this.onChange}
                                value={this.state.subject}
                                error={errors.subject}
                                id="subject"
                                type="text"
                                className={classnames("", {
                                    invalid: errors.subject 
                                  })}
                                />
                                <label htmlFor="email">Subject</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                onChange={this.onChange}
                                value={this.state.message}
                                error={errors.message}
                                id="message"
                                type="text"
                                className={classnames("", {
                                    invalid: errors.message 
                                  })}
                                />
                                <label htmlFor="password">Message</label>
                                <span className="red-text">
                                  {errors.message}
                                </span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    disabled={true}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                    >
                                    Send
                                </button>
                            </div>
                            <span className="red-text">
                                  {errors.notFound}
                                </span>
                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}

Admin.propTypes = {
    auth: PropTypes.object.isRequired,
    createFamily: PropTypes.func.isRequired
  }
const mapStateToProps = state => ({
    auth: state.auth,
    message: state.message,
    family: state.family,
})
export default connect(mapStateToProps, { createFamily })(Admin)