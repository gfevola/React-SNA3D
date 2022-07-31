import React, {Component} from 'react'
//import {Button} from 'react-bootstrap'
import axios from "axios";
import LightingTest from "./Three/Testing/LightingTest"

class Test extends Component {
	constructor(){
		super()
		
		this.refreshList = this.refreshList.bind(this);	
	}
	
      refreshList = () => {
        axios
          .get("http://localhost:8000/sna/networkTest")
          .then(res => {
			  console.log(res.data)
		  })
          .catch(err => console.log(err));
	  };
	  
	 render(){
		 this.refreshList()
		 return(
			<div>
				<LightingTest />
			</div>
		 )
	}
		
};

export default Test