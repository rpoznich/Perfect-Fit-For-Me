import React, { Component } from 'react';
import * as d3 from "d3";
import uStates from './uStates';

import '../css/Visualizations.css';
// import './css/style.css';

class Visualization3 extends Component {

constructor(props) {
    super(props);
    this.state = {
      events : null,
      hasMounted : 0
    };
    this.drawChart = this.drawChart.bind(this);
  }

  drawChart() {
    function tooltipHtml(n, d) {
      var htmlTable =  "<h4>"+n+"</h4><table>";
      htmlTable +="<tr><td><b>Total Events</b></td><td><b>"+(d.total)+"</b></td></tr></table>";
      return htmlTable;
    }

    var eventData = this.state.events;
    var sampleData = {};

    ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
    "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH",
    "MI", "WY", "MT", "ID", "WA", "TX", "CA", "AZ", "NV", "UT",
    "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN",
    "WI", "MO", "AR", "OK", "KS", "LA", "VA"]
      .forEach(function(d){
        var stateData = 0
        if(d in eventData){
          stateData = eventData[d]["total"];
        }
        sampleData[d]={total: stateData,
            color:d3.interpolate("#ffffcc", "#800026")(stateData/80)}; // pick a good constant for num lol
      });
    /* draw states on id #statesvg */
    uStates.draw("#statesvg", sampleData, tooltipHtml);

    d3.select(window.frameElement).style("height", "600px");
  }

  componentDidMount() {
    fetch('https://d1u00tbnbhznv0.cloudfront.net/api/events').then(response => { //change this to actual API
      return response.json();
    }).then(data => {
      // Work with JSON data here
      let statecounts = {}
      for(let eve in data){
        let name = data[eve]["state"]
        if(!(name in statecounts)){
          statecounts[name] = {"total": 0};
        }
        statecounts[name]["total"]++;
      }
      this.state.events = statecounts;
      this.state.hasMounted = 1;
      console.log(this.state.events)
      this.setState(this.state);
    }).catch(err => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });
  }

  render() {
    if(this.state.hasMounted == 1){
      this.drawChart();
    }
    return (
    <div className="container mb-5">
      <h1 className="vis-header">Number of Total Events per State</h1>
        <div className="container mb-5">
            <div className="row">
            <div id="tooltip"></div>
            <svg id="statesvg" width="960" height="600" style={{marginTop: '5%'}}></svg>
            </div>
        </div>
    </div>
    );
  }
}
export default Visualization3;
