import React, {Component} from 'react'
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import DrawNodes from "./Data/DrawNodes"

import dataSNA from "C:\\Users\\Foureight24\\Desktop\\ProjectFiles\\my-app\\src\\saved_data\\HRNodes_Links.json"


//console.log(dataSNA);
class SNAFixed extends Component {
	constructor(){
		super()
		
		this.state = {
			nodes: dataSNA.nodes,
			links: dataSNA.links,
		}

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1,1000);
		this.camera.position.set(0, 0, 400);
		this.renderer = new THREE.WebGL1Renderer();
		this.renderer.setSize( window.innerWidth, window.innerHeight );		
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		
		this.light = new THREE.PointLight("#FFFFFF", 1);
		this.light.position.set(100,100,40);
		this.ambientlight = new THREE.AmbientLight("#c9c9c9");


		//set cube at origin
		this.geometryCube = new THREE.BoxGeometry();
		this.materialCube = new THREE.MeshBasicMaterial( { color: 0x32a852});
		this.cube = new THREE.Mesh( this.geometryCube, this.materialCube);

	}
	
	//mount variables
	componentDidMount(){
		    document.body.appendChild( this.renderer.domElement );
			this.scene.add(this.light)
			this.scene.add(this.ambientlight)
			this.scene.add(this.cube)
			
			console.log(this.controls)
			
			this.animate()
			this.updateData()
			this.updateLinks()
	}
	//animation step
	animate = () => {
		requestAnimationFrame(this.animate)
		this.renderer.render(this.scene, this.camera);
	}	
	
	//data
		//function to add API data
	updateData = () => {
		var i;
		for (i= 0; i < dataSNA.nodes.length; i++){
		
		const circles = DrawNodes(this.state.nodes[i].Name,
									4,
									[12,12],
									this.state.nodes[i].color,
									[this.state.nodes[i].x,
										this.state.nodes[i].y,
										this.state.nodes[i].z]
								)			
			this.scene.add(circles) 
		}
	}
	updateLinks = () => {
		var j;
		for (j= 0; j < dataSNA.links.length; j++){
			
			var endpoints = [
						new THREE.Vector3(this.state.links[j].source.x,this.state.links[j].source.y,this.state.links[j].source.z),
						new THREE.Vector3(this.state.links[j].target.x,this.state.links[j].target.y,this.state.links[j].target.z)
					]
			var geom = new THREE.BufferGeometry().setFromPoints(endpoints);
			geom.setAttribute("color", new THREE.BufferAttribute(new Float32Array([1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, .5, .5, .5, 1, 0, 1]), 3));
			
			var mat = new THREE.LineBasicMaterial({
								vertexColors: ["#FFFFFF","#FFFFFF"]
							});
							
			const line = new THREE.LineSegments(geom, mat);

			this.scene.add(line);
		}
	}
	
	
	render(){
		return(<div></div>)
		
	}
	
}
export default SNAFixed;