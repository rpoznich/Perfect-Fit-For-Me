import React, { Component } from 'react'
import { homedir } from 'os'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'

class PageBar extends Component {
    constructor (props) {
        super(props)
        //Get number of pages required
        this.state = {};
        this.state.numPages = this.props.numPages;
        let url = window.location.pathname.split("/");
        let ap = url[url.length - 1];
        this.state.activePage =  parseInt(ap, 10);
    }

    handleClick(pageNum){
        this.setState({activePage: pageNum});
    }

    render (){
        let items = [];
        let showEllip = true;
        let i = this.state.activePage
        while(i <= this.state.numPages && i < this.state.activePage + 5){
            items.push(
                //CHANGE CITIES IN ALL PLACES
                <Pagination.Item key={i} active={i === this.state.activePage} href={this.props.model + i}>
                  {i}
                </Pagination.Item>
              );
              i++;
              if(i > this.state.numPages){
                  showEllip = false;
              }
        }
        let canNext = true;
        if(this.state.activePage + 1 > this.state.numPages){
            canNext = false;
        }
        return(
        <div class="row justify-content-center">
        <Pagination>
            <Pagination.First href={this.props.model + 1}/>
            {(this.state.activePage != 1) &&
            <Pagination.Prev href={this.props.model + (this.state.activePage - 1)}/>
            || <Pagination.Prev disabled/>}
            <Pagination>{items}</Pagination>
            {showEllip &&
            <Pagination.Ellipsis />}
            {showEllip &&
        <Pagination.Item href={this.props.model + this.state.numPages}>{this.state.numPages}</Pagination.Item>}
            {canNext &&
            <Pagination.Next href={this.props.model + (this.state.activePage + 1)} /> 
            || <Pagination.Next href={this.props.model + (this.state.activePage + 1)} disabled/>}
            <Pagination.Last href={this.props.model + this.state.numPages}/>
        </Pagination>
        </div>
        );
    }
}

export default PageBar
