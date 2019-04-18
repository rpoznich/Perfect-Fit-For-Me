import React, { Component } from 'react'
import { homedir } from 'os'
import '../css/city/style.scss'
import '../css/city/bootstrap.min.css'
import '../css/city/simple-line-icons.css'
import '../css/city/font-awesome.min.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import JobInstance from './jobsInstance.js'
import PageBar from './pagebar.js'
import Button from 'react-bootstrap/Button'

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
          {/* <img src={""+ this.props.image} height="200" width="100"></img> */}
          {/* <div className="container">
                                <span className={this.state.circleColor} title="Overall Rating">{this.props.overall_rating / 10.0}</span>
                            </div> */}
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
            {/* <p>Restaurant </p> <span>• </span>
                                <p>3 Reviews</p> <span> • </span> */}
            {/* <p><span>{this.state.highlightedDS}</span>{this.state.unhighlightedDS}</p> */}
            <ul>
            <li>
                <span>{'Top City'}</span>
                <span class='icon-location-pin' />
                <p><span>{top_city}</span></p>
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
    this.isLoc = false
    this.loc = ''
    this.isEdu = false
    this.edu = ''
    this.isIncome = false
    this.income = 1
    this.model_url = '/jobs/'
    this.title = 'Featured Jobs'
    this.ascSort = false
    this.descSort = false
    // If is an instance?
    let pathName = window.location.pathname.split("/");
    if (pathName.includes('jobInstance')) {
      this.isListing = false
      this.pos = parseInt(pathName[pathName.length-1]) - 2
    } else {
      if(pathName.includes('loc')){
        this.isLoc = true
        this.loc = pathName[pathName.length-1].toLowerCase()
        this.model_url = '/jobs/filter/loc/' + this.loc
        this.title = 'Featured Jobs In ' + this.loc
      } else if(pathName.includes('income')){
        this.isIncome = true
        let choice = pathName[pathName.length-1]
        if(choice == '$'){
          this.income = 1
          this.title = 'Featured Jobs - Average Income < $30,000'
        } else if(choice == '$$'){
          this.income = 2
          this.title = 'Featured Jobs - Average Income $30,000 - $50,000'
        } else if(choice == '$$$'){
          this.income = 3
          this.title = 'Featured Jobs - Average Income $50,000 - $70,000'
        } else if(choice == '$$$$'){
          this.income = 4
          this.title = 'Featured Jobs - Average Income $70,000 - $90,000'
        } else {
          this.income = 5
          this.title = 'Featured Jobs - Average Income > $90,000'
        }
        this.model_url = '/jobs/filter/income/' + choice
      } else if(pathName.includes('edu')){
        this.isEdu = true
        let choice = pathName[pathName.length-1].toLowerCase()
        if(choice == 'bachelor\'s'){
          this.edu = 'bac'
          this.title = 'Featured Jobs - Bachelor\'s Degree Requirement'
        } else if(choice == 'master\'s'){
          this.edu = 'mas'
          this.title = 'Featured Jobs - Master\'s Degree Requirement'
        } else {
          this.edu = 'phd'
          this.title = 'Featured Jobs - Doctor\'s Degree Requirement'
        }
        this.model_url = '/jobs/filter/edu/' + this.edu
      } else if(pathName.includes('Title=A-Z')){
        this.ascSort = true
        this.model_url = '/jobs/Title=A-Z/'
        this.title = 'Featured Jobs - Title A-Z'
        this.pageNumber = parseInt(pathName[pathName.length-1]) - 1
      } else if(pathName.includes('Title=Z-A')){
        this.descSort = true
        this.model_url = '/jobs/Title=Z-A/'
        this.title = 'Featured Jobs - Title Z-A'
        this.pageNumber = parseInt(pathName[pathName.length-1]) - 1
      } else {
        this.pageNumber = parseInt(pathName[pathName.length-1]) - 1
      }
    }
    this.state = {
      "events": [],
      "jobs": [],
      loc_filter : null,
      income_filter : null,
      edu_filter : null,
      sort : null,
      hasMounted : 0
    }
  }
  componentDidMount () {
    let fetchLocation = 'https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/jobs'
    if(this.isLoc){
      fetchLocation = 'https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/jobs/filter/loc/' + this.loc
    } else if(this.isIncome){
      fetchLocation = 'https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/jobs/filter/income/' + this.income
    } else if(this.isEdu){
      fetchLocation = 'https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/jobs/filter/edu/' + this.edu
    } else if(this.ascSort){
        fetchLocation = 'https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/jobs/sort/job_title'
    } else if(this.descSort){
        fetchLocation = 'https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/jobs/desc_sort/job_title'
    }
    fetch(fetchLocation).then(response => { //change this to actual API
      return response.json();
    }).then(data => {
      // Work with JSON data here
      if(this.ascSort || this.descSort || this.isLoc || this.isIncome || this.isEdu){
        this.state.jobs = data;
      }else {
        this.state.jobs = (data["Jobs"]);
      }
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
      let indivComp = [];
      for(let i in this.state.jobs)
      {
        if(this.isLoc || this.isIncome || this.isEdu){
          indivComp.push( <div className="col-md-4 featured-responsive"><JobListing {...this.state.jobs[i]}/></div>)
        } else {
          if(indivComp.length < 9){
              indivComp.push( <div className="col-md-4 featured-responsive"><JobListing {...this.state.jobs[i]}/></div>)
          }else{
              components.push(indivComp);
              indivComp = [];
          }
        }
      }
      if(indivComp.length > 0){
        components.push(indivComp);
      }
      let pageBar = []
      if(!this.isLoc && !this.isIncome && !this.isEdu){
        pageBar.push(<PageBar numPages={4} model={this.model_url}></PageBar>)
      }
      return (
        <div className='cities'>
          <div className='main' style={{ marginTop: '10vh' }}>
            <section class='main-block light-bg'>
            <div class='container'>
              <div>
                <input type="text" className="mr-sm-2" onChange={(e) => this.setState({textInput : e.target.value})}></input>
                <Button href={"/jobs/search/"+this.state.textInput} type="submit" ariant="outline-primary">Search</Button>
              </div>
            <div className='row justify-content-center'>
              <div className="col-md-3 mb-6">
                <label htmlFor="city">City</label>
                <input type="search" id ="city" className="form-control" placeholder="..." onChange={(e) => this.setState({loc_filter : e.target.value})}></input>
                <Button href={"/jobs/filter/loc/"+this.state.loc_filter} type="submit" ariant="outline-primary">Filter By City</Button>
              </div>
              <div className="col-md-3 mb-6">
                <label htmlFor="state">Income</label>
                <br />
                <select onChange = {(e) => this.setState({income_filter : e.target.value})}>
                    <option>{null}</option>
                    <option>{'$'}</option>
                    <option>{'$$'}</option>
                    <option>{'$$$'}</option>
                    <option>{'$$$$'}</option>
                    <option>{'$$$$$'}</option>
                </select>
                <br/>
                <Button href={"/jobs/filter/income/"+this.state.income_filter} type="submit" ariant="outline-primary">Filter By Income</Button>
              </div>
              <div className="col-md-3 mb-6">
                <label htmlFor="state">Degree Requirement</label>
                <br/>
                <select onChange = {(e) => this.setState({edu_filter : e.target.value})}>
                    <option>{null}</option>
                    <option>{'Bachelor\'s'}</option>
                    <option>{'Master\'s'}</option>
                    <option>{'Doctor\'s'}</option>
                </select>
                <br/>
                <Button href={"/jobs/filter/edu/"+this.state.edu_filter} type="submit" ariant="outline-primary">Filter By Degree</Button>
              </div>
              <div className="col-md-3 mb-6">
                <label htmlFor="state">Sort</label>
                <br/>
                <select onChange = {(e) => this.setState({sort : e.target.value})}>
                    <option>{null}</option>
                    <option>{'Title=A-Z'}</option>
                    <option>{'Title=Z-A'}</option>
                </select>
                <br/>
                <Button href={"/jobs/"+this.state.sort+"/1"} type="submit" ariant="outline-primary">Sort</Button>
              </div>
            </div>
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
                      <a href='#' class='btn btn-danger'>
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
      let eventID = []
      let eventNames = []
      let jobCities = ['Austin']
      try{jobCities = this.state.jobs[this.pos]["top cities"]
      }catch{}
      for(let num = 0; num < 3; num++){
        for(let i in this.state.events){
            let eventCity = 'Austin'
            try{eventCity = (this.state.events[i].city)
            }catch{}
            let equals = false;
            try{equals = jobCities[num].toUpperCase() === eventCity.toUpperCase()}catch{}
            if(equals){
              let dict = this.state.events[i]
              eventID.push(dict.eventid)
              eventNames.push(dict.name)
            }
            if(eventID.length >= 3){
              break;
            }
          }
        }
        return (<div className="main" style={{marginTop: "20vh"}}> 
                <JobInstance jobs={this.state.jobs['0']} pos={this.pos} hasMounted={this.state.hasMounted} eventID={eventID} eventNames={eventNames}></JobInstance>
              </div>);
      }
    }
}
export default Jobs
