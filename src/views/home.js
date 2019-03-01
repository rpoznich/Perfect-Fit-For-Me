import React, { Component } from 'react';
import { homedir } from 'os';


class Home extends Component {
    constructor(props)
    {
        super(props);
    }
    

    render()
    {
        return(
            <div className="main" style={{marginTop: "20vh"}}>
                    <div className="container">
                    <h1>this is the homepage</h1>
                    </div>
             </div>
        )
    }
}

export default Home;
