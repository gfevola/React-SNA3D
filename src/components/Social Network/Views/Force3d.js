import React, {Component} from 'react'
import ForceGraph3d from 'react-force-graph-3d'

import axios from "axios";
import AxiosGraphData from "../../Axios/AxiosGraphData"
import ParseNodeLinkFormat from "../../helper_functions/ParseNodeLinkFormat"
import { Button } from 'react-bootstrap'
import exportFromJSON from 'export-from-json'


const data1={
    "nodes": [
        {
          "id": "id1",
          "name": "name1",
          "val": 1
        },
        {
          "id": "id2",
          "name": "name2",
          "val": 10
        },
        {
          "id": "id3",
          "name": "name3",
          "val": 10
        },
        {
          "id": "id4",
          "name": "name4",
          "val": 10
        },
        {
          "id": "id5",
          "name": "name5",
          "val": 10
        },		
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        },
        {
            "source": "id2",
            "target": "id3"
        },
        {
            "source": "id3",
            "target": "id4"
        },
        {
            "source": "id5",
            "target": "id2"
        },		
        {
            "source": "id5",
            "target": "id3"
        },	 
 ]
}
		
class Force3d extends Component {
	
	constructor(){
		super()
		this.state = {
			spatialData: [],
			graphData:data1,
		}
	this.tempvec = [];	
	
	this.captureGraph = this.captureGraph.bind(this);	
	}

      componentDidMount() {
        this.refreshList();
      }	

	 ///api data request	
      refreshList = () => {
        axios
          .get("http://localhost:8000/sna/network")
          .then(res => {
			  let dd = AxiosGraphData(res.data,"qwerty",false);
			  this.setState({
					graphData: ParseNodeLinkFormat(dd),
			  })

		  })
          .catch(err => console.log(err));
		  	 
      };
	//function to store node positions
	captureGraph(){

		console.log(this.state.graphData)
	//export to json
	exportFromJSON({data:this.state.graphData,
					fileName:"HRNodes_Links",
					exportType: "json"})
	}
		
	
	render(){
	
	return(

			<div>
				<ForceGraph3d graphData={this.state.graphData} 
				nodeAutoColorBy={d => d.dept}
				nodeRelSize={5}
				nodeLabel = {d => d.name}
				/>
			<Button onClick={this.captureGraph}>Capture</Button>	
			</div>
			)

	}
}

export default Force3d;