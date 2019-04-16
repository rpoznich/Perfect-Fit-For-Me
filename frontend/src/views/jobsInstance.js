import React, { Component } from 'react'
import { homedir } from 'os'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

class JobInstance extends Component {
    constructor (props) {
        super(props)
        this.state = {jobs: {}, didMount : 0}
    }

    componentDidMount() {
        fetch('../statics/jobs.json').then(response => { //change this to actual API
      return response.json();
    }).then(data => {
      // Work with JSON data here
      this.state.jobs = (data["Jobs"]);
      this.state.didMount = 1
      this.setState(this.state);
    }).catch(err => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });
    }

render () {
    let annual_salary = 0
    let description = ''
    let job_title = ''
    let top_cities = ''
    let type = ''
    let education = ''
    if(this.state.didMount === 1){
            annual_salary = this.state.jobs[this.props.pos]['annual salary'];
            description = this.state.jobs[this.props.pos].description
            if(description === null){
                description = 'No information was provided for this job posting'
            }
            job_title = this.state.jobs[this.props.pos]['job title'];
            top_cities = this.state.jobs[this.props.pos]["top cities"]
            let parse = job_title.split(" ")
            type = parse[parse.length-1]
            education = this.state.jobs[this.props.pos].education
    let items = []
    let i = 0
    for(let events in this.props.eventID){
      items.push(
        <a href={'/eventInstance/' + this.props.eventID[events]}>{this.props.eventNames[i]}
          <br />
        </a>
      );
      i++
    }
    return (
      <div className='main' id='target' style={{ margin: '20vh' }}>
        <div class='container'>
          <div class='row'>
            <div class='col-md-8 mb-5'>
              <h2>Job: {job_title}</h2>
              <hr />
              <p>{description}</p>
              {/* <a class='btn btn-primary btn-lg' href={''}>
                Apply now! &raquo;
              </a> */}
            </div>
            <div class='col-md-4 mb-5'>
              <h2>More Info</h2>
              <hr />
              <address>
                {/* <strong>{job.company}</strong>
                <br /> */}
                <strong>Type of Position</strong>
                <br />
                {type}
                <br />
                <br />
                <strong>Average Annual Salary</strong>
                <br />
                {('$' + annual_salary).replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ','
                          )}
                <br />
                <br />
                <strong>Education Requirement</strong>
                <br />
                {education}
                <br />
                <br />
                <strong>Learn More About the City of</strong>
                <br />
                <a href={'/cityInstance/' + top_cities[0]}>{top_cities[0] + ' '}</a>
                <br />
                <br />
                <strong>Events Nearby</strong>
                <br />
                {items}
              </address>
            </div>
          </div>
        </div>
      </div>
    ) 
    }else{
        return <div></div>
    }   
  }
}
export default JobInstance
