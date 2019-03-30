import React, { Component } from 'react'
import { homedir } from 'os'
import '../css/city/style.scss'
import '../css/city/bootstrap.min.css'
import '../css/city/simple-line-icons.css'
import '../css/city/font-awesome.min.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import JobInstance from './jobsInstance.js'
import PageBar from './pagebar.js'

class JobListing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      highlightedDS : '',
      unhighlightedDS : ''
    }
    this.state.highlightedDS = ''
    this.state.unhighlightedDS = ''
    let salary = this.props["annual salary"]
    if(salary >= 90000) {
      this.state.highlightedDS = '$$$$$'
      this.state.unhighlightedDS = ''
    } else if(salary >= 75000) {
      this.state.highlightedDS = '$$$$'
      this.state.unhighlightedDS = '$'
    } else if(salary >= 50000) {
      this.state.highlightedDS = '$$$'
      this.state.unhighlightedDS = '$$'
    } else if(salary >= 30000) {
      this.state.highlightedDS = '$$'
      this.state.unhighlightedDS = '$$$'
    } else {
      this.state.highlightedDS = '$'
      this.state.unhighlightedDS = '$$$$'
    }
  }
  render () {
    return (
      <div class='featured-place-wrap'>
        <a href={'/jobInstance/' + this.props.id}>
          {/* <img src={""+ this.props.image} height="200" width="100"></img> */}
          {/* <div className="container">
                                <span className={this.state.circleColor} title="Overall Rating">{this.props.overall_rating / 10.0}</span>
                            </div> */}
          <div class='featured-title-box'>
            <h6>{this.props['job title']}</h6>
            <p>
              {'Potential Income: '}
              <span>{this.state.highlightedDS}</span>
              {this.state.unhighlightedDS}
            </p>
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
              </li>
              <li>
                <span />
                <p>{this.props.type}</p>
              </li>
              <li>
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
  constructor (props) {
    super(props)
    this.isListing = true
    this.pos = -1
    this.pageNumber = 0
    this.numPages = 0
    // If is an instance?
    let pathName = window.location.pathname.split("/");
    if (pathName.includes('jobInstance')) {
      this.isListing = false
      this.pos = parseInt(pathName[pathName.length-1]) - 1
    } else {
      this.pageNumber = parseInt(pathName[pathName.length-1]) - 1
    }
    this.state = {
      "events": [],
      "jobs": [],
      hasMounted : 0
    }
  }
  componentDidMount () {
    fetch('../statics/jobs.json').then(response => { //change this to actual API
      return response.json();
    }).then(data => {
      // Work with JSON data here
      this.state.jobs = (data["Jobs"]);
      this.state.hasMounted = 1;
      this.setState(this.state);
    }).catch(err => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });
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
  }
  render () {
    if(this.isListing){
      let components = [];
      let count = 1;
      let indivComp = [];
      for(let i in this.state.jobs)
      {
          if(count % 10 !== 0){
              indivComp.push( <div className="col-md-4 featured-responsive"><JobListing {...this.state.jobs[i]}/></div>)
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
              <PageBar numPages={20} model='/jobs/'></PageBar>
            </section>
          </div>
        </div>
      )
    } else {
      let eventID = []
      let eventNames = []
      let jobCity = 'Austin';
      try{jobCity = (this.state.jobs[this.pos].location.city)
      }catch{}
      for(let i in this.state.events){
          let eventCity = 'Austin'
          try{eventCity = (this.state.events[i].city)
          }catch{}
          let equals = false;
          try{equals = jobCity.toUpperCase() === eventCity.toUpperCase()}catch{}
          if(equals){
            let dict = this.state.events[i]
            eventID.push(dict.eventid)
            eventNames.push(dict.name)
          }
          if(eventID.length >= 3){
            break;
          }
        }
        return (<div className="main" style={{marginTop: "20vh"}}> 
                <JobInstance jobs={this.state.jobs['0']} pos={this.pos} hasMounted={this.state.hasMounted} eventID={eventID} eventNames={eventNames}></JobInstance>
              </div>);
      }
    }
}
export default Jobs