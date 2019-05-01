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
import Visualization1 from './views/visualization1';
import NavDropdown from 'react-bootstrap/NavDropdown'


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
    <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Link className="navbar-brand" to="/" onClick={() => this.handleClick("home")}>   <img width="50" height="40" src={logo} alt=""></img>PerfectFitForMe</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
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
        <NavDropdown.Item href="/visualization/2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="/visualization/3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
          </li>
          <div>
          <input type="text" className="mr-sm-2" onChange={(e) => this.setState({textInput : e.target.value})}></input>
            <Button href={"/search/"+this.state.textInput} type="submit" ariant="outline-primary">Search</Button>

          </div>
          
        </ul>
      </div>
    </nav>
         
      </div>);
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
