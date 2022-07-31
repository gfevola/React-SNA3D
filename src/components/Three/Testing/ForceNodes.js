import React, {Component} from 'react'
import * as THREE from "three"
import * as d3 from 'd3'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import CastParticles from "../RenderObjects/CastParticles"
import MoveParticles from "../RenderObjects/MoveParticles"

import DrawNodes from "../RenderObjects/DrawNodes"
import DrawLinksAuto from "../RenderObjects/DrawLinksAuto"

	let circlesAll = [];
	let linksAll = [];
	let links = [{id: "link1", source:1,target:2},
				{id: "link2", source:2,target:3}]
	

	const uniforms = {
	  u_resolution: { value: { x: null, y: null } },
	  u_time: { value: 0.0 },
	  u_mouse: { value: { x: null, y: null } },
	}

class ForceNodes extends Component {
	
	constructor(){
		super()
	
		this.state = {
			particles: [],
		}
			
		//functions
		this.drawObjs = this.drawObjs.bind(this);
		this.animate = this.animate.bind(this);
	
		this.initializeForces = this.initializeForces.bind(this);
		this.updateForces = this.updateForces.bind(this);
	
		this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera(75,800 / 800, 0.1,1000);
			this.camera.position.set(20, 0, -5);

		this.clock = new THREE.Clock();

			this.renderer = new THREE.WebGL1Renderer();
			
			this.renderer.setSize( 800, 800);		
			this.controls = new OrbitControls(this.camera, this.renderer.domElement);
			this.controls.target = new THREE.Vector3(5,5,5);
			this.controls.update()
			
			this.light = new THREE.PointLight("#FFFFFF", 1);
			this.light.position.set(-50,300,-100);
			this.ambientlight = new THREE.AmbientLight("#c9c9c9");

	}
	
	componentDidMount(){
		    document.getElementById("ForceDiv").appendChild( this.renderer.domElement );
			this.scene.add(this.light)
			this.scene.add(this.ambientlight)

			this.renderer.render(this.scene, this.camera);
	
			this.drawObjs()	
		
			this.animate() 
	}
	

	drawObjs = () => {
		
		for (var i= 0; i < 6; i++){
			const circles = DrawNodes(i,
									1,
									[12,12],
									i,
									[i*3,0,0]
								)	
			this.scene.add(circles) 
			circlesAll.push(circles)
		}
			

		let ls;
		let lt;
		for (var j= 0; j < links.length; j++){
			circlesAll.forEach(nd => {
				if (String(links[j].source) === String(nd.name)){
					ls = nd
				} else if (String(links[j].target) === String(nd.name)){
					lt = nd
				}
			})
			var links1 = DrawLinksAuto([ls,lt]);
				
			this.scene.add(links1);
			linksAll.push(links)
		}

	}

	initializeForces = () => {
		simulation
			.force("link", d3.forceLink())
			.force("charge", d3.forceManyBody())
			.force("collide", d3.forceCollide())
			.force("center", d3.forceCenter())
			.force("forceX", d3.forceX())
			.force("forceY", d3.forceY());
	}

	updateForces = () => {
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
	}

	animate = () => {

		uniforms.u_time.value = this.clock.getElapsedTime();
		
		requestAnimationFrame(this.animate)
		this.renderer.render(this.scene, this.camera);
		
		//circlesAll[2].position.y += .01
	}	
		
	render(){
		//this.zoom(this.props.selected)
		return(
		<div>
			<div id="ForceDiv" style={{position: "float", width:800, height:700, margin:10}}>
			</div>
		</div>
		)
	}
}

export default ForceNodes;


// force simulation
var simulation = d3.forceSimulation();

var width = 700,
	height = 600;

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
