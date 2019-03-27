import React, { Component } from 'react'
import { homedir } from 'os'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'

class PageBar extends Component {
    constructor (props) {
        super(props)
        //Get number of pages required
        this.state = {};
        this.state.numPages = 10; //CHANGE
        this.state.activePage = 1;
    }

    render (){
        let items = [];
        for(let i = this.state.activePage; i < this.state.activePage + 5; ++i){
            items.push(
                //CHANGE CITIES IN ALL PLACES
                <Pagination.Item key={i} active={i === this.state.activePage} href={this.props.model + i}>
                  {i}
                </Pagination.Item>
              );
        }
        return(
            <div class="row justify-content-center">
            <Pagination>
  <Pagination.First />
  <Pagination.Prev />
  <Pagination>{items}</Pagination>

  <Pagination.Ellipsis />
  <Pagination.Item>{this.state.numPages}</Pagination.Item>
  <Pagination.Next href={this.props.model + (this.state.activePage + 1)}/>
  <Pagination.Last />
</Pagination>
</div>
        );
    }
}

export default PageBar
