import React, { Component } from 'react';
import { homedir } from 'os';
import ryan from './../ryan_poznich.jpeg'
import jonathan from './../jonathan_nguyen.jpg'

class Person extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<div className="card border-0 shadow">
                    <img src={this.props.img} className="card-img-top" height="300" width="100" alt=""></img>
                    <div className="card-body text-center">
                        <h5 className="card-title mb-0">{this.props.name}</h5>
                    <div className="card-text text-black-50">{this.props.role}</div>
                    <div className="card-text text-black-50">Commits: {this.props.commits}</div>
                    <div className="card-text text-black-50">Issues: {this.props.issues}</div>
                </div>
                </div>);
    }
}

class About extends Component {
    constructor(props)
    {
        super(props);
        this.state = {}
        this.state.memData = {
            "Ryan Poznich" :
            {
                "name" : "Ryan Poznich",
                "alias" : ["Ryan Poznich"],
                "username" : "rpoznich",
                "role" : "Full-stack",
                "img" : ryan,
                "commits" : 0,
                "issues" : 0
            },
            "Jonathan Nguyen" :
            {
                "name" : "Jonathan Nguyen",
                "alias" : ["Jonathan Nguyen"],
                "username" : "GammaJohn", 
                "role" : "Full-stack",
                "img" : jonathan,
                "commits" : 0,
                "issues" : 0
            }
        }
    }

    componentDidMount()
    {
        //get # commits and issues 
        let memData = this.state.memData;
        //fetch call
        //for each member, populate # issues and #committes
        fetch("https://gitlab.com/api/v4/projects/11069679/repository/contributors?sort=desc")
        .then(response => response.json())
        .then(data => {
            //process the data
            for(var i in data)
            {
                let commit_data = data[i];
                for(var member in memData)
                {
                    if(memData[member].alias.includes(commit_data.name))
                    {
                        memData[member].commits += commit_data.commits
                    }
                }
            }
            this.setState({memData : memData}); 
        })
        .catch(e =>
        {
                console.log(e);
        })

        fetch("https://gitlab.com/api/v4/projects/11069679/issues?state=closed")
        .then(issues => issues.json())
        .then(issues => {

        })
    }
    

    render()
    {
        let components = []
        for(let mem in this.state.memData)
        {
            components.push( <div id={mem} className="col-xl-4 col-md-6 mb-4">
            <div className="card border-0 shadow">
              <Person {...this.state.memData[mem]}/>
            </div>
            </div>)
        }
        return(
            <div className="main" style={{marginTop: "10vh"}}>
<header className="bg-primary text-center py-5 mb-4">
  <div className="container">
    <h1 className="font-weight-light text-white">Meet the Team</h1>
  </div>
</header>
<div className="container">
  <div className="row justify-content-center">
    {components}
    </div>
    <div className="row justify-content-center">
  </div>

</div>
            </div>
        )
    }
}

export default About;
