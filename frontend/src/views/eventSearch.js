import React, { Component } from 'react'
import { homedir } from 'os'
import PageBar from './pagebar.js'
import '../css/city/style.scss'
import '../css/city/bootstrap.min.css'
import '../css/city/simple-line-icons.css'
import '../css/city/font-awesome.min.css'

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

class EventSearch extends Component{
    constructor (props) {
        super(props)
        let pathName = window.location.pathname.split("/");
        this.state = {searchWord : pathName[pathName.length - 1], events : {}, hasMounted : 0};
    }

    componentDidMount(){
      fetch('https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/events/search/' + this.state.searchWord)
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

    render(){
      let eventIndivComp = []
      let eventComp = []
      for (let eid in this.state.events) {
          eventIndivComp.push(
              <div className='col-md-4 featured-responsive'>
                <EventListing {...this.state.events[eid]} searchWord={this.state.searchWord}/>
              </div>
          )
        }
      eventComp.push(eventIndivComp);
      try{
        return(
          <div className='cities'>
          <div className='main' style={{ marginTop: '10vh' }}>
            <section class='main-block light-bg'>
              <div class='container'>
                <div class='styled-heading'>
                      <h3>{'Event Results for ' + this.state.searchWord}</h3>
                </div>
                <div class='row'>{eventComp[0]}</div>
              </div>
            </section>
          </div>
        </div>
        )
      }catch{}
      return <div></div>
    }
    
}

export default EventSearch