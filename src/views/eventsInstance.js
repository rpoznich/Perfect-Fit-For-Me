import React, { Component } from 'react'
import { homedir } from 'os'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

class EventInstance extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='main' id='target' style={{ margin: '20vh' }}>
        <div class='container'>
          <div class='row'>
            <div class='col-md-8 mb-5'>
              <h2>{this.props.name}</h2>
              <hr />
              <div class='col-lg-32 mb-4'>
                <div class='card shadow mb-4'>
                  <div class='card-header py-3'>
                    <h6 class='m-0 font-weight-bold text-primary'>
                      Illustrations
                    </h6>
                  </div>
                  <div class='card-body'>
                    <div class='text-center'>
                      <img
                        class='img-fluid px-3 px-sm-4 mt-3 mb-4'
                        style={{ width: '100%' }}
                        src={this.props.logo}
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
              <p>{this.props.description}</p>
              <a class='btn btn-primary btn-lg' href={this.props.url}>
                Get A Ticket! &raquo;
              </a>
            </div>
            <div class='col-md-4 mb-5'>
              <h2>Info</h2>
              <hr />
              <address>
              <strong>Location</strong>
                <br />
                {this.props.venue}
                <br />
                {this.props.organizer}
                <br />
                <br />
                <strong>Status</strong>
                <br />
                {this.props.status}
                <br />
                <br />
                <strong>Date and Time</strong>
                <br />
                {this.props.start + " -"}
                <br />
                {this.props.end}
              </address>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default EventInstance
