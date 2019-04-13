import React, { Component } from 'react';
import { homedir } from 'os';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import '../css/city/style.scss';
import '../css/city/bootstrap.min.css';
import '../css/city/simple-line-icons.css';
import '../css/city/font-awesome.min.css';
import EventInstance from './eventsInstance.js';
import PageBar from './pagebar.js'
import Button from 'react-bootstrap/Button'

class EventListing extends Component{
    constructor(props){
        super(props);
        // WHY?
        this.state = {}
        // FIND A BETTER METRIC
        if(this.props.eventid < 33){
            this.state.circleColor = "featured-rating";
        } else if(this.props.eventid > 100){
            this.state.circleColor = "featured-rating-green";
        } else {
            this.state.circleColor = "featured-rating-orange";
        }
    }
    render(){
        return (<div class="featured-place-wrap">
                            <a href={"/eventInstance/"+this.props.eventid}>
                            <img src={""+ this.props.logo} height="200" width="100" alt="#"></img>
                            <div className="container">
                                <span className={this.state.circleColor} title="Status">{}</span>
                            </div>
                            <div class="featured-title-box">
                                <h6 >{this.props.name}</h6>
                                <p>{this.props.venue}</p> 
                                    {/* <span>• </span>
                                    <p>3 Reviews</p> <span> • </span> */}
                                <ul>
                                    <li><span class="icon-location-pin"></span>
                                        <p>{this.props.city + ', ' + this.props.state}</p>
                                    </li>
                                    {/* <li><span class="icon-screen-smartphone"></span>
                                        <p>+44 20 7336 8898</p>
                                    </li> */}
                                    <li><span class="icon-link"></span>
                                        <p>{this.props.url}</p>
                                    </li>
                                </ul>
                                {/*<div class="bottom-icons">
                                    <span class="ti-heart"></span>
                                    <span class="ti-bookmark"></span>
                                </div> */}
                            </div>
                            </a>
                    </div>)
    }
}

class Event extends Component {
    constructor(props)
    {
        super(props);
        this.eid = -1
        this.isListing = true
        this.pageNumber = 0
        this.numPages = 0
        // If is an instance?
        let pathName = window.location.pathname.split("/");
        if (pathName.includes('eventInstance')) {
            this.isListing = false
            this.eid = parseInt(pathName[pathName.length-1]) - 1
        }else {
            this.pageNumber = parseInt(pathName[pathName.length-1]) - 1
        }
        this.state = 
        {
            "events": [],
            "jobs": [],
            hasMounted : 0
        }
    }
    
    componentDidMount()
    {
        fetch('../statics/events.json').then(response => { //change this to actual API
            return response.json();
          }).then(data => {
            // Work with JSON data here
            this.state.events = data;
            this.state.hasMounted = 1;
            this.state.numPages = Math.ceil(this.state.events.length / 9);
            this.setState(this.state);
          }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
          });
        fetch('../statics/jobs.json').then(response => { //change this to actual API
            return response.json();
          }).then(data => {
            // Work with JSON data here
            this.state.jobs = data["Jobs"];
            this.state.hasMounted = 1;
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
        let count = 1;
        let indivComp = [];
        for(let i in this.state.events)
        {
            if(count % 10 !== 0){
                indivComp.push( <div className="col-md-4 featured-responsive"><EventListing {...this.state.events[i]}/></div>)
            }else{
                components.push(indivComp);
                indivComp = [];
            }
            ++count;
        }
        return(
            <div className="cities">
            <div className="main" style={{marginTop: "10vh"}}>
    <section class="main-block light-bg">
        <div class="container">
        <div>
                <input type="text" className="mr-sm-2" onChange={(e) => this.setState({textInput : e.target.value})}></input>
                <Button href={"/search/"+this.state.textInput} type="submit" ariant="outline-primary">Search</Button>
              </div>
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="styled-heading">
                        <h3>Featured Events</h3>
                    </div>
                </div>
            </div>
            <div class="row">
                {components[this.pageNumber]}
            </div>
            {/* <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="featured-btn-wrap">
                        <a href="" class="btn btn-danger">VIEW ALL</a>
                    </div>
                </div>
            </div> */}
        </div>
        <PageBar numPages={49} model='/events/'></PageBar>
    </section>
             </div>
             </div>
        )
        }else{
            console.log(this.eid)
            console.log(typeof this.eid)
            console.log(this.state.events)
            let jobID = []
            let jobNames = []
            if(this.state.hasMounted === 1){
            let eventCity = this.state.events[this.eid].city
            // let cityID = 0
            // let cityName = '?!?!'
            if(eventCity != null){
              for(let pos in this.state.jobs){
                  let location = this.state.jobs[pos].location.city
                  let equals = location.toUpperCase() === eventCity.toUpperCase();
                  if(equals){
                      let dict = this.state.jobs[pos]
                      jobID.push(dict.id); 
                      jobNames.push(dict["job title"])
                  }
                  if(jobID.length >= 3){
                    break;
                  }
              }
            }
        }
            console.log(this.eid)
            return (<div className="main" style={{marginTop: "20vh"}}> 
                <EventInstance {...this.state.events[this.eid]} hasMounted={this.state.hasMounted} jobID={jobID} jobNames={jobNames}></EventInstance>
            </div>);
        }
    }
}
export default Event;
