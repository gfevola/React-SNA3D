import React, {PureComponent } from "react";

import * as d3 from 'd3'
//import { sankey } from 'd3-sankey'
//receives array with Value, Sum, Mean, Count fields

class D3LineChart extends PureComponent {
	constructor(){
			super()
		this.state = {
			svg: [],  //the svg container
		}
	}
	
	componentDidMount(){
		this.setState({
			svg: d3.select(this.refs.canvas2)
					.append("svg")
		})
	}
	
	//after initial rendering
	componentDidUpdate(){
		if (this.props.idata.length>0){
			//clear last axes/rects then update
			d3.selectAll("g").remove()
			d3.selectAll("rect").remove()
			this.drawBarChart()
		} 
	}
	
	
	//function to create svg
	drawBarChart(){

	//	var sankey = sankey()
	//		.nodeWidth(36)
	//		.nodePadding(290)
	//		.size([600, 300]);

		
	}
	render(){
		console.log("sankey")
		return(
		<div className="divBuffer">
			<div ref="canvas2">
			</div>
		</div>
		)
	}
}
	
	
export default D3LineChart