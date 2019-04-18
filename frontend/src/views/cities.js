import React, { Component } from 'react'
import { homedir } from 'os'
import '../css/city/style.scss'
import '../css/city/bootstrap.min.css'
import '../css/city/simple-line-icons.css'
import '../css/city/font-awesome.min.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import CityInstance from './cityInstance.js'
import PageBar from './pagebar.js'
import Button from 'react-bootstrap/Button'

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
    let bound = Math.ceil(this.props.qualities['cost of living'] / 2)
    for (let i = 0; i < bound; ++i) {
      this.state.highlightedDS += '$'
    }
    for (let j = 0; j < 5 - this.state.highlightedDS.length; ++j) {
      this.state.unhighlightedDS += '$'
    }
    console.log(this.state)
  }

  render () {
    return (
      <div class='featured-place-wrap'>
        <a href={'/cityInstance/' + this.props.nameId}>
          <img src={'' + this.props.images.web} height='200' width='100' alt='#' />
          <div className='container'>
            <span className={this.state.circleColor} title='Overall Rating'>
              {this.state.overall / 10}
            </span>
          </div>
          <div class='featured-title-box'>
            <h6>{this.props.nameId}</h6>
            {/* <p>Restaurant </p> <span>• </span>
                                <p>3 Reviews</p> <span> • </span> */}
            <p>
              <span>{this.state.highlightedDS}</span>
              {this.state.unhighlightedDS}
            </p>
            <ul>
              <li>
                <span> {'Cost of Living Rating: '}</span>
                <p>{this.props.qualities["cost of living"]}</p>
              </li>              
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
    this.states_50 = {
      "AL": "Alabama",
      "AK": "Alaska",
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
      "HI": "Hawaii",
      "ID": "Idaho",
      "IL": "Illinois",
      "IN": "Indiana",
      "IA": "Iowa",
      "KS": "Kansas",
      "KY": "Kentucky",
      "LA": "Louisiana",
      "ME": "Maine",
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
    this.isListing = true
    this.pageNumber = 0;
    this.isCol = false
    this.col = 1
    this.isPop = false
    this.pop = 1
    this.isState = false
    this.currState = ''
    this.model_url = '/cities/'
    this.title = 'Featured Cities'
    // If is an instance?
    let pathName = window.location.pathname.split("/");
    if (pathName.includes('cityInstance')) {
      this.isListing = false
      this.id = props.match.params.id
    }else{
      if(pathName.includes('state')){
        this.isState = true
        this.currState = pathName[pathName.length-1]
        this.model_url = '/cities/filter/state/' + this.currState
        this.title = 'Featured Cities in ' + this.currState
      } else if(pathName.includes('pop')) {
        this.isPop = true
        let choice = pathName[pathName.length-1]
        console.log(choice)
        if(choice === '%3E1,000,000'){
          this.pop = 3
          this.title = 'Featured Cities with Population > 1,000,000'
        } else if(choice === '%3C200,000'){
          this.pop = 1
          this.title = 'Featured Cities with Population < 200,000'
        } else {
          this.pop = 2
          this.title = 'Featured Cities with Population Between 200,000 - 1,000,000'
        }
        this.model_url = '/cities/filter/pop/' + choice
      } else if(pathName.includes('col')){
        this.isCol = true
        let choice = pathName[pathName.length-1]
        if(choice === '$'){
          this.col = 1
          this.title = 'Featured Cities with CoL Rating Between 0 - 2'
        } else if(choice === '$$'){
          this.col = 2
          this.title = 'Featured Cities with CoL Rating Between 2 - 4'
        } else if(choice === '$$$'){
          this.col = 3
          this.title = 'Featured Cities with CoL Rating Between 4 - 6'
        } else {
          this.col = 4
          this.title = 'Featured Cities with CoL Rating 6+'
        }
        console.log(choice)
        this.model_url = '/cities/filter/col/' + choice
      } else if (pathName.includes('Name=A-Z')){
            this.ascSort = true
            this.model_url = '/cities/Name=A-Z/'
            this.title = 'Featured Cities - Name A-Z' 
            this.pageNumber = parseInt(pathName[pathName.length-1]) - 1
      } else if(pathName.includes('Name=Z-A')){
            this.descSort = true
            this.model_url = '/cities/Name=Z-A/'
            this.title = 'Featured Cities - Name Z-A' 
            this.pageNumber = parseInt(pathName[pathName.length-1]) - 1
      }else {
        this.pageNumber = parseInt(pathName[pathName.length-1]) - 1;
      }
    }
    this.state = {
      cities: {}, 
      events: {},
      col_filter : null,
      pop_filter : null,
      state_filter : null,
      hasMounted : 0
    }
  }

  componentDidMount () {
    let fetchLocation = 'https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/cities'
    if(this.isCol){
      fetchLocation = 'https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/cities/filter/col/' + this.col
    } else if(this.isPop){
      fetchLocation = 'https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/cities/filter/pop/' + this.pop
    } else if(this.isState){
      fetchLocation = 'https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/cities/filter/state/' + this.currState
    }else if(this.ascSort){
      fetchLocation = 'https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/cities/sort/name'
    }else if(this.descSort){
      fetchLocation = 'https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/cities/desc_sort/name'
    }
    fetch('https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/jobs')
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
    fetch(fetchLocation)
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
      fetch('https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/events')
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
  }

  render () {
    if (this.isListing) {
      let components = [];
      let indivComp = [];
      for (let id in this.state.cities) {
        if(this.isCol || this.isPop || this.isState){
          indivComp.push( <div className="col-md-4 featured-responsive"><CityListing nameId={id} {...this.state.cities[id]}/></div>)
          console.log("HEREERR")
        }else{
          if(indivComp.length < 9){  
            indivComp.push(
                <div className='col-md-4 featured-responsive'>
                  <CityListing nameId={id} {...this.state.cities[id]} />
                </div>
            )
          }else{
            components.push(indivComp);
            indivComp = [];
            indivComp.push(
              <div className='col-md-4 featured-responsive'>
                  <CityListing nameId={id} {...this.state.cities[id]} />
                </div>
            )
          }
        }
      }
      if(indivComp.length > 0){
        components.push(indivComp);
        console.log(components)
      }
      let states = []
      for(let key in this.states_50)
      {
          states.push(<option>{this.states_50[key]}</option>)
      }
      let pageBar = []
      if(!this.isCol && !this.isPop && !this.isState){
          pageBar.push(<PageBar numPages={10} model={this.model_url}></PageBar>)
      }
      return (
        <div className='cities'>
          <div className='main' style={{ marginTop: '10vh' }}>
            <section class='main-block light-bg'>
              <div class='container'>
              <div>
                <input type="text" className="mr-sm-2" onChange={(e) => this.setState({textInput : e.target.value})}></input>
                <Button href={"/cities/search/"+this.state.textInput} type="submit" ariant="outline-primary">Search</Button>
              </div>
              <br/>
              <div className='row justify-content-center'>
              <div className="col-md-3 mb-6">
                <label htmlFor="state">State</label>
                <select onChange = {(e) => this.setState({state_filter : e.target.value})}>
                    {states}
                </select>
              <Button href={"/cities/filter/state/"+this.state.state_filter} type="submit" ariant="outline-primary">Filter By State</Button>
              </div>
              <div className="col-md-3 mb-6">
                <label htmlFor="state">Cost of Living</label>
                <br/>
                <select onChange = {(e) => this.setState({col_filter: e.target.value})}>
                    <option>{null}</option>
                    <option>{'$'}</option>
                    <option>{'$$'}</option>
                    <option>{'$$$'}</option>
                    <option>{'$$$$+'}</option>
                </select>
              <Button href={"/cities/filter/col/"+this.state.col_filter} type="submit" ariant="outline-primary">Filter By Cost of Living</Button>
              </div>
              <div className="col-md-3 mb-6">
                <label htmlFor="state">Population</label>
                <br/>
                <select onChange = {(e) => this.setState({pop_filter: e.target.value})}>
                    <option>{null}</option>
                    <option>{'<200,000'}</option>
                    <option>{'200,000-1,000,000'}</option>
                    <option>{'>1,000,000'}</option>
                </select>
              <Button href={"/cities/filter/pop/"+this.state.pop_filter} type="submit" ariant="outline-primary">Filter By Population</Button>
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
              <Button href={"/cities/"+this.state.sort+"/1"} type="submit" ariant="outline-primary">Sort</Button>
              </div>
              </div>
              <br/>
                <div class='row justify-content-center'>
                  <div class='col-md-5'>
                    <div class='styled-heading'>
                      <h3>{this.title}</h3>
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
              {pageBar}
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
            try{
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
          }catch{}
      return (
        <div className='main' style={{ marginTop: '20vh' }}>
          <CityInstance {...this.state.cities[this.id]} hasMounted={this.state.hasMounted} id={this.id} jobID={jobID} jobNames={jobNames} eventID={eventID} eventNames={eventNames}/>
        </div>
      )
    }
  }
}

export default Cities
