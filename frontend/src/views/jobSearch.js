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

  class JobSearch extends Component{
    constructor (props) {
        super(props)
        let pathName = window.location.pathname.split("/");
        this.state = {searchWord : pathName[pathName.length - 1], jobs : {}, hasMounted : 0};
    }

    componentDidMount(){
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

export default JobSearch