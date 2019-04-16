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
      let id_comp = this.props.id.toLowerCase().split(this.props.searchWord.toLowerCase());
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
        this.state = {searchWord : pathName[pathName.length - 1], cities : {}, hasMounted : 0};
    }

    componentDidMount(){
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
    }

    render(){
      let components = [];
      let indivComp = [];
      for (let id in this.state.cities) {
        if(indivComp.length < 9){  
          indivComp.push(
              <div className='col-md-4 featured-responsive'>
                <CityListing searchWord={this.state.searchWord} id={id} {...this.state.cities[id]} />
              </div>
          )
        }else{
          components.push(indivComp);
          indivComp = [];
          indivComp.push(
            <div className='col-md-4 featured-responsive'>
                <CityListing searchWord={this.state.searchWord} id={id} {...this.state.cities[id]} />
              </div>
          )
        }
      }
        return(
          <div className='cities'>
          <div className='main' style={{ marginTop: '10vh' }}>
            <section class='main-block light-bg'>
              <div class='container'>
                <div class='row justify-content-center'>
                  <div class='col-md-5'>
                    <div class='styled-heading'>
                      <h3>{'Search Results for ' + this.state.searchWord}</h3>
                    </div>
                  </div>
                </div>
                <div class='row'>{components[0]}</div>
              </div>
              <PageBar numPages={9} model='/cities/'></PageBar>
            </section>
          </div>
        </div>
        )
    }
    
}

export default Search