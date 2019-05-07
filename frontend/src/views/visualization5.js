import React, { createRef, Component } from "react";
import * as d3 from "d3";
import { VictoryChart, VictoryBar, VictoryTheme } from "victory";


class Visualization5 extends Component{
    constructor(props){
        super(props);
        this.data =  [
            {x: "Camping", y: 30},
            {x: "Hiking", y: 30},
            {x: "Fishing", y: 26},
            {x: "Wildlife Viewing", y: 21},
            {x: "Biking", y: 20},
            {x: "Boating", y: 17},
            {x: "Swimming", y: 15},
            {x: "Horseback Riding", y: 14},
            {x: "Photograph", y: 11},
            {x: "Picnicking", y: 9},
            {x: "Historic & Cultural Site", y: 6},
            {x: "Hunting", y: 6},
            {x: "Bird Watching", y: 4},
            {x: "Paddling", y: 4},
            {x: "Canoeing", y: 2}
        ];
    }

    render(){
        return (
<div className='main' style={{ marginTop: '20vh' }}>
            <h2 className='row justify-content-center'>Popularity of Activities</h2>
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

export default Visualization5;
