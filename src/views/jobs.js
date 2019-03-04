import React, { Component } from 'react';
import { homedir } from 'os';

class Jobs extends Component {

    constructor(props)
    {
        super(props);
        this.isListing = true;
        if(typeof props.match.params.id != 'undefined')
        {
            this.isListing = false;
            this.id = props.match.params.id;
        }
        this.state = 
        {
            "jobs":
            {

            }
        }
    }

    componentDidMount()
    {
        fetch('../statics/data.json').then(response => { //change this to actual API
            return response.json();
          }).then(data => {
            // Work with JSON data here
            this.state.jobs = data.jobs
          }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
          });
    }
    
    
    render()
    {
        if(this.isListing)
        {
            return(
                <div className="main" style={{marginTop: "20vh"}}>
                    <div className="container">
                        <h1>Find Jobs</h1>
                        <hr />
                        <div className="input-group col-md-12">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Zipcode</span>
                            </div>
                            <input type="text" className="form-control"/>
                            <h4 className="ml-3 mr-3">- or -</h4>
                            <div className="input-group-prepend">
                                <span className="input-group-text">City</span>
                            </div>
                            <input type="text" className="form-control"/>
                            <select className="ml-3">
                                <option>State</option>
                                <option>TX</option>
                                <option>CA</option>
                            </select>
                        </div>
                        <button className="btn btn-primary m-3 col-md-1">Search</button>  
                        <h2 style={{marginTop: 1 + "em"}}>3 results found:</h2> 
                        <div className="card-deck">
                            <div className="card">
                                <img class="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22309%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20309%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16937b69c28%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16937b69c28%22%3E%3Crect%20width%3D%22309%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.04999923706055%22%20y%3D%2296.6%22%3E309x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image cap"/>
                                <div class="card-body">
                                    <a href="#"><h5 class="card-title">Job 1</h5></a>
                                    <ul>
                                        <li>Attribute</li>
                                        <li>Attribute</li>
                                        <li>Attribute</li>
                                        <li>Attribute</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card">
                                <img class="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22309%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20309%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16937b69c28%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16937b69c28%22%3E%3Crect%20width%3D%22309%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.04999923706055%22%20y%3D%2296.6%22%3E309x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image cap"/>
                                <div class="card-body">
                                    <h5 class="card-title">Job 2</h5>
                                    <ul>
                                        <li>Attribute</li>
                                        <li>Attribute</li>
                                        <li>Attribute</li>
                                        <li>Attribute</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card">
                                <img class="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22309%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20309%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16937b69c28%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16937b69c28%22%3E%3Crect%20width%3D%22309%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.04999923706055%22%20y%3D%2296.6%22%3E309x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image cap"/>
                                <div class="card-body">
                                    <h5 class="card-title">Job 3</h5>
                                    <ul>
                                        <li>Attribute</li>
                                        <li>Attribute</li>
                                        <li>Attribute</li>
                                        <li>Attribute</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else 
        {
            return ( <div className="main" style={{marginTop: "20vh"}}> Listing {this.id}</div> )
        }
    }
}

export default Jobs;
