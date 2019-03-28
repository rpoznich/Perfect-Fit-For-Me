import React, { Component } from 'react'
import { homedir } from 'os'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import '../css/cityInstance/sb-admin-2.css'
import '../css/cityInstance/sb-admin-2.min.css'
import ListGroup from 'react-bootstrap/ListGroup'

class CityInstance extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let jobItems = []
    for(let jobs in this.props.jobID){
      jobItems.push(<ListGroup.Item><a href={'/jobInstance/' + this.props.jobID[jobs]}>{this.props.jobNames[jobs]}</a></ListGroup.Item>);
    }
    let eventItems = []
    for(let events in this.props.eventID){
      eventItems.push(<ListGroup.Item><a href={'/eventInstance/' + this.props.eventID[events]}>{this.props.eventNames[events]}</a></ListGroup.Item>);
    }
    return (
      <div className='city-instance'>
        <head>
          <meta charset='utf-8' />
          <meta http-equiv='X-UA-Compatible' content='IE=edge' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, shrink-to-fit=no'
          />
          <meta name='description' content='' />
          <meta name='author' content='' />
          <link
            href='vendor/fontawesome-free/css/all.min.css'
            rel='stylesheet'
            type='text/css'
          />
          <link
            href='https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i'
            rel='stylesheet'
          />
          <link
            href='../css/cityInstance/sb-admin-2.min.css'
            rel='stylesheet'
          />
        </head>
        <body id='page-top'>
          <div class='container-fluid'>
            <div class='d-sm-flex align-items-center justify-content-between mb-4'>
              <h1 class='h3 mb-0 text-gray-800'>{this.props.name}</h1>
            </div>
            <div class='row'>
              <div class='col-xl-3 col-md-6 mb-4'>
                <div class='card border-left-primary shadow h-100 py-2'>
                  <div class='card-body'>
                    <div class='row no-gutters align-items-center'>
                      <div class='col mr-2'>
                        <div class='text-xs font-weight-bold text-primary text-uppercase mb-1'>
                          Average Earnings (Monthly)
                        </div>
                        <div class='h5 mb-0 font-weight-bold text-gray-800'>
                          {('$' + this.props.salary).replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ','
                          )}
                        </div>
                      </div>
                      <div class='col-auto'>
                        <i class='fas fa-calendar fa-2x text-gray-300' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class='col-xl-3 col-md-6 mb-4'>
                <div class='card border-left-success shadow h-100 py-2'>
                  <div class='card-body'>
                    <div class='row no-gutters align-items-center'>
                      <div class='col mr-2'>
                        <div class='text-xs font-weight-bold text-success text-uppercase mb-1'>
                          Average Earnings (Annual)
                        </div>
                        <div class='h5 mb-0 font-weight-bold text-gray-800'>
                          {('$' + this.props.salary * 12).replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ','
                          )}
                        </div>
                      </div>
                      <div class='col-auto'>
                        <i class='fas fa-dollar-sign fa-2x text-gray-300' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class='col-xl-3 col-md-6 mb-4'>
                <div class='card border-left-info shadow h-100 py-2'>
                  <div class='card-body'>
                    <div class='row no-gutters align-items-center'>
                      <div class='col mr-2'>
                        <div class='text-xs font-weight-bold text-info text-uppercase mb-1'>
                          Overall Rating
                        </div>
                        <div class='row no-gutters align-items-center'>
                          <div class='col-auto'>
                            <div class='h5 mb-0 mr-3 font-weight-bold text-gray-800'>
                              {Math.round(this.props.overall_rating)}%
                            </div>
                          </div>
                          <div class='col'>
                            <div class='progress progress-sm mr-2'>
                              <div
                                class='progress-bar bg-info'
                                role='progressbar'
                                style={{
                                  width: this.props.overall_rating + '%'
                                }}
                                aria-valuenow='50'
                                aria-valuemin='0'
                                aria-valuemax='100'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class='col-auto'>
                        <i class='fas fa-clipboard-list fa-2x text-gray-300' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class='col-xl-3 col-md-6 mb-4'>
                <div class='card border-left-warning shadow h-100 py-2'>
                  <div class='card-body'>
                    <div class='row no-gutters align-items-center'>
                      <div class='col mr-2'>
                        <div class='text-xs font-weight-bold text-warning text-uppercase mb-1'>
                          Population
                        </div>
                        <div class='h5 mb-0 font-weight-bold text-gray-800'>
                          {('' + this.props.population).replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ','
                          )}
                        </div>
                      </div>
                      <div class='col-auto'>
                        <i class='fas fa-comments fa-2x text-gray-300' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class='row'>
              <div class='col-lg-6 mb-4'>
                <div class='card shadow mb-4'>
                  <div class='card-header py-3'>
                    <h6 class='m-0 font-weight-bold text-primary'>
                      City Stats
                    </h6>
                  </div>
                  <div class='card-body'>
                    <h4 class='small font-weight-bold'>
                      Education{' '}
                      <span class='float-right'>
                        {Math.round(this.props.education * 10) + '%'}
                      </span>
                    </h4>
                    <div class='progress mb-4'>
                      <div
                        class='progress-bar bg-danger'
                        role='progressbar'
                        style={{ width: this.props.education * 10 + '%' }}
                        aria-valuenow='20'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      />
                    </div>
                    <h4 class='small font-weight-bold'>
                      Housing{' '}
                      <span class='float-right'>
                        {Math.round(this.props.housing * 10) + '%'}
                      </span>
                    </h4>
                    <div class='progress mb-4'>
                      <div
                        class='progress-bar bg-warning'
                        role='progressbar'
                        style={{
                          width: Math.round(this.props.housing * 10) + '%'
                        }}
                        aria-valuenow='40'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      />
                    </div>
                    <h4 class='small font-weight-bold'>
                      Cost of Living{' '}
                      <span class='float-right'>
                        {Math.round(this.props.cost_of_living * 10) + '%'}
                      </span>
                    </h4>
                    <div class='progress mb-4'>
                      <div
                        class='progress-bar'
                        role='progressbar'
                        style={{
                          width:
                            Math.round(this.props.cost_of_living * 10) + '%'
                        }}
                        aria-valuenow='60'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      />
                    </div>
                    <h4 class='small font-weight-bold'>
                      Commute{' '}
                      <span class='float-right'>
                        {Math.round(this.props.commute * 10) + '%'}
                      </span>
                    </h4>
                    <div class='progress mb-4'>
                      <div
                        class='progress-bar bg-info'
                        role='progressbar'
                        style={{
                          width: Math.round(this.props.commute * 10) + '%'
                        }}
                        aria-valuenow='80'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      />
                    </div>
                    <h4 class='small font-weight-bold'>
                      Tolerence{' '}
                      <span class='float-right'>
                        {Math.round(this.props.tolerance * 10) + '%'}
                      </span>
                    </h4>
                    <div class='progress'>
                      <div
                        class='progress-bar bg-success'
                        role='progressbar'
                        style={{
                          width: Math.round(this.props.tolerance * 10) + '%'
                        }}
                        aria-valuenow='100'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class='col-lg-6 mb-4'>
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
                        src={this.props.image}
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
            </div>
            <div className='row'>
              <div class='col-lg-6 mb-4'>
                <div class='card shadow mb-4'>
                  <div class='card-header py-3'>
                    <h6 class='m-0 font-weight-bold text-primary'>
                      Events Nearby
                    </h6>
                  </div>
                  <div class='card-body'>
                    <div class='text-center'>
                      <ListGroup variant='flush'>
                        {eventItems}
                      </ListGroup>
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
              <div class='col-lg-6 mb-4'>
                <div class='card shadow mb-4'>
                  <div class='card-header py-3'>
                    <h6 class='m-0 font-weight-bold text-primary'>
                      Jobs Nearby
                    </h6>
                  </div>
                  <div class='card-body'>
                    <div class='text-center'>
                      <ListGroup variant='flush'>
                      {jobItems}
                      </ListGroup>
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
            </div>
          </div>
        </body>
      </div>
    )
  }
}

export default CityInstance
