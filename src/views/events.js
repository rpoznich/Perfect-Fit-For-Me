import React, { Component } from 'react';
import { homedir } from 'os';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import '../css/city/style.scss';
import '../css/city/bootstrap.min.css';
import '../css/city/simple-line-icons.css';
import '../css/city/font-awesome.min.css';
import EventInstance from './eventsInstance.js';

class EventListing extends Component{
    constructor(props){
        super(props);
        this.state = {}
        if(this.props.status == "completed" || this.props.status == "ended"){
            this.state.circleColor = "featured-rating";
        } else if(this.props.status == "live"){
            this.state.circleColor = "featured-rating-green";
        } else {
            this.state.circleColor = "featured-rating-orange";
        }
    }
    render(){
        return (<div class="featured-place-wrap">
                            <a href={"/events/"+this.props.id}>
                            <img src={""+ this.props.logo} height="200" width="100" alt="#"></img>
                            <div className="container">
                                <span className={this.state.circleColor} title="Status">{}</span>
                            </div>
                            <div class="featured-title-box">
                                <h6 >{this.props.name}</h6>
                                <p>{this.props.organizer}</p> 
                                    {/* <span>• </span>
                                    <p>3 Reviews</p> <span> • </span> */}
                                <ul>
                                    <li><span class="icon-location-pin"></span>
                                        <p>{this.props.venue}</p>
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
        this.isListing = true;
        if(typeof props.match.params.id != 'undefined')
        {
            this.isListing = false;
            this.id = props.match.params.id;
        }
        this.state = 
        {
            "events":
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
            this.state.events = data.events;
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
        for(let id in this.state.events)
        {
            components.push( <div className="col-md-4 featured-responsive"><EventListing id={id} {...this.state.events[id]}/></div>)
        }
        return(
            <div className="cities">
            <div className="main" style={{marginTop: "10vh"}}>
    <section class="main-block light-bg">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="styled-heading">
                        <h3>Featured Events</h3>
                    </div>
                </div>
            </div>
            <div class="row">
                {components}
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="featured-btn-wrap">
                        <a href="" class="btn btn-danger">VIEW ALL</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
             </div>
             </div>
        )
        }else{
            return (<div className="main" style={{marginTop: "20vh"}}> 
                <EventInstance {...this.state.events[this.id]}></EventInstance>
            </div>);
        }
    }
}
export default Event;