import React, { createRef, Component } from "react";
import * as d3 from "d3";
import { VictoryChart, VictoryBar, VictoryTheme } from "victory";


class Visualization2 extends Component{
    constructor(props){
        super(props);
        this.data =  [
            {x: '0-1', y: 0.0},
            {x: '1-2', y: 0.0},
            {x: '2-3', y: 4.0 },
            {x: '3-4', y: 5.0},
            {x: '4-5', y: 19.0},
            {x: '5-6', y: 29.0},
            {x: '6-7', y: 10.0},
            {x: '7-8', y: 0.0},
            {x: '8-9', y: 0.0},
            {x: '9-10', y: 0.0}
          ];
    }

    render(){
        return (
<div className='main' style={{ marginTop: '20vh' }}>
            <h2 className='row justify-content-center'>Overall Ratings of Cities</h2>
            <VictoryChart
            domainPadding={1}
            >
            <VictoryBar
                style={{ data: { fill: "#c43a31" } }}
                data={this.data}
            />
</VictoryChart>
</div>
      );
    }
}

export default Visualization2;
