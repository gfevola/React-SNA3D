import React, {PureComponent } from "react";

import * as d3 from 'd3'

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
			svg: d3.select(this.refs.canvas1)
					.append("svg")
		})
	}
	
	//after initial rendering
	componentDidUpdate(){
		if (this.props.idata.length>0){
			//clear last axes/rects then update
			d3.selectAll("g").remove()
			d3.selectAll("path").remove()
			this.drawBarChart()
		} 
	}
	
	
	//function to create svg
	drawBarChart(){
		const h = 300
		const w = 700
		
		const x = d3.scaleBand()
					.range([0,w])
					.domain(this.props.idata.map((d,i) => d["Value"]));
		
		const y = d3.scaleLinear()
				.range([h,0])
				.domain([0,d3.max(this.props.idata,d => d[this.props.pars[3]])]);
		
		//overcome "this" reference change within onclick/mouse function
		//let storeReact = this	
		
		var line = d3.line()
					.x(function(d){return x(d["Value"]) + x.bandwidth()/2})
					.y(function(d){return y(d["Count"])});
		
		
			this.state.svg
					.attr("width",w)
					.attr("height",h)
					.style("border","1px solid black")
		

			this.state.svg.append("path")
						.attr("class","line")
						.attr("fill","none")
						.attr("stroke-width",2.5)
						.attr("stroke","white")
						.attr("d",line(this.props.idata))
						
					
			this.state.svg.selectAll("path")
						.transition()
						.duration(400)
						.attr("stroke","darkgreen")
						.delay(function(d,i){return(100*i)})
						

						
	}
	render(){
		return(
		<div className="divBuffer">
			<div ref="canvas1">
			</div>
		</div>
		)
	}
}
	
	
export default D3LineChart