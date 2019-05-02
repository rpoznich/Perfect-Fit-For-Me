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
                                <span className={this.state.circleColor} title="Time"></span>
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
        this.states_50 = {
            "AL": "Alabama",
            "AK": "Alaska",
            "AS": "American Samoa",
            "AZ": "Arizona",
            "AR": "Arkansas",
            "CA": "California",
            "CO": "Colorado",
            "CT": "Connecticut",
            "DE": "Delaware",
            "DC": "District Of Columbia",
            "FM": "Federated States Of Micronesia",
            "FL": "Florida",
            "GA": "Georgia",
            "GU": "Guam",
            "HI": "Hawaii",
            "ID": "Idaho",
            "IL": "Illinois",
            "IN": "Indiana",
            "IA": "Iowa",
            "KS": "Kansas",
            "KY": "Kentucky",
            "LA": "Louisiana",
            "ME": "Maine",
            "MH": "Marshall Islands",
            "MD": "Maryland",
            "MA": "Massachusetts",
            "MI": "Michigan",
            "MN": "Minnesota",
            "MS": "Mississippi",
            "MO": "Missouri",
            "MT": "Montana",
            "NE": "Nebraska",
            "NV": "Nevada",
            "NH": "New Hampshire",
            "NJ": "New Jersey",
            "NM": "New Mexico",
            "NY": "New York",
            "NC": "North Carolina",
            "ND": "North Dakota",
            "MP": "Northern Mariana Islands",
            "OH": "Ohio",
            "OK": "Oklahoma",
            "OR": "Oregon",
            "PW": "Palau",
            "PA": "Pennsylvania",
            "PR": "Puerto Rico",
            "RI": "Rhode Island",
            "SC": "South Carolina",
            "SD": "South Dakota",
            "TN": "Tennessee",
            "TX": "Texas",
            "UT": "Utah",
            "VT": "Vermont",
            "VI": "Virgin Islands",
            "VA": "Virginia",
            "WA": "Washington",
            "WV": "West Virginia",
            "WI": "Wisconsin",
            "WY": "Wyoming"
        }
        this.eid = -1
        this.isListing = true
        this.pageNumber = 0
        this.numPages = 0
        this.isCity = false
        this.city = ''
        this.isState = false
        this.currstate = ''
        this.isDur = false
        this.currDur = 1
        this.model_url = '/events/'
        this.title = 'Featured Events'
        this.ascSort = false
        this.descSort = false
        // If is an instance?
        let pathName = window.location.pathname.split("/");
        if (pathName.includes('eventInstance')) {
            this.isListing = false
            this.eid = parseInt(pathName[pathName.length-1]) - 1
        }else {
            console.log(pathName)
            if(pathName.includes('city')){
                this.isCity = true
                this.city = pathName[pathName.length-1].toLowerCase()
                this.model_url = '/events/filter/city/' + this.city + '/';
                this.title = 'Featured Events For ' + this.city
            } else if(pathName.includes('state')){
                this.isState = true
                this.currstate = pathName[pathName.length-1].toUpperCase();
                this.model_url = '/events/filter/state/' + this.currstate + '/';
                this.title = 'Featured Events For ' + this.states_50[this.currstate]
            } else if(pathName.includes('duration')){
                this.isDur = true
                let choice = pathName[pathName.length-1]
                console.log(choice)
                if(choice === '%3C1hour'){
                    this.currDur = 1
                    this.title = 'Featured Events For Duration < 1 hour' 
                } else if(choice === '1-3hours'){
                    this.currDur = 2
                    this.title = 'Featured Events For Duration 1 - 3 hours' 
                } else {
                    this.currDur = 3
                    this.title = 'Featured Events For Duration 4+ hours' 
                }
                this.model_url = '/events/filter/duration/' + choice + '/'
            } else if(pathName.includes('Name=A-Z')){
                this.ascSort = true
                this.model_url = '/events/Name=A-Z/'
                this.title = 'Featured Events - Name A-Z'
                this.pageNumber = parseInt(pathName[pathName.length-1]) - 1 
            } else if(pathName.includes('Name=Z-A')){
                this.descSort = true
                this.model_url = '/events/Name=Z-A/'
                this.title = 'Featured Events - Name Z-A'
                this.pageNumber = parseInt(pathName[pathName.length-1]) - 1
            } else {
                this.pageNumber = parseInt(pathName[pathName.length-1]) - 1
            }
        }
        this.state = 
        {
            "events": [],
            "jobs": [],
            hasMounted : 0,
            city_filter : null,
            state_filter : null,
            dur_filter : null,
            sort : null
        }
    }

    componentDidMount()
    {
        let fetchLocation = 'https://d1u00tbnbhznv0.cloudfront.net/api/events'
        if(this.isCity){
            fetchLocation = 'https://d1u00tbnbhznv0.cloudfront.net/api/events/filter/city/' + this.city + '/'
        } else if(this.isState){
            fetchLocation = 'https://d1u00tbnbhznv0.cloudfront.net/api/events/filter/state/' + this.currstate + '/'
        } else if(this.isDur){
            fetchLocation = 'https://d1u00tbnbhznv0.cloudfront.net/api/events/filter/duration/' + this.currDur+ '/'
        } else if(this.ascSort){
            fetchLocation = 'https://d1u00tbnbhznv0.cloudfront.net/api/events/sort/name'
        } else if(this.descSort){
            fetchLocation = 'https://d1u00tbnbhznv0.cloudfront.net/api/events/desc_sort/name'
        }
        console.log(fetchLocation)
        fetch(fetchLocation).then(response => { //change this to actual API
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
        fetch('https://d1u00tbnbhznv0.cloudfront.net/api/jobs').then(response => { //change this to actual API
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
        let indivComp = [];
        for(let i in this.state.events)
        {
            if(this.isCity || this.isState || this.isDur){
                indivComp.push( <div className="col-md-4 featured-responsive"><EventListing {...this.state.events[i]}/></div>)
            }else{
                if(indivComp.length < 9){
                    indivComp.push( <div className="col-md-4 featured-responsive"><EventListing {...this.state.events[i]}/></div>)
                }else{
                    components.push(indivComp);
                    indivComp = [];
                    indivComp.push( <div className="col-md-4 featured-responsive"><EventListing {...this.state.events[i]}/></div>)
                }
            }
        }
        if(indivComp.length > 0){
            components.push(indivComp);
        }
        let states = []
        for(let key in this.states_50)
        {
            states.push(<option>{key}</option>)
        }
        let pageBar = []
        if(!this.isCity && !this.isState && !this.isDur){
            pageBar.push(<PageBar numPages={49} model={this.model_url}></PageBar>)
        }
        return(
            <div className="cities">
            <div className="main" style={{marginTop: "10vh"}}>
    <section class="main-block light-bg">
        <div class="container">
            <div>
                <input type="text" placeholder="Search Events" className="mr-sm-2" onChange={(e) => this.setState({textInput : e.target.value})}></input>
                <Button href={"/events/search/"+this.state.textInput} type="submit" ariant="outline-primary">Search</Button>
              </div>
              <br/>
            <div className='row justify-content-center'>
            <div className="col-md-3 mb-6">
                <label htmlFor="city">City</label>
                <input type="search" id ="city" className="form-control" placeholder="..." onChange={(e) => this.setState({city_filter : e.target.value})}></input>
                <Button href={"/events/filter/city/"+this.state.city_filter} type="submit" ariant="outline-primary">Filter By City</Button>
            </div>
            <div className="col-md-3 mb-6">
                <label htmlFor="state">State</label>
                <br />
                <select onChange = {(e) => this.setState({state_filter : e.target.value})}>
                    {states}
                </select>
                <br/>
            <Button href={"/events/filter/state/"+this.state.state_filter} type="submit" ariant="outline-primary">Filter By State</Button>
            </div>
            <div className="col-md-3 mb-6">
                <label htmlFor="state">Event Duration</label>
                <br/>
                <select onChange = {(e) => this.setState({dur_filter : e.target.value})}>
                    <option>{null}</option>
                    <option>{'<1hour'}</option>
                    <option>{'1-3hours'}</option>
                    <option>{'>4hours'}</option>
                </select>
                <br/>
            <Button href={"/events/filter/duration/"+this.state.dur_filter} type="submit" ariant="outline-primary">Filter By Duration</Button>
            </div>
            <div className="col-md-3 mb-6">
                <label htmlFor="state">Sort</label>
                <br/>
                <select onChange = {(e) => this.setState({sort : e.target.value})}>
                    <option>{null}</option>
                    <option>{'Name=A-Z'}</option>
                    <option>{'Name=Z-A'}</option>
                </select>
                <br/>
            <Button href={"/events/"+this.state.sort+"/1"} type="submit" ariant="outline-primary">Sort</Button>
            </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="styled-heading">
                        <h3>{this.title}</h3>
                    </div>
                </div>
            </div>
            <div class="row">
                {components[this.pageNumber]}
            </div>
        </div>
        {pageBar}
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
            let eventCity = ''
            try{
            eventCity = this.state.events[this.eid].city
            // let cityID = 0
            // let cityName = '?!?!'
              for(let pos in this.state.jobs){
                  let location = this.state.jobs[pos]['top cities'][0]
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
        }catch{}
            return (<div className="main" style={{marginTop: "20vh"}}> 
                <EventInstance {...this.state.events[this.eid]} hasMounted={this.state.hasMounted} jobID={jobID} jobNames={jobNames}/>
            </div>);
        }
    }
}
export default Event;
