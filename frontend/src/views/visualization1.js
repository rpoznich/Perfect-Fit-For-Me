import React, { createRef, Component } from "react";
import * as d3 from "d3";
import { VictoryPie } from "victory";


class Visualization1 extends Component{
    constructor(props){
        super(props);
        this.data =  [
            {x: 'Highschool Diploma', y: 17.5},
            {x: 'Bachelor\'s Degree', y: 42.5},
            {x: 'Master\'s Degree', y: 2.0 },
            {x: 'Doctorate Degree', y: 17.5}
          ];
    }

    render(){
        return (
            <VictoryPie data={this.data} padAngle={2}
  innerRadius={30}
  radius={80}
  colorScale="qualitative"/>
      );
    }
}

export default Visualization1;
