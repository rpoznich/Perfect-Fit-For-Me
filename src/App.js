import React, { Component } from 'react';
import logo from './68fdaa828d60e1828ee849c1f72bbc4c.png';
import Home from './views/home.js'
import Jobs from './views/jobs.js'
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
            <Route exact path="/jobs" component={Jobs}/>
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

  handleClick(str)
  {
    this.setState({current: str});
  }

  render()
  {
    return(
    <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Link className="navbar-brand" to="/" onClick={() => this.handleClick("Home")}>   <img width="50" height="40" src={logo}></img>PerfectFitForMe</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className={this.state.current == "Home" ? "nav-item active" : "nav-item" }>
            <Link className="nav-link" to="/" onClick={() => this.handleClick("Home")}>Home {this.props.current == "Home" ? <span className="sr-only">(current)</span> : null }</Link>
          </li>
          <li className={this.state.current == "Jobs" ? "nav-item active" : "nav-item" }>
            <Link className="nav-link" to="/jobs" onClick={() => this.handleClick("Jobs")}>Jobs  {this.props.current == "Jobs" ? <span className="sr-only">(current)</span> : null }</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
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
              <NavBar current={"Home"}/>
        
              <Routing />
      </div> 
    );
  }
}

export default App;
