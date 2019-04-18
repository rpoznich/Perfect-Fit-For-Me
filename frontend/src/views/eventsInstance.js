import React, { Component } from 'react'
import { homedir } from 'os'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

class EventInstance extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    //LIST OF DEFAULT VALS HERE
    let address = ''
    let city = ''
    let end = ''
    let logo = ''
    let name = ''
    let start = ''
    let state = ''
    let summary = ''
    let timezone = ''
    let url = ''
    let venue = ''
    //LIST OF ACTUAL VALS
    if(this.props.hasMounted === 1){
      address = this.props.address
      city = this.props.city
      if(city == null){
        city = 'Online Event!'
      }
      name = this.props.name
      end = this.props.end
      logo = this.props.logo
      start = this.props.start
      state = this.props.state
      if(state == null){
        state = 'Online Event!'
      }
      summary = this.props.summary
      timezone = this.props.timezone
      url = this.props.url
      venue = this.props.venue
    }
    let items = []
    let i = 0
    for(let jobs in this.props.jobID){
      items.push(
        <a href={'/jobInstance/' + this.props.jobID[jobs]}>{this.props.jobNames[i]}
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
              <h2>{name}</h2>
              <hr />
              <div class='col-lg-32 mb-4'>
                <div class='card shadow mb-4'>
                  <div class='card-header py-3'>
                    <h6 class='m-0 font-weight-bold text-primary'>
                      Logo
                    </h6>
                  </div>
                  <div class='card-body'>
                    <div class='text-center'>
                      <img
                        class='img-fluid px-3 px-sm-4 mt-3 mb-4'
                        style={{ width: '100%' }}
                        src={logo}
                        alt=''
                      />
                    </div>
                    {/* <p>Add some quality, svg illustrations to your project courtesy of <a target="_blank" rel="nofollow" href="https://undraw.co/">unDraw</a>, a constantly updated collection of beautiful svg images that you can use completely free and without attribution!</p>
                      <a target="_blank" rel="nofollow" href="https://undraw.co/">Browse Illustrations on unDraw &rarr;</a> */}
                  </div>
                </div>
                {/* <div class="card shadow mb-4">
                    <div class="card-header py-3">
                      <h6 class="m-0 font-weight-bold text-primary">Development Approach</h6>
                    </div>
                    <div class="card-body">
                      <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce CSS bloat and poor page performance. Custom CSS classes are used to create custom components and custom utility classes.</p>
                      <p class="mb-0">Before working with this theme, you should become familiar with the Bootstrap framework, especially the utility classes.</p>
                    </div>
                  </div> */}
              </div>
              <hr />
              <p>{summary}</p>
              <a class='btn btn-primary btn-lg' href={url}>
                Get A Ticket! &raquo;
              </a>
            </div>
            <div class='col-md-4 mb-5'>
              <h2>Info</h2>
              <hr />
              <address>
              <strong>Location</strong>
                <br />
                <a href={'/cityInstance/' + city}>{city}</a>
                <br />
                <br />
              <strong>Jobs Nearby</strong>
                <br/>
                {items}
                <br /> 
                <br />
                <strong>Date and Time</strong>
                <br />
                {start}
                <br />
                {' - '}
                <br />
                {end}
                <br />
                {'Time Zone: ' + timezone}
              </address>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default EventInstance
