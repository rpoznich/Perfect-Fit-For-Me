import React, { Component } from 'react';
import { homedir } from 'os';
import '../css/city/style.scss';
import '../css/city/bootstrap.min.css';
import '../css/city/simple-line-icons.css';
import '../css/city/font-awesome.min.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';

class CityInstance extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="card mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">City Ratings</h6>
                </div>
                <div class="card-body">
                  <div class="mb-1 small">Housing</div>
                  <ProgressBar now={60}></ProgressBar>
                  <div class="mb-1 small">Small Progress Bar</div>
                  <div class="progress progress-sm mb-2">
                    <div class="progress-bar" role="progressbar" width="75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
        )
    }
}

class CityListing extends Component{
    constructor(props){
        super(props);
        this.state = {}
        if(this.props.overall_rating < 40.0){
            this.state.circleColor = "featured-rating";
        }else if(this.props.overall_rating >= 70.0){
            this.state.circleColor = "featured-rating-green";
        }else{
            this.state.circleColor = "featured-rating-orange";
        }
        this.state.highlightedDS = "";
        this.state.unhighlightedDS = "";
        let bound = (Math.ceil(this.props.cost_of_living / 2))
        for(let i = 0; i < bound; ++i){
            this.state.highlightedDS += "$";
        }
        for(let j = 0; j < 5 - (this.state.highlightedDS.length); ++j){
            this.state.unhighlightedDS += "$";
        }
    }

    render(){
        return (<div class="featured-place-wrap">
                            <a href={"/cities/"+this.props.id}>
                            <img src={""+ this.props.image} height="200" width="100" alt="#"></img>
                            <div className="container">
                                <span className={this.state.circleColor} title="Overall Rating">{this.props.overall_rating / 10.0}</span>
                            </div>
                            <div class="featured-title-box">
                                <h6 >{this.props.name}</h6>
                                {/* <p>Restaurant </p> <span>• </span>
                                <p>3 Reviews</p> <span> • </span> */}
                                <p><span>{this.state.highlightedDS}</span>{this.state.unhighlightedDS}</p>
                                <ul>
                                    <li><span class="icon-location-pin"></span>
                                        <p>{this.props.state}</p>
                                    </li>
                                    <li><span class="icon-screen-smartphone"></span>
                                        <p>+44 20 7336 8898</p>
                                    </li>
                                    <li><span class="icon-link"></span>
                                        <p>https://burgerandlobster.com</p>
                                    </li>

                                </ul>
                                {/* <div class="bottom-icons">
                                    <span class="ti-heart"></span>
                                    <span class="ti-bookmark"></span>
                                </div> */}
                                </div>
                                </a>
                    </div>)
    }
}

class Cities extends Component {
    constructor(props)
    {
        super(props);
        this.isListing = true;
        if(typeof props.match.params.id != 'undefined')
        {
            this.isListing = false;
            this.id = props.match.params.id;
        }
        this.state = 
        {
            "cities":
            {

            }
        }
    }
    
    componentDidMount()
    {
        fetch('../statics/data.json').then(response => { //change this to actual API
            return response.json();
          }).then(data => {
            // Work with JSON data here
            this.state.cities = data.cities
            this.setState(this.state);
          }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
          });
    }

    render()
    {
        if(this.isListing){
        let components = [];
        for(let id in this.state.cities)
        {
            components.push( <div className="col-md-4 featured-responsive"><CityListing id={id} {...this.state.cities[id]}/></div>)
        }
        return(
            <div className="cities">
            <div className="main" style={{marginTop: "10vh"}}>
    <section class="main-block light-bg">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="styled-heading">
                        <h3>Featured Places</h3>
                    </div>
                </div>
            </div>
            <div class="row">
                {components}
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="featured-btn-wrap">
                        <a href="" class="btn btn-danger">VIEW ALL</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
             </div>
             </div>
        );
        }else{
            return (<div className="main" style={{marginTop: "20vh"}}> 
                <CityInstance></CityInstance>
            </div>);
        }
    }
}

export default Cities;
