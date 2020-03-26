import React, { Component } from 'react'
import axios from 'axios';

class FileUpload extends Component {
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null
          }
      }

    onChangeHandler = event => {
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios
            .post("/api/upload", data, { 
                // receive two    parameter endpoint url ,form data
            })
            .then(res => { 
                // then print response status
                console.log(res.statusText)
                })
    }
    
    render() {
        return (
            <div style={{ height: "75vh" }} className="container">
                <div id="message-header" className="message-header-row row">
                    <div className="col s12 center-align" style={{ paddingBottom: '50px' }}>
                        <h4>
                            <b> Welcome to the Upload Test! </b> 
                        </h4>
                    </div>
                    <input type="file" name="file" onChange={this.onChangeHandler}/>
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