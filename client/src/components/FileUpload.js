import React, { Component } from 'react'
import axios from 'axios';

import ProfileImage from '../images/profile.png'
import '../styles/Message.css'

class FileUpload extends Component {
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null,
            url: ''
          }
      }

    // Max select number of files 
    maxSelectFile=(event)=>{
        let files = event.target.files
            if (files.length > 1) { 
               const msg = 'Only 1 image can be uploaded at a time.'
               event.target.value = null 
               console.log(msg)
              return false;
          }
        return true;
    }

    // File type validation
    checkMimeType=(event)=>{
        let files = event.target.files 
        let err = ''
        const types = ['image/png', 'image/jpeg']
        if (types.every(type => files[0].type !== type)) {
            err += files[0].type+' is not a supported format\n';
        }
      
       if (err !== '') { 
            event.target.value = null
            console.log(err)
            return false; 
        }
       return true;
    }

    // File size checker
    checkFileSize=(event)=>{
        let files = event.target.files
        let size = 15000 
        let err = ""; 
        if (files[0].size > size) {
            err += files[0].type + ' is too large, please pick a smaller file\n';
        }
        if (err !== '') {
            event.target.value = null
            console.log(err)
            return false
        }  
        return true;  
    }

    // File upload validation
    onChangeHandler = event => {
            // Retrieve file
            var files = event.target.files
            if(this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)){ 
                this.setState({
                selectedFile: files[0],
                url: URL.createObjectURL(files[0])
            })
        }
    }

    // Submission handler and makes request to server
    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios
            .post("/api/upload", data, { 
            })
            .then(res => { 
                console.log(res.statusText)
        })
    }
    
    render() {
        return (
            <div style={{ height: "75vh" }} className="container">
                <div id="message-header" className="message-header-row row">
                    <div className="col s12 center-align" style={{ paddingBottom: '50px' }}>
                        <img src={
                            this.state.url ? this.state.url : ProfileImage 
                            } className="match-image" alt="profile" />
                        <h4>
                            <b> Welcome to the Upload Test! </b> 
                        </h4>
                    </div>
                    <input className="input"  style={{}} type="file" name="file" onChange={this.onChangeHandler}/>
                    <button 
                        type="button" 
                        className="btn btn-success btn-block" 
                        onClick={this.onClickHandler}
                        style={{ marginTop: '20px'}}
                    >
                        Upload
                    </button> 
                </div>
            </div>
        )
    }
}

export default FileUpload