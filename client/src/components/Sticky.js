import React, { Component } from 'react'
import moment from 'moment'

class Sticky extends Component {

    onClick() {
        console.log('click')
    }

    render() {
        return (
            <div id="sticky-left">
                <div className="sticky">
                    <p className="recent-title"> Recently Messaged:
                    </p>
                    <button id="recent-button" onClick={this.onClick} style={{ backgroundColor: 'white'}}>
                        <div id="recent-block" style={{ left: '0' }}>
                            <b>Euphoria</b> 
                            <br/>
                            <p id="recent-timestamp">
                                {moment().format('LLL')}
                                </p>
                        </div>
                    </button>
                    
                    
                    
                </div>
            </div>
        )
    }
}

export default Sticky