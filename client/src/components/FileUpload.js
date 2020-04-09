import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'

import ProfileImage from '../images/profile.png'
import RadioButton from '../components/Radio/RadioButton'

import '../styles/Message.css'

class FileUpload extends Component {
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null,
            url: '',
            purpose: 'profilePicture',
            caption: '',
            spotlightPerson: '',
            spotlightCaption: '',
            errors: ''
          }
      }

    // Max select number of files 
    maxSelectFile = (event) => {
        let files = event.target.files
            if (files.length > 1) { 
               const msg = 'Only 1 image can be uploaded at a time.'
               event.target.value = null 
               this.setState({
                   errors: msg
               })
              return false;
          }
        return true;
    }

    // File type validation
    checkMimeType = (event) => {
        let files = event.target.files 
        let err = ''
        const types = ['image/png', 'image/jpeg']
        if (types.every(type => files[0].type !== type)) {
            err += files[0].type+' is not a supported format\n';
        }
      
       if (err !== '') { 
            event.target.value = null
            this.setState({
                errors: err
            })
            return false; 
        }
       return true;
    }

    // File size checker
    checkFileSize= (event) => {
        let files = event.target.files
        let size = 40000 
        let err = ""; 
        if (files[0].size > size) {
            err += files[0].type + ' is too large, please pick a smaller file\n';
        }
        if (err !== '') {
            event.target.value = null
            this.setState({
                errors: err
            })
            return false
        }  
        return true;  
    }

    // File upload validation
    onChangeHandler = event => {
            // Retrieve file
            var files = event.target.files
            this.setState({
                errors: ''
            })
            if(this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)){ 
                this.setState({
                selectedFile: files[0],
                url: URL.createObjectURL(files[0])
            })
        }
    }

    onCaptionChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // Submission handler and makes request to server
    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        data.append('purpose', this.state.purpose)
        data.append('email', this.props.auth.user.email)
        if (this.state.purpose === 'points') {
            data.append('caption', this.state.caption)
        }
        axios
            .post("/api/upload", data)
            .then(res => { 
                this.setState({
                    url: '',
                    selectedFile: null
                })
                this.props.history.push('/dashboard')
        })
    }

    radioChangeHandler = (event) => {
        this.setState({
            purpose: event.target.value
        });
    }
    
    render() {

        return (
            <div style={{ height: "100vh" }} className="container">
                <div id="message-header" className="message-header-row row">
                    <div className="col s12 center-align">
                        <img src={
                            this.state.url ? this.state.url : ProfileImage 
                            } className="match-image" alt="profile" />
                        <h4>
                            <p className="flow-text grey-text text-darken-1">
                                Image Upload Preview
                            </p>
                        </h4>
                    </div>
                    <div style={{ padding: '40px'}}>
                        <div className="col s12 input-field">
                                <p className="" style={{ color: '#9e9e9e', textAlign: 'center'}}>
                                    Image Upload Purpose
                                </p>
                                <div className="radio-btn-container" style={{ display: "flex", textAlign: 'center', margin: 'auto' }}>
                                    <RadioButton 
                                            changed={ this.radioChangeHandler } 
                                            id="1" 
                                            isSelected={ this.state.purpose === "profilePicture" } 
                                            label="Profile Picture" 
                                            value="profilePicture" 
                                    />
                                    <RadioButton 
                                            changed={ this.radioChangeHandler } 
                                            id="2" 
                                            isSelected={ this.state.purpose === "points" } 
                                            label="ACE Points" 
                                            value="points" 
                                    />
                                    <RadioButton 
                                            changed={ this.radioChangeHandler } 
                                            id="3" 
                                            isSelected={ this.state.purpose === "spotlight" } 
                                            label="Spotlight" 
                                            value="spotlight" 
                                    />
                                    <RadioButton 
                                            changed={ this.radioChangeHandler } 
                                            id="4" 
                                            isSelected={ this.state.purpose === "misc" } 
                                            label="Miscellaneous" 
                                            value="misc" 
                                    />
                                </div>
                            </div>
                            {
                                this.state.purpose === 'points' ? 
                                <div className="input-field col s12" style={{ marginTop: '0'}}>
                                    <input
                                        onChange={this.onCaptionChange}
                                        value={this.state.caption}
                                        id="caption"
                                        type="text"
                                        className={classnames("")}
                                    />
                                    <label htmlFor="test">Caption</label>
                                </div> : ''
                            }
                            {
                                this.state.purpose === 'spotlight' ? 
                                <div> 
                                    <div className="input-field col s12" style={{ marginTop: '0'}}>
                                        <input
                                            onChange={this.onCaptionChange}
                                            value={this.state.spotlightPerson}
                                            id="spotlightPerson"
                                            type="text"
                                            className={classnames("")}
                                        />
                                        <label htmlFor="test">Who is this?</label>
                                    </div>
                                    <div className="input-field col s12" style={{ marginTop: '0'}}>
                                        <input
                                            onChange={this.onCaptionChange}
                                            value={this.state.spotlightCaption}
                                            id="spotlightCaption"
                                            type="text"
                                            className={classnames("")}
                                        />
                                        <label htmlFor="test">Reason</label>
                                    </div>
                                </div>
                                 : ''
                            }
                            <input className="input"  style={{}} type="file" name="file" onChange={this.onChangeHandler}/>
                            <button 
                                type="button" 
                                className="btn btn-success btn-block" 
                                onClick={this.onClickHandler}
                                style={{ marginTop: '20px', marginBottom: '20px'}}
                                disabled={this.state.errors}
                            >
                                Upload
                            </button> 
                            <span className="red-text" style={{ }}>{this.state.errors}</span>
                        </div>
                    </div>
            </div>
        )
    }
}

FileUpload.propTypes = {
    auth: PropTypes.object.isRequired
  }
  const mapStateToProps = state => ({
    auth: state.auth
  })
  export default connect(mapStateToProps)(FileUpload)