import React, { createRef, Component } from "react";
import * as d3 from "d3";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from "victory";


class Visualization6 extends Component{
    constructor(props){
        super(props);
        this.data =  [
            {x: 1, y: 1456},
            {x: 1, y: 3583},
            {x: 1, y: 4420},
            {x: 1, y: 46055},
            {x: 3, y: 658},
            {x: 3, y: 1097},
            {x: 3, y: 4023},
            {x: 3, y: 11110},
            {x: 3, y: 13535},
            {x: 3, y: 29742},
            {x: 4, y: 1430},
            {x: 4, y: 1619},
            {x: 4, y: 3104},
            {x: 4, y: 3576},
            {x: 4, y: 7589},
            {x: 4, y: 13857},
            {x: 4, y: 25851},
            {x: 5, y: 11404},
            {x: 5, y: 15014},
            {x: 6, y: 794},
            {x: 6, y: 7585},
            {x: 6, y: 24289},
            {x: 6, y: 27400},
            {x: 6, y: 28308},
            {x: 6, y: 37966},
            {x: 6, y: 53518},
            {x: 7, y: 674},
            {x: 7, y: 2453},
            {x: 7, y: 4225},
            {x: 7, y: 8558},
            {x: 9, y: 3438},
            {x: 9, y: 18574},
            {x: 11, y: 1143},
            {x: 11, y: 1941},
            {x: 11, y: 38797},
            {x: 12, y: 23371},
            {x: 15, y: 369},
            {x: 15, y: 6270},
            {x: 16, y: 11634},
            {x: 17, y: 15925}
        ];
    }

    render(){
        return (
<div className='main' style={{ marginTop: '20vh' }}>
            <h2 className='row justify-content-center'>Relationship on Population vs Activity Level</h2>
            <VictoryChart
            >
            <VictoryScatter
                data={this.data}
            />
            </VictoryChart>
</div>
      );
    }
}

export default Visualization6;
