import React, {PureComponent } from "react";
//import axios from 'axios'
import * as d3 from 'd3'

class DrawChord extends PureComponent {
	constructor(){
			super()
		this.state = {
			svg: []
		}
		this.drawChart = this.drawChart.bind(this)
	
	}
	
	componentDidMount(){
		this.setState({
			svg: d3.select(this.refs.canvas3)
					.append("svg")

		})
	}
	
	componentDidUpdate(){
		console.log("update")
		console.log(this.props)
		if (this.props.data.length > 0){
				this.drawChart()
		}		
	}

	
	//function to create svg
	drawChart(){
		
		console.log(this.props.data)

		this.state.svg
			.attr("width",800)
			.attr("height",800)
			.style("border","1px solid black")
			
		let g = this.state.svg.append("g")	
		
		var node = g.append("g")
				.attr("class", "nodes")
				.selectAll("g")
				.data(this.props.data)
				.enter().append("g")
				.attr("name",function(d){ return d.Name })
				.attr("x",function(d){ return d.X1*300 })
				.attr("y",function(d){ return d.X2*300 });
		
		var circles = node.append("circle")
				.attr("class","circle1")
				.attr("id",function(d){ return d.EmpID })
			    .attr("name",function(d){ return d.Name })
				.attr("r", 5)
			    .attr("fill", "black")
			    .attr("stroke-opacity", 1);
				
		console.log(circles);		
			    
	}
	
	render(){
		return(
		<div className="divBuffer">
			<div ref="canvas3">
			</div>
		</div>
		)
	}
}
	
	
export default DrawChord;