import React, { Component } from 'react';
import logo from './68fdaa828d60e1828ee849c1f72bbc4c.png';
import Home from './views/home.js'
import Jobs from './views/jobs.js'
import Cities from './views/cities.js'
import About from './views/about.js'
import Transportation from './views/transportation.js'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";



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
            <Route exact path="/jobs" component={Jobs}/>
            <Route exact path="/cities/:id" component={Cities}/> 
            <Route exact path="/cities" component={Cities}/>  
            <Route exact path="/transportation" component={Transportation}/>       
            <Route exact path="/about" component={About}/>
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
    this.state = props;
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
            <Link className="nav-link" to="/jobs" onClick={() => this.handleClick("jobs")}>Jobs  {this.props.current === "jobs" ? <span className="sr-only">(current)</span> : null }</Link>
          </li>
          <li className={this.state.current === "cities" ? "nav-item active" : "nav-item" }>
            <Link className="nav-link" to="/cities" onClick={() => this.handleClick("cities")}>Cities  {this.props.current === "cities" ? <span className="sr-only">(current)</span> : null }</Link>
          </li>
          <li className={this.state.current === "transportation" ? "nav-item active" : "nav-item" }>
            <Link className="nav-link" to="/transportation" onClick={() => this.handleClick("transportation")}>Transportation  {this.props.current === "transportation" ? <span className="sr-only">(current)</span> : null }</Link>
          </li>
          <li className={this.state.current === "about" ? "nav-item active" : "nav-item" }>
            <Link className="nav-link" to="/about" onClick={() => this.handleClick("about")}>About Us  {this.props.current === "about" ? <span className="sr-only">(current)</span> : null }</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
            <div className="dropdown-menu" aria-labelledby="dropdown01">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
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
