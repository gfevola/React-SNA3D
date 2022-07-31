import React, {PureComponent } from "react";
import axios from 'axios'
//import * as d3 from 'd3'
import DrawChord from "./DrawChord"
import { Button } from "react-bootstrap"

class D3Chord extends PureComponent {
	constructor(){
		super()
		
		this.state = {
			data: [],
			clicked:0,
		}
		
		this.handleclick = this.handleclick.bind(this)
		this.refreshList = this.refreshList.bind(this)
	}
	
	componentDidMount(){
		this.refreshList()
	}
	
	handleclick = () => {
		this.setState(prevState => {
		   return {clicked: prevState.clicked + 1}
		})
	}
	
	refreshList = () => {
        axios
          .get("http://localhost:8000/api/empstate")
          .then(res => {
			  this.setState({ 
					data: res.data
			  })
		  })
          .catch(err => console.log(err));
		  	 
      };
	
	render(){
		return(
		<div className="divBuffer">
			<Button onClick={this.handleclick}> Run </Button>
			<DrawChord data={this.state.data} clicked={this.state.clicked}/>
		</div>
		)
	}
}
	
	
export default D3Chord;