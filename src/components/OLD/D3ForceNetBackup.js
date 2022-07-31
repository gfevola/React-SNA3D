import React, {Component} from 'react'
import * as d3 from 'd3'
import UniqueList from "../../helper_functions/UniqueList"
import IsInVector from "../../helper_functions/IsInVector"
import color from "color"
import ReactTooltip from "react-tooltip"
import "../TableView/DropView.js"

let selectedNode = [];

class D3ForceNet extends Component {
	constructor(){
		super()
		
		this.state = {
			highlightOn: false,
			isHoveringLink:false,
			isHoveringNode:false,
			hoverLink: [],
			hoverNode: []
		}
		
		//this.initializeSimulation = this.initializeSimulation.bind(this)
		this.initializeForces = this.initializeForces.bind(this)
		this.initializeDisplay = this.initializeDisplay.bind(this)
		this.updateForces = this.updateForces.bind(this)
		this.updateDisplay = this.updateDisplay.bind(this)
		this.fixLinkformat = this.fixLinkformat.bind(this)
		
		this.rerun = this.rerun.bind(this)
		
		this.popup = this.popup.bind(this)
		this.findNodeLinks = this.findNodeLinks.bind(this)
		this.highlightOnOff = this.highlightOnOff.bind(this)
		this.renderUpdateSelected = this.renderUpdateSelected.bind(this)
		this.apply_nodeLabels = this.apply_nodeLabels.bind(this)
		this.apply_nodeColors = this.apply_nodeColors.bind(this)
		this.apply_linkColors = this.apply_linkColors.bind(this)
		this.apply_nodecolorCategory = this.apply_nodecolorCategory.bind(this)
		this.apply_selectNode = this.apply_selectNode.bind(this)
		this.apply_nodecolorAmt = this.apply_nodecolorAmt.bind(this)
		this.apply_sphereInf = this.apply_sphereInf.bind(this)

	}
	
	// set up the simulation and event to update locations after each tick
/* 	initializeSimulation = () => {
	  simulation.nodes(this.props.nodes);
	  this.initializeForces();
	  simulation.on("tick", ticked);
	} */
	
	// add forces to the simulation
	initializeForces = () => {
		// add forces and associate each with a name
		simulation
			.force("link", d3.forceLink())
			.force("charge", d3.forceManyBody())
			.force("collide", d3.forceCollide())
			.force("center", d3.forceCenter())
			.force("forceX", d3.forceX())
			.force("forceY", d3.forceY());
		// apply properties to each of the forces
		this.updateForces();
		zoom_handler(svg);  

	}

	// generate the svg objects and force simulation
	initializeDisplay() {
		
	//overcome "this" reference change within onclick/mouse function
	let storeReact = this	
	
	  // set the data and properties of link lines
	  
	  let link_g = g.append("g")
	  console.log(Revlinks)
	  
	  link = link_g
			.selectAll("line")
			.data(Revlinks)
			.enter().append("line")
			.attr("class", "links")
			.attr("stroke-opacity", 1)
			.attr("stroke-width", 3)
			.attr("id",function(d){ return d.id })
			.attr("title",function(d){return "Title"})
			.attr("source",function(d){ return d.source })
			.attr("target",function(d){ return d.target })
			.attr("data-tip","")
			.attr("data-for","registerTip")
			.on("mouseover",function(d){
				d3.select(this).transition()
					.duration(50)
					.attr('stroke-width',5);
				
				storeReact.popup(this)
			})
			.on("mouseout",function(d){
				d3.select(this).transition().duration(20).attr('stroke-width',2);
			})
			.on("click",function(d){
				d3.select(this).remove()
				storeReact.updateForces()
			});
			

	  // set the data and properties of node circles
		node = g.append("g")
				.attr("class", "nodes")
				.selectAll("g")
				.data(this.props.nodes)
				.enter().append("g")
				.attr("name",function(d){ return d.Name })
		
		circles = node.append("circle")
				.attr("class","circle1")
				.attr("id",function(d){ return d.EmpID })
			    .attr("name",function(d){ return d.Name })
				.attr("r", 5)
			    .attr("fill", "black")
			    .attr("stroke-opacity", 1)
			    .call(d3.drag()
				  .on("start", dragstarted)
				  .on("drag", dragged)
				  .on("end", dragended))
			    .on("dblclick",function(d){
					if (storeReact.state.highlightOn===true) { //flip state of highlight
						 storeReact.setState({highlightOn: false })
					} else {
						 storeReact.setState({highlightOn: true })
					}
					storeReact.highlightOnOff(d.srcElement.attributes.name.value,storeReact.state.highlightOn)
				})
				.on("click",function(d){
					//redo links
					d3.selectAll("line").remove()
					d3.selectAll("circle").remove()
					d3.selectAll("text").remove()

					console.log(Revlinks)
					let returnval = []
					Revlinks.forEach((lk,i) => {
						if (i>20){
							returnval.push(lk)
						}
					})
					Revlinks = returnval
					
					console.log(returnval)
					
					storeReact.rerun()
				});

	  // node tooltip
	  node.append("title")
		  .text(function(d) { return d.Name; });
	  

	  link.append("title")
		  .text(function(d) { //console.log(d3.select(this)._groups[0][0].__data__); 
				return d.source + " - " + d.target; 
		  }) 	
		  
			
	  // visualize the graph
		labels = node.append("text")
			  .text(function(d) {
				return d.Name;
			  })
			  .attr("font-size",8)
			  .attr('x', 8)
			  .attr('y', 6);
			  
	}	

	popup = (elem) => {
		//console.log(elem.__data__)
		this.setState({
			popup: elem.__data__.source.name + "-" +  elem.__data__.target.name,
			isHoveringLink: true,
			hoverLink: elem.__data__
		})
	}

	// update the display based on the forces (but not positions)
	updateDisplay() {
		console.log(link)
		circles
			.attr("r", forceProperties.collide.radius)
			.attr("stroke", this.props.nodeColor)
			.attr("stroke-width", Math.abs(forceProperties.charge.strength)/10)	
	
		link
			.attr("stroke-width", forceProperties.link.enabled ? 2 : .5)
			.attr("stroke",this.props.linkColor)
			.attr("opacity", forceProperties.link.enabled ? 1 : 0);
		
	}

	componentDidMount(){
		//plant svg onto parent component div, div must be loaded first 
		svg = d3.select("#SVGContainer")
			.append("svg")
			.attr("width", width)
			.attr("height", height);
			
		g = svg.append("g") //requried to prevent zoom/drag from crashing svg parent
		this.fixLinkformat();
		this.initializeDisplay();
		this.rerun()
	}
	
	rerun = () => {
		
		this.initializeDisplay();
		this.updateDisplay();
		//initializeSimulation
		  simulation.nodes(this.props.nodes);
		  this.initializeForces();
		  simulation.on("tick", ticked);
	}
	
	//edit data to be readable by force network
	fixLinkformat(){
		this.props.links.forEach((ln) => {
			Revlinks.push({id: ln.source + "-" + ln.target, 
							source: ln.source, 
							target: ln.target})
		})
	}

	// apply new force properties
	updateForces() {
		// get each force by name and update the properties
		simulation.force("center")
			.x(width * forceProperties.center.x)
			.y(height * forceProperties.center.y);
		simulation.force("charge")
			.strength(forceProperties.charge.strength * forceProperties.charge.enabled)
			.distanceMin(forceProperties.charge.distanceMin)
			.distanceMax(forceProperties.charge.distanceMax);
		simulation.force("collide")
			.strength(forceProperties.collide.strength * forceProperties.collide.enabled)
			.radius(forceProperties.collide.radius)
			.iterations(forceProperties.collide.iterations);
		simulation.force("forceX")
			.strength(forceProperties.forceX.strength * forceProperties.forceX.enabled)
			.x(width * forceProperties.forceX.x);
		simulation.force("forceY")
			.strength(forceProperties.forceY.strength * forceProperties.forceY.enabled)
			.y(height * forceProperties.forceY.y);
		simulation.force("link")
			.id(function(d) { return d.EmpID;})
			.distance(forceProperties.link.distance)
			.iterations(forceProperties.link.iterations)
			.links(forceProperties.link.enabled ? Revlinks : []);

		// updates ignored until this is run
		// restarts the simulation (important if simulation has already slowed down)
		simulation.alpha(1).restart();
	}

	
	findNodeLinks = (nameid) => {
		//begins with "name (id)" string
		let foundNodes, convert, id;
		let foundLinks = [];
		
		d3.selectAll(".circle1")._groups[0].forEach((nd)=> {
			convert = nd.attributes.name.value + " (" + nd.attributes.id.value + ")"
			if (convert === nameid){
				foundNodes = nd
				id = nd.attributes.id.value
				selectedNode = nd
			}
		})	
		d3.selectAll("line")._groups[0].forEach((lk) => {
			if ((lk.attributes.source.value === id) | (lk.attributes.target.value === id)){
				foundLinks.push(lk)
			}
		})
		
		return([foundNodes,foundLinks])
	}

	//change opacity
	highlightOnOff = (name,isOn) => {
		let opac_Y, opac_N, id;
			
		if(isOn===true){
			opac_Y = 1;
			opac_N = .2;
		} else {
			opac_Y = 1;
			opac_N = 1;				
		}
		
		//nodes
		d3.selectAll(".circle1")._groups[0].forEach((nd)=> {
			if (nd.attributes.name.value === name){	
				nd.attributes['stroke-opacity'].value = opac_Y 
				id = nd.attributes.id.value
			} else {
				nd.attributes['stroke-opacity'].value = opac_N
			}
		})
		//links
		d3.selectAll("line")._groups[0].forEach((lk) => {
			if ((lk.attributes.source.value === id) | (lk.attributes.target.value === id)){	
				lk.attributes['stroke-opacity'].value = opac_Y
			} else {
				lk.attributes['stroke-opacity'].value = opac_N
			}
		})	
	}
	

	//from nodeselect dropdown
	apply_selectNode = (node1, links1) => {
	
		node1.attributes.stroke.value = "yellow"
		console.log("recenter")
		console.log(this.props.selectedID)
		//center to 
		let cx = +node1.attributes.cx.value - width/2 
		let cy = +node1.attributes.cy.value - height/2
		g.attr("transform","translate(" + -cx + "," + -cy + ")")

		links1.forEach((lk) => {
			lk.attributes.stroke.value="yellow"
		})
	}

	//from modal1	
	apply_nodeColors = () => {
		d3.selectAll(".circle1")._groups[0].forEach((nd)=> {
			nd.attributes.stroke.value = this.props.nodeColor
		})
	}
	
	//from modal2
	apply_linkColors = () => {
		d3.selectAll("line")._groups[0].forEach((lk) => {
			lk.attributes.stroke.value=this.props.linkColor
		})
	}
	
	//from modal3
	apply_nodeLabels = () => {
		if (this.props.toggleLabels!=="Off"){
			node.selectAll("text").remove()		
			labels = node.append("text")
					  .text(function(d) {
						return d.Name;
					  })
					  .attr("font-size",8)
					  .attr('x', 8)
					  .attr('y', 6);
		} else {
			node.selectAll("text").remove()
		}	
	}
	

	//from modal4
	apply_nodecolorCategory = () => {
		const categories = UniqueList(this.props.nodes,this.props.nodeCategory)
		const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
		const colors = categories.map(c => color("#" + genRanHex(6)).lighten(.1))

		//loop through nodes, match category to apply color
		d3.selectAll(".circle1")._groups[0].forEach((nd)=> {
			categories.forEach((cat,index) => {
				if (nd.__data__[this.props.nodeCategory]===cat){
					nd.attributes.stroke.value = colors[index]
				}
			})
		})	
	}
	apply_nodecolorAmt = () => {
		//decimal/integer amount
		let vals=[];
		let maxval = d3.selectAll(".circle1")._groups[0][0].__data__[this.props.nodeCategory];
		let minval = d3.selectAll(".circle1")._groups[0][0].__data__[this.props.nodeCategory];
		let colorpct;
		
		//set array, min, max
		d3.selectAll(".circle1")._groups[0].forEach((nd)=> {
			vals.push(+nd.__data__[this.props.nodeCategory])
			if (+nd.__data__[this.props.nodeCategory]>maxval){maxval = +nd.__data__[this.props.nodeCategory]}
			if (+nd.__data__[this.props.nodeCategory]<minval){minval = +nd.__data__[this.props.nodeCategory]}			
		})	
		
		//apply selected node color
		d3.selectAll(".circle1")._groups[0].forEach((nd)=> {		
			colorpct = (+nd.__data__[this.props.nodeCategory] - minval)/(maxval - minval)
			nd.attributes.stroke.value = color(this.props.nodeColor).lighten(1 - colorpct)
		})
	}
	
	//from modal 5 
	apply_sphereInf = () => {	
		g.selectAll(".sphere1").remove()
		if (this.props.sphereOn==="true"){
			let sphereRadius = 10 * +this.props.sphereRad;
			let sphereNeighborNodes = [];
			let sphereNeighborIDs = [];
			let sphereNeighborLinks = [];
			let sphereNeighborNames= [];
	
			let sphere = g
					.append("circle")
					.attr("class", "sphere1")
					.attr("r", sphereRadius)
					.attr("id","influenceSphere")
					.attr("fill", "black")
					.attr("fill-opacity",.2)
					.attr("cx",selectedNode.attributes.cx.value)
					.attr("cy",selectedNode.attributes.cy.value)
			sphere.lower() //drop behind link/node elements
		
		
		d3.selectAll(".circle1")._groups[0].forEach((nd)=> {
			let nodedist = Math.pow(Math.pow(nd.attributes.cx.value - selectedNode.attributes.cx.value,2)
			                +Math.pow(nd.attributes.cy.value - selectedNode.attributes.cy.value,2),.5)
			if (nodedist < sphereRadius){
				sphereNeighborNodes.push(nd);
				sphereNeighborIDs.push(nd.attributes.id.value);
				sphereNeighborNames.push(nd.attributes.name.value);
			}
		})
		console.log(sphereNeighborIDs);	
		console.log(sphereNeighborNames);	
		
		d3.selectAll("line")._groups[0].forEach(lk => {
			if (IsInVector(sphereNeighborIDs,lk.attributes.source.value)===true &
				IsInVector(sphereNeighborIDs,lk.attributes.target.value)===true){
				sphereNeighborLinks.push(lk)
			}					
		})
		console.log(sphereNeighborLinks);
		}
	}
	
	//make changes when selected node is changed
	renderUpdateSelected(){
		
		if (this.props.selectedID!=="" & this.props.lastClicked==="selectNode"){
			var xx = this.findNodeLinks(this.props.selectedID)
			if (xx[0]){ this.apply_selectNode(xx[0],xx[1]);}
		}
		
		if (this.props.lastClicked==="nodeColor"){
			this.apply_nodeColors()
		}	
		
		if (this.props.lastClicked==="linkColor"){
			this.apply_linkColors()
		}	
		
		if (this.props.lastClicked==="toggleLabels") {
			this.apply_nodeLabels();	
		}		
		
		if (this.props.lastClicked==="sphere" & this.props.selectedID!=="") {
			this.apply_sphereInf();	
		}	
		
		//color nodes by field
		if (this.props.lastClicked==="nodecolorCategory" & this.props.nodeCategory!=="") {
			if (this.props.nodeCategory==="Attribute1" | this.props.nodeCategory==="Attribute2"){
				this.apply_nodecolorCategory()
			} else {
			  this.apply_nodecolorAmt()
			}				
		}	

	}
	
	componentDidUpdate(){
		this.renderUpdateSelected()	
	}
	
	render(){
		return(
			<div>
				<div id="SVGContainer" >
				  <ReactTooltip data-tip data-for="registerTip" id="registerTip" place="top" effect="solid">
					Highlight
				  </ReactTooltip>
				</div>
			{ this.state.isHoveringLink && <div id="NetTable"> Hover Link </div> }
			</div>
		)
	}
}
export default D3ForceNet;


///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
var width = 700,
	height = 600;

var svg;
var g; 
var labels;


var Revlinks = []; //holding array for formatted link data

// values for all forces
var forceProperties = {
    center: {
        x: 0.5,
        y: 0.5
    },
    charge: {
        enabled: true,
        strength: -30,
        distanceMin: 1,
        distanceMax: 1000
    },
    collide: {
        enabled: true,
        strength: .7,
        iterations: 1,
        radius: 5
    },
    forceX: {
        enabled: false,
        strength: .1,
        x: .5
    },
    forceY: {
        enabled: false,
        strength: .1,
        y: .5
    },
    link: {
        enabled: true,
        distance: 30,
        iterations: 1
    }
}

// svg objects
var link, node, circles;

// force simulation
var simulation = d3.forceSimulation();

// update the display positions after each simulation tick
function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    circles
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    labels
        .attr("x", function(d) { return d.x+4; })
        .attr("y", function(d) { return d.y-3; });

    d3.select('#alpha_value').style('flex-basis', (simulation.alpha()*100) + '%');
}

//////////// UI EVENTS ////////////

function dragstarted(event,d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event,d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragended(event,d) {
  if (!event.active) simulation.alphaTarget(0.0001);
  d.fx = null;
  d.fy = null;
}


//add zoom capabilities 
var zoom_handler = d3.zoom()
    .on("zoom", zoom_actions);

function zoom_actions(event){
    g.attr("transform", event.transform)
}