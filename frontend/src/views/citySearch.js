import React, { Component } from 'react'
import { homedir } from 'os'
import PageBar from './pagebar.js'
import '../css/city/style.scss'
import '../css/city/bootstrap.min.css'
import '../css/city/simple-line-icons.css'
import '../css/city/font-awesome.min.css'

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

class CitySearch extends Component{
    constructor (props) {
        super(props)
        let pathName = window.location.pathname.split("/");
        this.state = {searchWord : pathName[pathName.length - 1], cities : {}, hasMounted : 0};
    }

    componentDidMount(){
        fetch('https://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/cities/search/'  + this.state.searchWord)
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
              </div>
            </section>
          </div>
        </div>
        )
      }catch{}
      return <div></div>
    }
    
}

export default CitySearch