import React, { createRef, Component } from "react";
import * as d3 from "d3";
import { VictoryPie } from "victory";


class Visualization1 extends Component{
    constructor(props){
        super(props);
        this.data =  [
            {x: 'High School Diploma', y: 17.5},
            {x: 'Bachelor\'s Degree', y: 42.5},
            {x: 'Master\'s Degree', y: 2.0 },
            {x: 'Doctorate Degree', y: 17.5}
          ];
    }

    render(){
        return (
          <div className='main' style={{ marginTop: '20vh' }}>
            <h2 className='row justify-content-center'>Job Education Requirements</h2>
            <VictoryPie data={this.data} padAngle={2}
  innerRadius={30}
  radius={80}
  colorScale="qualitative"/>
  </div>
      );
    }
}

export default Visualization1;
