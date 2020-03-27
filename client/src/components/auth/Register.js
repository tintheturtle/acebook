import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { registerUser } from "../../actions/authActions"
import classnames from "classnames"
import _ from 'lodash'

import RadioButton from '../Radio/RadioButton'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            description: "",
            ACE: "",
            errors: {},
            introversion: ""
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          })
        }
      }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()

        let concatDesc = ''
        if (this.state.description && this.state.introversion) {
            concatDesc = this.state.introversion + ' ' + this.state.description
        }

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            description: concatDesc,
            ACE: this.state.ACE,
            introversion: this.state.introversion
        }

        console.log(newUser)


        this.props.registerUser(newUser, this.props.history); 
    }

    radioChangeHandler = (event) => {

        this.setState({
            introversion: event.target.value
        });
    }

    aceChangeHandler = (event) => {
        this.setState({
            ACE: event.target.value
        });
    }
    

    render() {
        const { errors } = this.state

        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to
                            home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Register below</b> 
                            </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
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
                                <label htmlFor="name">Name</label>
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames("", {
                                    invalid: errors.email
                                  })}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password
                                  })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                onChange={this.onChange}
                                value={this.state.password2}
                                error={errors.password2}
                                id="password2"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password2
                                  })}
                                />
                                <label htmlFor="password2">Confirm Password</label>
                                <span className="red-text">{errors.password2}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.description}
                                    error={errors.description}
                                    id="description"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.description
                                    })}
                                />
                                <label htmlFor="description"> Describe Yourself </label>
                                <span className="red-text">{errors.description}</span>
                            </div>
                            <div className="col s12 input-field">
                                <p className="" style={{ color: '#9e9e9e'}}>
                                    Type
                                </p>
                                <div className="radio-btn-container" style={{ display: "flex", textAlign: 'center' }}>
                                    <RadioButton 
                                        changed={ this.aceChangeHandler } 
                                        id="3" 
                                        error={errors.ACE}
                                        isSelected={ this.state.ACE === "big" } 
                                        label="Big" 
                                        value="big" 
                                    />
                                    <RadioButton 
                                        changed={ this.aceChangeHandler } 
                                        id="4" 
                                        error={errors.ACE}
                                        isSelected={ this.state.ACE === "little" } 
                                        label="Little" 
                                        value="little" 
                                    />
                                </div>
                                <span className="red-text">{errors.ACE}</span>
                            </div>
                            <div className="col s12 input-field">
                                <p className="" style={{ color: '#9e9e9e'}}>
                                    Introvert/Extrovert
                                </p>
                                <div className="radio-btn-container" style={{ display: "flex", textAlign: 'center' }}>
                                    <RadioButton 
                                        changed={ this.radioChangeHandler } 
                                        id="1" 
                                        isSelected={ this.state.introversion === "Introvert" } 
                                        label="Introvert" 
                                        value="Introvert" 
                                    />
                                    <RadioButton 
                                        changed={ this.radioChangeHandler } 
                                        id="2" 
                                        isSelected={ this.state.introversion === "Extrovert" } 
                                        label="Extrovert" 
                                        value="Extrovert" 
                                    />
                                </div>
                                <span className="red-text">{errors.introversion}</span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem",
                                        marginBottom: '1rem'
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                Sign up
                                </button>
                                
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                { 
                                    !_.isEmpty(this.state.errors) ?  
                                        <span className="red-text" style={{ paddingTop: '20px'}}>One or more fields above has an error</span> 
                                        : 
                                        ''
                                }
                            </div>       
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))