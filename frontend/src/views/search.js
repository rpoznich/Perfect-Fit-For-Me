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

    let title_comp = []
    try{
    title_comp = job_title.toLowerCase().split(this.props.searchWord.toLowerCase());}catch{}
    let title = []
    let firstInstance = true;
    for(let elems in title_comp){
      if(firstInstance){
        let word = title_comp[elems].toLowerCase();
        let upper = word.substring(0, 1);
        word = word.replace(upper, upper.toUpperCase())
        title.push(
          word
        )
        firstInstance = false;
      }else{
        title.push(title_comp[elems])
      }
      if(elems != title_comp.length - 1){
        if(firstInstance){
          let word = this.props.searchWord.toLowerCase();
          let upper = word.substring(0, 1);
          word = word.replace(upper, upper.toUpperCase())
          title.push(<mark>{word}</mark>)
          firstInstance = false;
        }else{
          title.push(<mark>{this.props.searchWord.toLowerCase()}</mark>)          }
      }
    }

    let education_comp = []
    try{
    education_comp = education.toLowerCase().split(this.props.searchWord.toLowerCase());}catch{}
    let education_ = []
    firstInstance = true;
    for(let elems in education_comp){
      if(firstInstance){
        let word = education_comp[elems].toLowerCase();
        let upper = word.substring(0, 1);
        word = word.replace(upper, upper.toUpperCase())
        education_.push(
          word
        )
        firstInstance = false;
      }else{
        education_.push(education_comp[elems])
      }
      if(elems != education_comp.length - 1){
        if(firstInstance){
          let word = this.props.searchWord.toLowerCase();
          let upper = word.substring(0, 1);
          word = word.replace(upper, upper.toUpperCase())
          education_.push(<mark>{word}</mark>)
          firstInstance = false;
        }else{
          education_.push(<mark>{this.props.searchWord.toLowerCase()}</mark>)          }
      }
    }

        for(let c in top_cities){
            if(top_cities[c].toLowerCase().includes(this.props.searchWord.toLowerCase())){
                top_city = top_cities[c]
            }
        }

    let tc_comp = []
    try{ tc_comp = top_city.toLowerCase().split(this.props.searchWord.toLowerCase());}catch{}
    let tc = []
    firstInstance = true;
    for(let elems in tc_comp){
      if(firstInstance){
        let word = tc_comp[elems].toLowerCase();
        let upper = word.substring(0, 1);
        word = word.replace(upper, upper.toUpperCase())
        tc.push(
          word
        )
        firstInstance = false;
      }else{
        tc.push(tc_comp[elems])
      }
      if(elems != tc_comp.length - 1){
        if(firstInstance){
          let word = this.props.searchWord.toLowerCase();
          let upper = word.substring(0, 1);
          word = word.replace(upper, upper.toUpperCase())
          tc.push(<mark>{word}</mark>)
          firstInstance = false;
        }else{
          tc.push(<mark>{this.props.searchWord.toLowerCase()}</mark>)          }
      }
    }

    let description_comp = ''
    try{
    description_comp = this.props.description.toLowerCase()}catch{}
    let description = []
    if(description_comp.includes(this.props.searchWord)){
      description.push('Description: ...')
      description.push(<mark>{this.props.searchWord}</mark>)
      description.push('...')
    }

    return (
      <div class='featured-place-wrap'>
        <a href={'/jobInstance/' + job_id}>
          <div class='featured-title-box'>
            <h6>{title}</h6>
            <p>
              {'Average Income: '}
              <span>{this.state.highlightedDS}</span>
              {this.state.unhighlightedDS}
            </p>
            <p>
              {'Education Requirement: '}
              <span>{education_}</span>
            </p>
            <ul>
            <li>
                <span>{'Top City'}</span>
                <span class='icon-location-pin' />
                <p><span>{tc}</span></p>
              </li>
              <li>
                  <p>{description}</p>
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
      let name_comp = []
    try{
    name_comp = this.props.name.toLowerCase().split(this.props.searchWord.toLowerCase());}catch{}
    let name = []
    let firstInstance = true;
    for(let elems in name_comp){
      if(firstInstance){
        let word = name_comp[elems].toLowerCase();
        let upper = word.substring(0, 1);
        word = word.replace(upper, upper.toUpperCase())
        name.push(
          word
        )
        firstInstance = false;
      }else{
        name.push(name_comp[elems])
      }
      if(elems != name_comp.length - 1){
        if(firstInstance){
          let word = this.props.searchWord.toLowerCase();
          let upper = word.substring(0, 1);
          word = word.replace(upper, upper.toUpperCase())
          name.push(<mark>{word}</mark>)
          firstInstance = false;
        }else{
          name.push(<mark>{this.props.searchWord.toLowerCase()}</mark>)          }
      }
    }

    let venue_comp = []
    try{
    venue_comp = this.props.venue.toLowerCase().split(this.props.searchWord.toLowerCase());}catch{}
    let venue = []
    firstInstance = true;
    for(let elems in venue_comp){
      if(firstInstance){
        let word = venue_comp[elems].toLowerCase();
        let upper = word.substring(0, 1);
        word = word.replace(upper, upper.toUpperCase())
        venue.push(
          word
        )
        firstInstance = false;
      }else{
        venue.push(venue_comp[elems])
      }
      if(elems != venue_comp.length - 1){
        if(firstInstance){
          let word = this.props.searchWord.toLowerCase();
          let upper = word.substring(0, 1);
          word = word.replace(upper, upper.toUpperCase())
          venue.push(<mark>{word}</mark>)
          firstInstance = false;
        }else{
          venue.push(<mark>{this.props.searchWord.toLowerCase()}</mark>)          }
      }
    }

    let city_comp = []
    try{
    city_comp = this.props.city.toLowerCase().split(this.props.searchWord.toLowerCase());}catch{}
    let city = []
    firstInstance = true;
    for(let elems in city_comp){
      if(firstInstance){
        let word = city_comp[elems].toLowerCase();
        let upper = word.substring(0, 1);
        word = word.replace(upper, upper.toUpperCase())
        city.push(
          word
        )
        firstInstance = false;
      }else{
        city.push(city_comp[elems])
      }
      if(elems != city_comp.length - 1){
        if(firstInstance){
          let word = this.props.searchWord.toLowerCase();
          let upper = word.substring(0, 1);
          word = word.replace(upper, upper.toUpperCase())
          city.push(<mark>{word}</mark>)
          firstInstance = false;
        }else{
          city.push(<mark>{this.props.searchWord.toLowerCase()}</mark>)          }
      }
    }

    let state_comp = []
    try{
    state_comp = this.props.state.toLowerCase().split(this.props.searchWord.toLowerCase());}catch{}
    let state = []
    firstInstance = true;
    for(let elems in state_comp){
      if(firstInstance){
        let word = state_comp[elems].toLowerCase();
        let upper = word.substring(0, 1);
        word = word.replace(upper, upper.toUpperCase())
        state.push(
          word
        )
        firstInstance = false;
      }else{
        state.push(state_comp[elems])
      }
      if(elems != state_comp.length - 1){
        if(firstInstance){
          let word = this.props.searchWord.toLowerCase();
          let upper = word.substring(0, 1);
          word = word.replace(upper, upper.toUpperCase())
          state.push(<mark>{word}</mark>)
          firstInstance = false;
        }else{
          state.push(<mark>{this.props.searchWord.toLowerCase()}</mark>)          }
      }
    }

    let link_comp = []
    try{
    link_comp = this.props.url.toLowerCase().split(this.props.searchWord.toLowerCase());}catch{}
    let link = []
    firstInstance = true;
    for(let elems in link_comp){
      if(firstInstance){
        let word = link_comp[elems].toLowerCase();
        let upper = word.substring(0, 1);
        word = word.replace(upper, upper.toUpperCase())
        link.push(
          word
        )
        firstInstance = false;
      }else{
        link.push(link_comp[elems])
      }
      if(elems != link_comp.length - 1){
        if(firstInstance){
          let word = this.props.searchWord.toLowerCase();
          let upper = word.substring(0, 1);
          word = word.replace(upper, upper.toUpperCase())
          link.push(<mark>{word}</mark>)
          firstInstance = false;
        }else{
          link.push(<mark>{this.props.searchWord.toLowerCase()}</mark>)          }
      }
    }

    let description_comp = ''
    try{
    description_comp = this.props.summary.toLowerCase()}catch{}
    let description = []
    if(description_comp.includes(this.props.searchWord)){
      description.push('Description: ...')
      description.push(<mark>{this.props.searchWord}</mark>)
      description.push('...')
    }

      return (<div class="featured-place-wrap">
                          <a href={"/eventInstance/"+this.props.eventid}>
                          <img src={""+ this.props.logo} height="200" width="100" alt="#"></img>
                          <div className="container">
                              <span className={this.state.circleColor} title="Status">{}</span>
                          </div>
                          <div class="featured-title-box">
                              <h6 >{name}</h6>
                              <p>{venue}</p> 
                              <ul>
                                  <li><span class="icon-location-pin"></span>
                                      <p>{city}  {', '}  {state}</p>
                                  </li>
                                  <li><span class="icon-link"></span>
                                      <p>{link}</p>
                                  </li>
                                  <li>{description}</li>
                              </ul>
                          </div>
                          </a>
                  </div>)
  }
}

class CityListing extends Component {
  constructor (props) {
    super(props)
    this.state = {overall : 0, circleColor : '', highlightedDS: '', unhighlightedDS : ''}
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
    let bound = Math.ceil(this.props.qualities['cost of living'] / 2)
    console.log(bound);
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
    id_comp = this.props.nameId.toLowerCase().split(this.props.searchWord.toLowerCase());}catch{}
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
    let highlightedStateComp = this.props.location.state.toLowerCase().split(this.props.searchWord.toLowerCase());
  let highlightedState = []
  firstInstance = true;
  for(let elems in highlightedStateComp){
    if(firstInstance){
      let word = highlightedStateComp[elems].toLowerCase();
      let upper = word.substring(0, 1);
      word = word.replace(upper, upper.toUpperCase())
      highlightedState.push(
        word
      )
      firstInstance = false;
    }else{
      highlightedState.push(highlightedStateComp[elems])
    }
    if(elems != highlightedStateComp.length - 1){
      if(firstInstance){
        let word = this.props.searchWord.toLowerCase();
        let upper = word.substring(0, 1);
        word = word.replace(upper, upper.toUpperCase())
        highlightedState.push(<mark>{word}</mark>)
        firstInstance = false;
      }else{
        highlightedState.push(<mark>{this.props.searchWord.toLowerCase()}</mark>)          }
    }
  }
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
                <p>{highlightedState}</p>
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
        fetch('https://d1u00tbnbhznv0.cloudfront.net/api/cities/search/' + this.state.searchWord)
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
      fetch('https://d1u00tbnbhznv0.cloudfront.net/api/events/search/' + this.state.searchWord)
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
      fetch('https://d1u00tbnbhznv0.cloudfront.net/api/jobs/search/' + this.state.searchWord)
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
                <CityListing searchWord={this.state.searchWord} nameId={id} {...this.state.cities[id]} />
              </div>
          )
        }
      components.push(indivComp)
      
      let eventIndivComp = []
      let eventComp = []
      for (let eid in this.state.events) {
          eventIndivComp.push(
              <div className='col-md-4 featured-responsive'>
                <EventListing {...this.state.events[eid]} searchWord={this.state.searchWord} />
              </div>
          )
        }
      eventComp.push(eventIndivComp);

      let jobIndivComp = []
      let jobComp = []
      for(let jid in this.state.jobs){
        jobIndivComp.push(<div className='col-md-4 featured-responsive'>
        <JobListing {...this.state.jobs[jid]} searchWord={this.state.searchWord}/>
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