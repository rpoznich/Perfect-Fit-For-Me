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
    <small>Transportation System Name</small>
  </h1>
  <div class="row">
    <div class="col-md-8">
      <img class="img-fluid" src="http://placehold.it/750x500" alt=""></img>
    </div>
    <div class="col-md-4">
      <h3 class="my-3">Transportation Guide</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.</p>
      <h3 class="my-3">Helpful Statistics</h3>
      <ul>
        <li>Lorem Ipsum</li>
        <li>Dolor Sit Amet</li>
        <li>Consectetur</li>
        <li>Adipiscing Elit</li>
      </ul>
    </div>
  </div>
  <h3 class="my-4">Popular Stops</h3>
  <div class="row">
    <div class="col-md-3 col-sm-6 mb-4">
      <a href="#">
            <img class="img-fluid" src="http://placehold.it/500x300" alt=""></img>
          </a>
    </div>
    <div class="col-md-3 col-sm-6 mb-4">
      <a href="#">
            <img class="img-fluid" src="http://placehold.it/500x300" alt=""></img>
          </a>
    </div>
    <div class="col-md-3 col-sm-6 mb-4">
      <a href="#">
            <img class="img-fluid" src="http://placehold.it/500x300" alt=""></img>
          </a>
    </div>
    <div class="col-md-3 col-sm-6 mb-4">
      <a href="#">
            <img class="img-fluid" src="http://placehold.it/500x300" alt=""></img>
          </a>
    </div>
  </div>
</div>
        );}
}

export default TransportationInstance;
