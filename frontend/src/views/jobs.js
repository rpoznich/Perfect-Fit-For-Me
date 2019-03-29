import React, { Component } from 'react'
import { homedir } from 'os'
import '../css/city/style.scss'
import '../css/city/bootstrap.min.css'
import '../css/city/simple-line-icons.css'
import '../css/city/font-awesome.min.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import PageBar from './pagebar.js'
class JobListing extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let titles = this.props['job title'].split(" ")
    let type = titles[titles.length-1]
    return (
      <div class='featured-place-wrap'>
        <a href={'/jobInstance/' + this.props.id}>
          {/* <img src={""+ this.props.image} height="200" width="100"></img> */}
          {/* <div className="container">
                                <span className={this.state.circleColor} title="Overall Rating">{this.props.overall_rating / 10.0}</span>
                            </div> */}
          <div class='featured-title-box'>
            <h6>{this.props['job title']}</h6>
            {/* <p>Restaurant </p> <span>• </span>
                                <p>3 Reviews</p> <span> • </span> */}
            {/* <p><span>{this.state.highlightedDS}</span>{this.state.unhighlightedDS}</p> */}
            <ul>
              <li>
                <span class='icon-location-pin' />
                <p>{this.props.location.city + ', ' + this.props.location.state}</p>
              </li>
              {/* <li>
                <span />
                <p>{this.props.company}</p>
              </li> */}
              {/* <li>
                <span />
                <p>{type}</p>
              </li> */}
              {/* <li>
                <span />
                <p>{this.props.time}</p>
              </li> */}
            </ul>
            {/* <div class="bottom-icons">
                                    <span class="ti-heart"></span>
                                    <span class="ti-bookmark"></span>
                                </div> */}
          </div>
        </a>
      </div>
    )
  }
}
class Jobs extends Component {
  constructor(props) {
    super(props)
    this.isListing = true
    // If is an instance?
    let pathName = window.location.pathname.split("/");
    if (pathName.includes('jobInstance')) {
      this.isListing = false
      this.pos = parseInt(pathName[pathName.length-1]) - 1
    }else{
      this.pageNumber = parseInt(pathName[pathName.length-1]) - 1;
    }
    this.state = 
    {
        "events": [],
        "jobs": [],
        hasMounted : 0
    }
    fetch('http://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/events').then(response => { //change this to actual API
      return response.json();
    }).then(data => {
      // Work with JSON data here
      this.state.events = data;
      this.state.hasMounted = 1;
      this.setState(this.state);
    }).catch(err => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });
    fetch('http://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/jobs').then(response => { //change this to actual API
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
  // componentDidMount() {
  //   fetch('http://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/events').then(response => { //change this to actual API
  //     return response.json();
  //   }).then(data => {
  //     // Work with JSON data here
  //     this.state.events = data;
  //     this.state.hasMounted = 1;
  //     this.setState(this.state);
  //   }).catch(err => {
  //     // Do something for an error here
  //     console.log("Error Reading data " + err);
  //   });
  //   fetch('http://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/jobs').then(response => { //change this to actual API
  //     return response.json();
  //   }).then(data => {
  //     // Work with JSON data here
  //     this.state.jobs = data["Jobs"];
  //     this.state.hasMounted = 1;
  //     this.setState(this.state);
  //   }).catch(err => {
  //     // Do something for an error here
  //     console.log("Error Reading data " + err);
  //   });
  // }
  render() {
    if (this.isListing) {
      let components = [];
      let count = 1;
      let indivComp = [];
      for (let pos in this.state.jobs) {
        if(count % 10 !== 0){
        indivComp.push(
          <div className='col-md-4 featured-responsive'>
            <JobListing {...this.state.jobs[pos]} />
          </div>
        )
        }else{
          components.push(indivComp);
          indivComp = [];
        }
        ++count;
      }
      return (
        <div className='cities'>
          <div className='main' style={{ marginTop: '10vh' }}>
            <section class='main-block light-bg'>
              <div class='container'>
                <div class='row justify-content-center'>
                  <div class='col-md-5'>
                    <div class='styled-heading'>
                      <h3>Featured Jobs</h3>
                    </div>
                  </div>
                </div>
                <div class='row'>{components[this.pageNumber]}</div>
                {/* <div class='row justify-content-center'>
                  <div class='col-md-4'>
                    <div class='featured-btn-wrap'>
                      <a href='#' class='btn btn-danger'>
                        VIEW ALL
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>
              <PageBar numPages={452} model='/jobs/'></PageBar>
            </section>
          </div>
        </div>
      )
    } else {
      let job = {}
      let eventID = []
      let eventNames = []
      console.log(this.state.jobs)
      console.log(this.state.hasMounted)
      if(this.state.hasMounted === 1){
        console.log("pls...")
        job = this.state.jobs[this.pos]
        // ACTUALLY GET NEARBY EVENTS USING THIS.STATE.EVENTS
        for(let pos in this.state.events){
          let equals = job.location.city.toUpperCase() === this.state.events[pos].city.toUpperCase();
          if(equals){
              let dict = this.state.events[pos]
              eventID.push(dict.eventid); 
              eventNames.push(dict.name)
          }
          if(eventID.length >= 3){
            break;
          }
        }
      }
      let items = []
      for(let pos in eventID){
        items.push(
          <a href={'/eventInstance/' + eventID[pos]}>{eventNames[pos]}
            <br />
          </a>
        );
      }
      return (
        <div className='main' id='target' style={{ margin: '20vh' }}>
          <div class='container'>
            <div class='row'>
              <div class='col-md-8 mb-5'>
                <h2>Job: {job['job title']}</h2>
                <hr />
                <p>{job.description}</p>
                <a class='btn btn-primary btn-lg' >
                  Apply now! &raquo;
                </a>
              </div>
              <div class='col-md-4 mb-5'>
                <h2>More Info</h2>
                <hr />
                <address>
                  {/* <strong>{job.company}</strong>
                  <br />
                  {job.type}
                  <br />
                  {job.location}
                  <br />
                  Updated {job.time}
                  <br />
                  <br /> */}
                  <strong>Learn More About the City of</strong>
                  <br />
                  <a href={'/cityInstance/' + job.location.city}>{job.location.city + ' '}</a>
                  <br />
                  {job.location.state}
                  <br />
                  <br />
                  <strong>Nearby Events</strong>
                  <br />
                  {items}
                  <br />
                  <strong>Average Annual Salary</strong>
                  <br />
                  {('$' + job['annual salary']).replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ','
                          )}
                </address>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
export default Jobs
