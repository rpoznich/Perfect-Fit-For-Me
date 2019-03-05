import React, { Component } from 'react';
import { homedir } from 'os';
import '../css/city/style.scss';
import '../css/city/bootstrap.min.css';
import '../css/city/simple-line-icons.css';
import '../css/city/font-awesome.min.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class JobListing extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return (<div class="featured-place-wrap">
                            <a href={"/jobs/"+this.props.id}>
                            {/* <img src={""+ this.props.image} height="200" width="100"></img> */}
                            {/* <div className="container">
                                <span className={this.state.circleColor} title="Overall Rating">{this.props.overall_rating / 10.0}</span>
                            </div> */}
                            <div class="featured-title-box">
                                <h6 >{this.props.title}</h6>
                                {/* <p>Restaurant </p> <span>• </span>
                                <p>3 Reviews</p> <span> • </span> */}
                                {/* <p><span>{this.state.highlightedDS}</span>{this.state.unhighlightedDS}</p> */}
                                <ul>
                                    <li><span class="icon-location-pin"></span>
                                        <p>{this.props.location}</p>
                                    </li>
                                    <li><span></span>
                                        <p>{this.props.company}</p>
                                    </li>
                                    <li><span></span>
                                        <p>{this.props.type}</p>
                                    </li>
                                    <li><span></span>
                                        <p>{this.props.time}</p>
                                    </li>

                                </ul>
                                {/* <div class="bottom-icons">
                                    <span class="ti-heart"></span>
                                    <span class="ti-bookmark"></span>
                                </div> */}
                                </div>
                                </a>
                    </div>)
    }
}

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
            this.setState(this.state);
          }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
          });
    }

    render()
    {
        if(this.isListing){
        let components = [];
        for(let id in this.state.jobs)
        {
            components.push( <div className="col-md-4 featured-responsive"><JobListing id={id} {...this.state.jobs[id]}/></div>)
        }
        return(
            <div className="cities">
            <div className="main" style={{marginTop: "10vh"}}>
    <section class="main-block light-bg">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="styled-heading">
                        <h3>Featured Jobs</h3>
                    </div>
                </div>
            </div>
            <div class="row">
                {components}
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="featured-btn-wrap">
                        <a href="#" class="btn btn-danger">VIEW ALL</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
             </div>
             </div>
        )
        }else{
            const job = this.state.jobs[this.id]
            if (job == undefined) {
                console.log("undefined!!!!!!!!!!")
                return (<div className="main" style={{margin: "20vh"}}></div>)
            } 
            console.log("DEFINED*****")
            return (
            <div className="main" id="target" style={{margin: "20vh"}}>
                <div class="container">

<div class="row">
  <div class="col-md-8 mb-5">
    <h2>Job: {job.title}</h2>
    <hr/>
    <p>{job.description}</p>
    <a class="btn btn-primary btn-lg" href={job.link}>Apply now! &raquo;</a>
  </div>
  <div class="col-md-4 mb-5">
    <h2>Contact Us</h2>
    <hr/>
    <address>
      <strong>{job.company}</strong>
      <br/>{job.type}
      <br/>{job.location}
      <br/>Updated {job.time}
    </address>
  </div>
</div>
</div>
            </div>
            )
        }
    }
}

export default Jobs;
