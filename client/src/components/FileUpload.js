import React, { Component } from 'react'

class FileUpload extends Component {

    onChangeHandler=event=>{

        console.log(event.target.files[0])
    
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
                </div>
            </div>
        )
    }
}

export default FileUpload