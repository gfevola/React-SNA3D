import React, {Component} from 'react'
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import ParticleSetup from "./ParticleSetup"
import ParticleUpdate from "./ParticleUpdate"
import DrawLinks from "./Data/DrawLinks"
import DrawNodes from "./Data/DrawNodes"
import Particles from "./Particles"
import SNASidebar from "./SNASidebar"

import dataSNA from "C:\\Users\\Foureight24\\Desktop\\ProjectFiles\\my-app\\src\\saved_data\\HRNodes_Links Sample.json"

class SNAParticle extends Component {
	constructor(){
		super()
		
	this.state = {
		particles: [],
		treeList: [],
	}		
	this.clock = new THREE.Clock();
	this.relTime = this.clock.getElapsedTime()
	
	this.animate = this.animate.bind(this);
	//this.animateParticle = this.animateParticle.bind(this);
	this.raycast = this.raycast.bind(this);
	this.onMouseMove = this.onMouseMove.bind(this);
	this.drawData = this.drawData.bind(this);
	this.nodeClick = this.nodeClick.bind(this);
	
	
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75,800 / 800, 0.1,1000);
		this.camera.position.set(0, 0, 20);
		this.renderer = new THREE.WebGL1Renderer();
		
		this.renderer.setSize( 800, 800);		
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		
		this.light = new THREE.PointLight("#FFFFFF", 1);
		this.light.position.set(10,10,40);
		this.ambientlight = new THREE.AmbientLight("#c9c9c9");


		//set cube at origin
		this.geometryCube = new THREE.BoxGeometry();
		this.materialCube = new THREE.MeshBasicMaterial( { color: 0x32a852});
		this.cube = new THREE.Mesh( this.geometryCube, this.materialCube);
	

		this.mouse = new THREE.Vector2();	
		this.raycaster = new THREE.Raycaster();

	}
	
	//mount objects
	componentDidMount(){
		    document.getElementById("SNAObject").appendChild( this.renderer.domElement );
			this.scene.add(this.light)
			this.scene.add(this.ambientlight)
			this.scene.add(this.cube)
	
			
			this.drawData()
			
			window.addEventListener("mousemove", this.onMouseMove,false);	
			this.renderer.domElement.addEventListener( 'click', this.raycast, false)
	
			this.renderer.render(this.scene, this.camera);
			
			
			this.animate() 

	}

	onMouseMove(event){
		//prevent other handlers from firing
		event.preventDefault();
		//adjust for margins
		this.mouse.x = (event.clientX - 200) / 800*2 - 1 ;
		this.mouse.y = -(event.clientY - 50) / 800*2 + 1;
	}
	
	//click event = select mouseover object and start particles
	raycast = () => {
		
		this.raycaster.setFromCamera(this.mouse, this.camera);
		this.intersects = this.raycaster.intersectObjects(this.scene.children);

		if (this.intersects.length>0){
			this.relTime = this.clock.getElapsedTime()
			
			//start unpacking list of lines to animate
			this.nodeClick(this.intersects[0].object)
			
		}
	}

	//drawData
	drawData = () => {
		var i;

		for (i= 0; i < dataSNA.nodes.length; i++){
			const circles = DrawNodes(dataSNA.nodes[i].id,
									2,
									[12,12],
									i,
									[dataSNA.nodes[i].x,
										dataSNA.nodes[i].y,
										dataSNA.nodes[i].z]
								)									
			this.scene.add(circles) 
		}
		/////
		var j;
		for (j= 0; j < dataSNA.links.length; j++){
			const links = DrawLinks(dataSNA.links[j]);
				
			this.scene.add(links);
		}
	}

	//create particles
	nodeClick = (clickedNode) => {
	
		var depth = 4
		//set up particles in Particles function
		var parts = Particles(clickedNode,dataSNA.links,depth)
		this.setState({
			treeList: parts[0], //not sure if needed anymore
			particles: ParticleSetup(parts[0],parts[1],10),
		})

		this.scene.add(this.state.particles)		
		
	}

	//animation step
	animate = () => {
		
		//send particles, corresp. lines to update function
		if (this.state.treeList.length>0){
			ParticleUpdate(this.state.particles,this.clock.getElapsedTime() - this.relTime,2,10)
		}
		
		//if (this.clock.getElapsedTime()<5){console.log(this.state.particles)}
		
		requestAnimationFrame(this.animate)
		this.renderer.render(this.scene, this.camera);
	}	
	

	
	render(){

		return(
		<div id="SNAObject" style={{position: "fixed", marginLeft:200, width:800, height:800}}>
		</div>
		)
	}
}

export default SNAParticle;