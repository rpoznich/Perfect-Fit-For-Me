import React, { Component } from 'react'
import { homedir } from 'os'
import ryan from './../ryan_poznich.jpeg'
import jonathan from './../jonathan_nguyen.jpg'
import daniel from './../daniel_thai.png'
import dylan from './../dylan_kile.jpg'
import ozone from './../ozone_kafley.jpg'
import gitlab from './../gitlab.png'
import pm from './../pm.png'
// import Button from 'react-bootstrap/Button'
// import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

class Tool extends Component {
   constructor(props){
     super(props)
   }

   render(){
     return (
       <div className='col-xl-4 col-md-6 mb-4'>
          <div className="jumbotron" height="100%" width="100%">
            <h1 className='card-title text-center mb-0'>
              {this.props.name}
            </h1>
            <div className='card-text text-black-60'>{this.props.message}</div>
          </div>
        </div>
     )
   }
}

class Description extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='col-xl-6 col-md-6 mb-4'>
        <div className='jumbotron'>
          <div className='card-body'>
            <h1 className='card-title text-center mb-0'>
              {this.props.purpose}
            </h1>
            <div className='card-text text-black-60'>{this.props.message}</div>
          </div>
        </div>
      </div>
    )
  }
}

class Person extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='card border-0 shadow'>
        <a href={this.props.website}>
          <img
            src={this.props.img}
            className='card-img-top'
            height='300vw'
            width='100%'
            object-fit='cover'
            alt=''
            title={this.props.name + "'s " + 'LinkedIn'}
          />
        </a>
        <div className='card-body text-center'>
          <h5 className='card-title mb-0'>{this.props.name}</h5>
          <div className='card-text text-black-50'>{this.props.role}</div>
          <div className='card-text text-black-50'>
            Commits: {this.props.commits}
          </div>
          <div className='card-text text-black-50'>
            Issues: {this.props.issues}
          </div>
          <div className='card-text text-black-50'>
            Tests: {this.props.tests}
          </div>
        </div>
      </div>
    )
  }
}

class About extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.state.memData = {
      'Ryan Poznich': {
        name: 'Ryan Poznich',
        alias: ['Ryan Poznich'],
        username: 'rpoznich',
        role: 'Full-stack',
        img: ryan,
        commits: 0,
        issues: 0,
        website: 'https://www.linkedin.com/in/ryan-poznich-670293154',
        tests: 0
      },
      'Jonathan Nguyen': {
        name: 'Jonathan Nguyen',
        alias: ['Jonathan Nguyen'],
        username: 'GammaJohn',
        role: 'Front-end',
        img: jonathan,
        commits: 0,
        issues: 0,
        website: '',
        tests: 0
      },
      'Ozone Kafley': {
        name: 'Ozone Kafley',
        alias: ['Ozone Kafley', ''],
        username: 'kafleyozone',
        role: 'Full-stack',
        img: ozone,
        commits: 0,
        issues: 0,
        website: '',
        tests: 0
      },
      'Dylan Kile': {
        name: 'Dylan Kile',
        alias: ['Dylan Kile'],
        username: 'dylankile',
        role: 'Back-end',
        img: dylan,
        commits: 0,
        issues: 0,
        website: '',
        tests: 0
      },
      'Daniel Thai': {
        name: 'Daniel Thai',
        alias: ['Daniel Thai'],
        username: 'danielthai',
        role: 'Back-end',
        img: daniel,
        commits: 0,
        issues: 0,
        website: '',
        tests: 0
      }
    }
    this.state.toolsData = {
      'React': {
        name: 'React.JS',
        message: 'A JavaScript library to create components that we use in the front-end'
      },
      'Docker' :{
        name: 'Docker',
        message: 'A tool that can package an application and its dependencies in a virtual container'
      },
      'Postman':{
        name: 'Postman',
        message: 'An API design tool used to create our API and generate documentation'
      },
      'AWS':{
        name: 'AWS',
        message: 'A service to manage our domain, and host our website and database'
      },
      'React Router':{
        name: 'React Router',
        message: 'A React extension used to manage application states.'
      },
      'React Bootstrap':{
        name: 'React Bootstrap',
        message: 'A tool used for easier rendering of React components that use bootstrap'
      }
    }
  }

  componentDidMount () {
    // get # commits and issues
    // fetch call
    // for each member, populate # issues and #committes
    fetch(
      'https://gitlab.com/api/v4/projects/11069679/repository/commits?all=true&per_page=100&page=1'
    )
      .then(response => response.json())
      .then(data => {
        // process the data
        for (var i in data) {
          let commit_data = data[i]
          for (var member in this.state.memData) {
            if (
              this.state.memData[member].alias.includes(commit_data.author_name)
            ) {
              this.state.memData[member].commits += 1
            }
          }
        }
        this.setState({})
      })
      .catch(e => {
        console.log(e)
      })

    fetch('https://gitlab.com/api/v4/projects/11069679/issues?state=closed')
      .then(issues => issues.json())
      .then(issues => {
        for (let mem in this.state.memData) {
          let num_issues = issues.filter(issue => {
            return issue.closed_by.username === this.state.memData[mem].username
          })
          let new_issues = num_issues.length
          if (new_issues > 0) {
            this.state.memData[mem].issues = new_issues
          }
        }
        this.setState({})
      })
      .catch(e => {
        console.log(e)
      })
  }

  render () {
    let components = []
    let site_message =
      'Our site is meant to help people find the right spot to live. There are many factors involved in determining where to live, and we believe there should be a good congregation of data about different locations that is essential to know before moving.'
    let data_message =
      'Our data is based off of three models: public transportation, cities, and jobs. We have found that the quality of life of living in a certain area has many different factors, so we linked each of these data points together to create our website. ';
      for (let mem in this.state.memData) {
      components.push(
        <div id={mem} className='col-xl-4 col-md-6 mb-4'>
          <div className='card border-0 shadow'>
            <Person {...this.state.memData[mem]} />
          </div>
        </div>
      )
    }
    let theTools = []
    for(let tool in this.state.toolsData){
      theTools.push(
        <Tool {...this.state.toolsData[tool]}></Tool>
      )
    }
    return (
      <div className='main' style={{ marginTop: '10vh' }}>
        <header className='bg-primary text-center py-5 mb-4'>
          <div className='container'>
            <h1 className='font-weight-light text-white'>Meet the Team</h1>
          </div>
        </header>
        <div className='container'>
          <div className='row justify-content-center'>{components}</div>
        </div>
        <header className='bg-primary text-center py-5 mb-4'>
          <div className='container'>
            <h1 className='font-weight-light text-white'>What We're About</h1>
          </div>
        </header>
        <div className='row justify-content-center'>
          <Description purpose='About Our Site' message={site_message} />
          <Description purpose='About Our Data' message={data_message}/>
        </div>
        <header className='bg-primary text-center py-5 mb-4'>
          <div className='container'>
            <h1 className='font-weight-light text-white'>Tools Used</h1>
          </div>
          <div className='row justify-content-center' ></div>
        </header>
        <div className="row equal">{theTools}</div>
        <div className="row justify-content-center">
          <a href='https://gitlab.com/rpoznich/perfect-fit'>
            <img src={gitlab} height="100" width="100"></img>
          </a>
          <a href="https://documenter.getpostman.com/view/6836390/S11LuJgi">
            <img height="80" width="75" src={pm}></img>
          </a>
        </div>
      </div>
    )
  }
}

export default About
