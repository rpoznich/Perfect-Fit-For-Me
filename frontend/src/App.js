import React, { Component } from 'react';
import logo from './68fdaa828d60e1828ee849c1f72bbc4c.png';
import Home from './views/home.js'
import Jobs from './views/jobs.js'
import JobsSearch from './views/jobSearch.js'
import Cities from './views/cities.js'
import CitiesSearch from './views/citySearch.js'
import About from './views/about.js'
import Events from './views/events.js'
import EventsSearch from './views/eventSearch.js'
import Search from './views/search.js'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Visualization1 from './views/visualization1'
import Visualization2 from './views/visualization2'
import Visualization3 from './views/visualization3'
import Visualization4 from './views/visualization4'
import Visualization5 from './views/visualization5'
import Visualization6 from './views/visualization6'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


class Routing extends Component{
  constructor(props)
  {
    super(props);
  }

  render() {
    return (
      <div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/jobs/:id" component={Jobs}/>
            <Route exact path="/jobs/filter/loc/:query" component={Jobs}/>
            <Route exact path="/jobs/filter/income/:query" component={Jobs}/>
            <Route exact path="/jobs/filter/edu/:query" component={Jobs}/>
            <Route exact path="/jobs/Title=A-Z/:id" component={Jobs}/>
            <Route exact path="/jobs/Title=Z-A/:id" component={Jobs}/>
            <Route exact path="/jobs/search/:query" component={JobsSearch}/>
            <Route exact path="/jobInstance/:id" component={Jobs}/>
            <Route exact path="/cities/:id" component={Cities}/>
            <Route exact path="/cities/filter/col/:query" component={Cities}/>
            <Route exact path="/cities/filter/state/:query" component={Cities}/>
            <Route exact path="/cities/filter/pop/:query" component={Cities}/>
            <Route exact path="/cities/Name=A-Z/:id" component={Cities}/>
            <Route exact path="/cities/Name=Z-A/:id" component={Cities}/>
            <Route exact path="/cities/search/:query" component={CitiesSearch}/>     
            <Route exact path="/cityInstance/:id" component={Cities}/> 
            <Route exact path="/events/:id" component={Events}/>
            <Route exact path="/events/search/:query" component={EventsSearch}/>
            <Route exact path="/events/filter/city/:query" component={Events}/>
            <Route exact path="/events/filter/state/:query" component={Events}/>
            <Route exact path="/events/filter/duration/:query" component={Events}/>
            <Route exact path="/events/Name=A-Z/:id" component={Events}/>
            <Route exact path="/events/Name=Z-A/:id" component={Events}/>
            <Route exact path="/eventInstance/:id" component={Events}/>       
            <Route exact path="/about" component={About}/>
            <Route exact path="/search/:query" component={Search}/>
            <Route exact path="/visualization/1" component={Visualization1}/>
            <Route exact path="/visualization/2" component={Visualization2}/>
            <Route exact path="/visualization/3" component={Visualization3}/>
            <Route exact path="/visualization/4" component={Visualization4}/>
            <Route exact path="/visualization/5" component={Visualization5}/>
            <Route exact path="/visualization/6" component={Visualization6}/>
          </Switch>

       </div>
    );
  }
}
class NavBar extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {props, textInput : ''};
        this.handleClick = this.handleClick.bind(this);
  }

  //on refresh make sure navbar highlights the right tab
  componentDidMount()
  {
    let params = window.location.pathname.split("/");
    this.setState({current: params.length > 1 && params[1] !== ""? params[1] : "home"});

  }

  //set the current tab of the navbar
  handleClick(str)
  {
    this.setState({current: str});
  }

  render()
  {
    return(
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand  href="/" onClick={() => this.handleClick("home")}>   <img width="50" height="40" src={logo} alt=""></img>PerfectFitForMe</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
          <li className={this.state.current === "home" ? "nav-item active" : "nav-item" }>
            <Link className="nav-link" to="/" onClick={() => this.handleClick("home")}>Home {this.props.current === "home" ? <span className="sr-only">(current)</span> : null }</Link>
          </li>
          <li className={this.state.current === "jobs" ? "nav-item active" : "nav-item" }>
            <a className="nav-link" href="/jobs/1" onClick={() => this.handleClick("jobs")}>Jobs  {this.props.current === "jobs" ? <span className="sr-only">(current)</span> : null }</a>
          </li>
          <li className={this.state.current === "cities" ? "nav-item active" : "nav-item" }>
            <a className="nav-link" href="/cities/1" onClick={() => this.handleClick("cities")}>Cities  {this.props.current === "cities" ? <span className="sr-only">(current)</span> : null }</a>
          </li>
          <li className={this.state.current === "events" ? "nav-item active" : "nav-item" }>
            <a className="nav-link" href="/events/1" onClick={() => this.handleClick("events")}>Events  {this.props.current === "events" ? <span className="sr-only">(current)</span> : null }</a>
          </li>
          <li className={this.state.current === "about" ? "nav-item active" : "nav-item" }>
            <Link className="nav-link" to="/about" onClick={() => this.handleClick("about")}>About Us  {this.props.current === "about" ? <span className="sr-only">(current)</span> : null }</Link>
          </li>
          <li>
          <NavDropdown title="Visualizations" id="basic-nav-dropdown">
        <NavDropdown.Item href="/visualization/1">Job Education Requirements</NavDropdown.Item>
        <NavDropdown.Item href="/visualization/2">City Overall Ratings</NavDropdown.Item>
        <NavDropdown.Item href="/visualization/3">Hot Zones of Events</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/visualization/4">Hot Zones of Facilities</NavDropdown.Item>
        <NavDropdown.Item href="/visualization/5">Popularity of Activities</NavDropdown.Item>
        <NavDropdown.Item href="/visualization/6">Relationship on Population vs Activity Level</NavDropdown.Item>
      </NavDropdown>
          </li>
          <li>
          <input placeholder="Search" type="text" className="mr-sm-2" onChange={(e) => this.setState({textInput : e.target.value})}></input>
            <Button href={"/search/"+this.state.textInput} type="submit" ariant="outline-primary">Search</Button>
          </li>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>);
  }
}
class App extends Component {

  render() {
    
    return (

      <div className="App">
              <NavBar current="home"/>
        
              <Routing />
      </div> 
    );
  }
}

export default App;
