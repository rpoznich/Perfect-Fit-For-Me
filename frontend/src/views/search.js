import React, { Component } from 'react'
import { homedir } from 'os'
import PageBar from './pagebar.js'
import '../css/city/style.scss'
import '../css/city/bootstrap.min.css'
import '../css/city/simple-line-icons.css'
import '../css/city/font-awesome.min.css'

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
    let top_cities = {}
    let top_city = ''
    let job_id = 0
    let job_title = ''
    let education = ''
    try{
      top_cities = this.props["top cities"]
      top_city = top_cities[0]
      job_id = this.props.id
      job_title = this.props["job title"]
      education = this.props["education"]
    }catch{}
    return (
      <div class='featured-place-wrap'>
        <a href={'/jobInstance/' + job_id}>
          <div class='featured-title-box'>
            <h6>{job_title}</h6>
            <p>
              {'Average Income: '}
              <span>{this.state.highlightedDS}</span>
              {this.state.unhighlightedDS}
            </p>
            <p>
              {'Education Requirement: '}
              <span>{education}</span>
            </p>
            <ul>
            <li>
                <span>{'Top City'}</span>
                <span class='icon-location-pin' />
                <p><span>{top_city}</span></p>
              </li>
            </ul>
          </div>
        </a>
      </div>
    )
  }
}

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
                              <ul>
                                  <li><span class="icon-location-pin"></span>
                                      <p>{this.props.city + ', ' + this.props.state}</p>
                                  </li>
                                  <li><span class="icon-link"></span>
                                      <p>{this.props.url}</p>
                                  </li>
                              </ul>
                          </div>
                          </a>
                  </div>)
  }
}

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
      let id_comp = []
      try{
      id_comp = this.props.id.toLowerCase().split(this.props.searchWord.toLowerCase());}catch{}
      let id = []
      let firstInstance = true;
      for(let elems in id_comp){
        if(firstInstance){
          let word = id_comp[elems].toLowerCase();
          let upper = word.substring(0, 1);
          word = word.replace(upper, upper.toUpperCase())
          id.push(
            word
          )
          firstInstance = false;
        }else{
          id.push(id_comp[elems])
        }
        if(elems != id_comp.length - 1){
          if(firstInstance){
            let word = this.props.searchWord.toLowerCase();
            let upper = word.substring(0, 1);
            word = word.replace(upper, upper.toUpperCase())
            id.push(<mark>{word}</mark>)
            firstInstance = false;
          }else{
            id.push(<mark>{this.props.searchWord.toLowerCase()}</mark>)          }
        }
      }
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
              <h6>{id}</h6>
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
              </ul>
            </div>
          </a>
        </div>
      )
    }
  }

class Search extends Component{
    constructor (props) {
        super(props)
        let pathName = window.location.pathname.split("/");
        this.state = {searchWord : pathName[pathName.length - 1], cities : {}, events : {}, jobs : {}, hasMounted : 0};
    }

    componentDidMount(){
        fetch('http://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/cities/search/' + this.state.searchWord)
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
      fetch('http://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/events/search/' + this.state.searchWord)
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
      fetch('http://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/jobs/search/' + this.state.searchWord)
      .then(response => {
        // change this to actual API
        return response.json()
      })
      .then(data => {
        // Work with JSON data here
        // this.state.events = data.events;
        // this.state.jobs = data.jobs;
        this.state.jobs = data;
        this.state.hasMounted = 1
        this.setState(this.state)
      })
      .catch(err => {
        // Do something for an error here
        console.log('Error Reading data ' + err)
      })
    }

    render(){
      let components = [];
      let indivComp = [];
      for (let id in this.state.cities) {
          indivComp.push(
              <div className='col-md-4 featured-responsive'>
                <CityListing searchWord={this.state.searchWord} id={id} {...this.state.cities[id]} />
              </div>
          )
        }
      components.push(indivComp)
      
      let eventIndivComp = []
      let eventComp = []
      for (let eid in this.state.events) {
          eventIndivComp.push(
              <div className='col-md-4 featured-responsive'>
                <EventListing {...this.state.events[eid]} />
              </div>
          )
        }
      eventComp.push(eventIndivComp);

      let jobIndivComp = []
      let jobComp = []
      for(let jid in this.state.jobs){
        jobIndivComp.push(<div className='col-md-4 featured-responsive'>
        <JobListing {...this.state.jobs[jid]} />
      </div>)
      jobComp.push(jobIndivComp);
      }
      try{
        return(
          <div className='cities'>
          <div className='main' style={{ marginTop: '10vh' }}>
            <section class='main-block light-bg'>
              <div class='container'>
                <div class='row justify-content-center'>
                  <div class='col-md-5'>
                    <div class='styled-heading'>
                      <h3>{'City Results for ' + this.state.searchWord}</h3>
                    </div>
                  </div>
                </div>
                <div class='row'>{components[0]}</div>
                <div class='styled-heading'>
                      <h3>{'Event Results for ' + this.state.searchWord}</h3>
                </div>
                <div class='row'>{eventComp[0]}</div>
                <div class='styled-heading'>
                      <h3>{'Job Results for ' + this.state.searchWord}</h3>
                </div>
                <div class='row'>{jobComp[0]}</div>
              </div>
            </section>
          </div>
        </div>
        )
      }catch{}
      return <div></div>
    }
    
}

export default Search