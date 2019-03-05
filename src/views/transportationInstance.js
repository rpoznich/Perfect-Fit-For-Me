import React, { Component } from 'react';
import { homedir } from 'os';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class TransportationInstance extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
<div className="transportation-instance">
  <h1 class="my-4">{this.props.name + " "}
    <small>{this.props.name}</small>
  </h1>
  <div class="row">
    <div class="col-md-8">
      <img class="img-fluid" src="http://placehold.it/750x500" alt=""></img>
    </div>
    <div class="col-md-4">
      <h3 class="my-3">Transportation Guide</h3>
      <p>{this.props.guide}</p>
      <h3 class="my-3">Helpful Statistics</h3>
      <ul>
        <li>{"Quality: " + this.props.quality * 10 + "/10"}</li>
        <li>{"Number of Lines: " + this.props.lines}</li>
        <li>{"Number of Stops: " + this.props.stops}</li>
      </ul>
    </div>
  </div>
  <h3 class="my-4">Popular Stops</h3>
  <div class="row">
    <div class="col-md-3 col-sm-6 mb-4">
      <a href="#">
            <img class="img-fluid" src={this.props.example_1} alt=""></img>
          </a>
    </div>
    <div class="col-md-3 col-sm-6 mb-4">
      <a href="#">
            <img class="img-fluid" src={this.props.example_2} alt=""></img>
          </a>
    </div>
    <div class="col-md-3 col-sm-6 mb-4">
      <a href="#">
            <img class="img-fluid" src={this.props.example_3} alt=""></img>
          </a>
    </div>
  </div>
</div>
        );}
}

export default TransportationInstance;
