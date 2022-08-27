import React, {Component} from 'react'
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"


class LightingTest extends Component {
	constructor(){
		super()
			
	this.animate = this.animate.bind(this);
	this.drawData = this.drawData.bind(this);
	
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75,600 / 600, 0.1,1000);
		this.camera.position.set(0, 0, 10);
		this.renderer = new THREE.WebGL1Renderer();
		
		this.renderer.setSize( 600, 600);		
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		
		this.light = new THREE.PointLight("#FFFFFF", 1);
		this.light.position.set(10,10,40);
		this.ambientlight = new THREE.AmbientLight("#c9c9c9");


		//set cube at origin
		this.geometryCube = new THREE.BoxGeometry();
		this.materialCube = new THREE.MeshBasicMaterial( { color: 0x32a852});
		this.cube = new THREE.Mesh( this.geometryCube, this.materialCube);
	
	}
	
	//mount objects
	
	componentDidMount(){
		    document.getElementById("ThreeDiv").appendChild( this.renderer.domElement );
			this.scene.add(this.light)
			this.scene.add(this.ambientlight)
			this.scene.add(this.cube)
	
			this.drawData()
			
			window.addEventListener("mousemove", this.onMouseMove,false);	
			this.renderer.domElement.addEventListener( 'click', this.raycast, false)
	
			this.renderer.render(this.scene, this.camera);
			
			this.animate() 

	}

	drawData = () => {
		
	}


	//animation step
	animate = () => {
		requestAnimationFrame(this.animate)
		this.renderer.render(this.scene, this.camera);
	}	
	
	
	render(){
		//this.zoom(this.props.selected)
		return(
		<div id="ThreeDiv" style={{position: "float", width:600, height:600, margin:10}}>
		</div>
		)
	}
}

export default LightingTest;