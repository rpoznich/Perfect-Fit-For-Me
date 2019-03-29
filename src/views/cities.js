import React, { Component } from 'react'
import { homedir } from 'os'
import '../css/city/style.scss'
import '../css/city/bootstrap.min.css'
import '../css/city/simple-line-icons.css'
import '../css/city/font-awesome.min.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import CityInstance from './cityInstance.js'
import PageBar from './pagebar.js'

class CityListing extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.state.overall = 0
    let count = 0;
    for(let quals in this.props.qualities){
      ++count;
      this.state.overall += this.props.qualities[quals];
    }
    this.state.overall /= count;
    this.state.overall *= 10;
    this.state.overall = Math.round(this.state.overall);
    if (this.state.overall < 40.0) {
      this.state.circleColor = 'featured-rating'
    } else if (this.state.overall >= 70.0) {
      this.state.circleColor = 'featured-rating-green'
    } else {
      this.state.circleColor = 'featured-rating-orange'
    }
    this.state.highlightedDS = ''
    this.state.unhighlightedDS = ''
    let bound = Math.ceil(this.props.qualities['Cost of Living'] / 2)
    for (let i = 0; i < bound; ++i) {
      this.state.highlightedDS += '$'
    }
    for (let j = 0; j < 5 - this.state.highlightedDS.length; ++j) {
      this.state.unhighlightedDS += '$'
    }
  }

  render () {
    return (
      <div class='featured-place-wrap'>
        <a href={'/cityInstance/' + this.props.id}>
          <img src={'' + this.props.images.web} height='200' width='100' alt='#' />
          <div className='container'>
            <span className={this.state.circleColor} title='Overall Rating'>
              {this.state.overall / 10}
            </span>
          </div>
          <div class='featured-title-box'>
            <h6>{this.props.id}</h6>
            {/* <p>Restaurant </p> <span>• </span>
                                <p>3 Reviews</p> <span> • </span> */}
            <p>
              <span>{this.state.highlightedDS}</span>
              {this.state.unhighlightedDS}
            </p>
            <ul>
              <li>
                <span class='icon-location-pin' />
                <p>{this.props.location.state}</p>
              </li>
              {/* <li><span class="icon-screen-smartphone"></span>
                                        <p>+44 20 7336 8898</p>
                                    </li>
                                    <li><span class="icon-link"></span>
                                        <p>https://burgerandlobster.com</p>
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

class Cities extends Component {
  constructor (props) {
    super(props)
    this.isListing = true
    this.pageNumber = 0;
    // If is an instance?
    let pathName = window.location.pathname.split("/");
    if (pathName.includes('cityInstance')) {
      this.isListing = false
      this.id = props.match.params.id
    }else{
      this.pageNumber = parseInt(pathName[pathName.length-1]) - 1;
    }
    this.state = {
      cities: {}, events: {}, hasMounted : 0
    }
  }

  componentDidMount () {
    fetch('../statics/cities.json')
      .then(response => {
        // change this to actual API
        return response.json()
      })
      .then(data => {
        // Work with JSON data here
        // this.state.events = data.events;
        // this.state.jobs = data.jobs;
        this.state.cities = data;
        this.state.hasMounted = 1
        this.setState(this.state)
      })
      .catch(err => {
        // Do something for an error here
        console.log('Error Reading data ' + err)
      })
      fetch('http://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/events')
      .then(response => {
        // change this to actual API
        return response.json()
      })
      .then(data => {
        // Work with JSON data here
        // this.state.events = data.events;
        // this.state.jobs = data.jobs;
        this.state.events = data;
        this.state.hasMounted = 1
        this.setState(this.state)
      })
      .catch(err => {
        // Do something for an error here
        console.log('Error Reading data ' + err)
      })
      fetch('http://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/jobs')
      .then(response => {
        // change this to actual API
        return response.json()
      })
      .then(data => {
        // Work with JSON data here
        // this.state.events = data.events;
        // this.state.jobs = data.jobs;
        this.state.jobs = data["Jobs"];
        this.state.hasMounted = 1
        this.setState(this.state)
      })
      .catch(err => {
        // Do something for an error here
        console.log('Error Reading data ' + err)
      })
  }

  render () {
    if (this.isListing) {
      let components = [];
      let count = 1;
      let indivComp = [];
      for (let id in this.state.cities) {
        if(count % 10 !== 0){  
          indivComp.push(
              <div className='col-md-4 featured-responsive'>
                <CityListing id={id} {...this.state.cities[id]} />
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
                      <h3>Featured Places</h3>
                    </div>
                  </div>
                </div>
                <div class='row'>{components[this.pageNumber]}</div>
                {/* <div class='row justify-content-center'>
                  <div class='col-md-4'>
                    <div class='featured-btn-wrap'>
                      <a href='' class='btn btn-danger'>
                        VIEW ALL
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>
              <PageBar numPages={8} model='/cities/'></PageBar>
            </section>
          </div>
        </div>
      )
    } else {
            let city = this.id;
            let jobID = []
            let jobNames = []
            let eventID = []
            let eventNames = []
            for(let jobs in this.state.jobs){
                let location = this.state.jobs[jobs].location.city;
                let equals = location.toUpperCase() === city.toUpperCase();
                if(equals){
                    jobID.push(this.state.jobs[jobs].id);
                    jobNames.push(this.state.jobs[jobs]['job title'])
                }
            }
            for(let eve in this.state.events){
                let location = this.state.events[eve].city;
                let equals = false;
                if(location != null){
                  equals = location.toUpperCase() === city.toUpperCase();
                }
                if(equals){
                    eventID.push(this.state.events[eve].eventid);
                    eventNames.push(this.state.events[eve].name);
                }
            }
      return (
        <div className='main' style={{ marginTop: '20vh' }}>
          <CityInstance {...this.state.cities[this.id]} hasMounted={this.state.hasMounted} id={this.id} jobID={jobID} jobNames={jobNames} eventID={eventID} eventNames={eventNames}/>
        </div>
      )
    }
  }
}

export default Cities
