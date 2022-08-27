import React, {Component} from 'react'
import SNAContainer from "./SNAContainer"

import dataSNA from "C:\\Users\\Foureight24\\Desktop\\ProjectFiles\\my-app2\\src\\saved_data\\HRNodes_Links.json"
import Canvas2D from "./2dForce/Canvas2D"

import axios from "axios";
import AxiosGraphData from "../Axios/AxiosGraphData"
import ParseNodeLinkFormat from "../helper_functions/ParseNodeLinkFormat"
//import PivotArray from "../helper_functions/PivotArray"


class SNABase extends Component {
	constructor(){
		super()
		this.state = {
			type: "2d",
			pureData: {
						"nodes": [{EmpID:"Test1","Name":"Test1"},{EmpID:"Test2","Name":"Test2"}], 
						"links":[{id: "link1", source:{EmpID: "Test1"},target:{EmpID:"Test2"}}]
					  },
			request: false,
		}
	}
	
	 //api data request	
      refreshList = () => {
        axios
          .get("http://localhost:8000/sna/network")
          .then(res => {
			  let dd = AxiosGraphData(res.data,"sample3",false);
			  this.setState({
					pureData: ParseNodeLinkFormat(dd),
					request: true
			  })
		  })
          .catch(err => console.log(err));
	  };


	componentDidMount(){
		this.refreshList()

	}
		
	render(){
		console.log(this.state)
		return(
			<div>
				<Dimension type={this.props.type} 
				pureData={this.state.pureData} 
				loaded={this.state.loaded}
				/>
			</div>
		)
	}
}

	function Dimension(input) {
		if (input.type==="view2d"){
			return 	<Canvas2D data1={input.pureData}/>
		} else {
			return 	<SNAContainer nodes={dataSNA.nodes} links={dataSNA.links} />		
		}
	}

export default SNABase;