import React, { Component } from 'react';
import * as d3 from "d3";
import uStates from './uStates';

import '../css/Visualizations.css';
// import './css/style.css';

class Visualization4 extends Component {

constructor(props) {
    super(props);
    this.fac = {
        "KY":{"count": 2}, 
        "ID":{"count": 17}, 
        "AR":{"count": 13}, 
        "NC":{"count": 2}, 
        "NE":{"count": 1}, 
        "MD":{"count": 2}, 
        "WA":{"count": 1}, 
        "MI":{"count": 4}, 
        "HI":{"count": 2}, 
        "TN":{"count": 2}, 
        "OR":{"count": 9}, 
        "SC":{"count": 1}, 
        "WI":{"count": 1}, 
        "VA":{"count": 2}, 
        "NY":{"count": 3}, 
        "CA":{"count": 15}, 
        "MT":{"count": 2}, 
        "MA":{"count": 3}, 
        "NV":{"count": 3}, 
        "IL":{"count": 3}, 
        "TX":{"count": 2}, 
        "WY":{"count": 10}, 
        "MO":{"count": 2}, 
        "UT":{"count": 16}, 
        "CO":{"count": 6}, 
        "FL":{"count": 4}
    }
    this.state = {
      hasMounted : 0
    };
    this.drawChart = this.drawChart.bind(this);    
  }

  drawChart() {
    function tooltipHtml(n, d) {
      var htmlTable =  "<h4>"+n+"</h4><table>";
      htmlTable +="<tr><td><b>Total Facilities</b></td><td><b>"+(d.total)+"</b></td></tr></table>";
      return htmlTable;
    }

    var facData = this.fac;
    var sampleData = {};

    ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
    "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH",
    "MI", "WY", "MT", "ID", "WA", "TX", "CA", "AZ", "NV", "UT",
    "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN",
    "WI", "MO", "AR", "OK", "KS", "LA", "VA"]
      .forEach(function(d){
        var stateData = 0
        if(d in facData){
          stateData = facData[d]["count"];
        }
        sampleData[d]={total: stateData,
            color:d3.interpolate("#ffffcc", "#108403")(stateData/20)}; // pick a good constant for num lol
      });
    /* draw states on id #statesvg */
    uStates.draw("#statesvg", sampleData, tooltipHtml);

    d3.select(window.frameElement).style("height", "600px");
  }

  componentDidMount() {
    this.state.hasMounted = 1;
    this.setState(this.state);
  }

  render() {
    if(this.state.hasMounted == 1){
      this.drawChart();
    }
    return (
    <div className="container mb-5">
      <h1 className="vis-header">Hot Zones of Facilities</h1>
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
export default Visualization4;
