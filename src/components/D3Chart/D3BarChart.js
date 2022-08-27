import React, {PureComponent } from "react";

import * as d3 from 'd3'

//receives array with Value, Sum, Mean, Count fields

class D3BarChart extends PureComponent {
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
			d3.selectAll("rect").remove()
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

		console.log(this.props)
		
			this.state.svg
					.attr("width",w)
					.attr("height",h)
					.style("border","1px solid black")
		

			this.state.svg.selectAll("rect")
					.data(this.props.idata).enter()
					.append("rect")
					.attr("width",x.bandwidth()*.9)
					.attr("id",d => d[this.props.pars[0]])
					.attr("height",d => h)
					.attr("fill",this.props.fillColor)
					.attr("x",(d,i)=> x(d["Value"]))
					.attr("y",d=> h)
					
			this.state.svg.selectAll("rect")
						.transition()
						.duration(800)
						.attr("y",d => y(d[this.props.pars[3]]))
						
			this.state.svg.append("g")
						.attr("transform","translate(" + (0 - x.bandwidth()/20) + "," + (h - 20) + ")")
						.attr("color","blue")
						.call(d3.axisBottom(x))

			this.state.svg.append("g")
						//.attr("transform","translate(20,20)")
						.attr("color","blue")
						.call(d3.axisLeft(y))
						
	}
	render(){
		return(
		<div className="divBuffer" style={{position:"absolute"}}>
			<div ref="canvas1">
			</div>
		</div>
		)
	}
}
	
	
export default D3BarChart