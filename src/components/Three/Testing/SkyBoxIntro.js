import React, {Component} from 'react'
import * as THREE from "three"
//import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import Skybox from "../RenderObjects/Skybox"
import concrete1 from "../Images/concrete1.jpg"
import EarthClouds from "../Images/EarthClouds.png"
//import Metal_Brushed from "../Images/Metal_Brushed.jpg"
import PinkPlanet from "../Images/Pink_Planet.jpg"
import Callisto from "../Images/Callisto.jpg"
import Mercury from "../Images/MercuryNASA.png"

let mirrorSphere;
let frametick = 0;
let spd=1/100;
let cameraDist = 30;

class SkyBoxIntro extends Component {
	constructor(){
		super()
			
	this.clock = new THREE.Clock();
	this.relTime = this.clock.getElapsedTime()
	
	this.animate = this.animate.bind(this);
	this.raycast = this.raycast.bind(this);
	this.onMouseMove = this.onMouseMove.bind(this);
	this.drawSkybox = this.drawSkybox.bind(this);
	this.addLight = this.addLight.bind(this);
	this.drawMirrorSphere = this.drawMirrorSphere.bind(this);
	this.drawFloor = this.drawFloor.bind(this);
	this.stepForward = this.stepForward.bind(this);
	
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75,600 / 600, 0.1,1000);
		this.camera.position.set(0, 10, 10);
		this.camera.lookAt(0,5,0);
		this.renderer = new THREE.WebGL1Renderer();
		
		this.renderer.setSize( 600, 600);		
		//this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		//this.controls.target = new THREE.Vector3(0,5,0);
		
		//set cube at origin
		this.geometryCube = new THREE.BoxGeometry();
		this.materialCube = new THREE.MeshBasicMaterial( { color: 0x32a852});
		this.cube = new THREE.Mesh( this.geometryCube, this.materialCube);
		this.cube.position.set(0,5,0)

		this.mouse = new THREE.Vector2();	
		this.raycaster = new THREE.Raycaster();

	}
	
	//mount objects
	
	componentDidMount(){
		    document.getElementById("ThreeDiv").appendChild( this.renderer.domElement );

			this.scene.add(this.cube)
	
			this.addLight()
			this.drawSkybox()
			this.drawFloor()
			this.drawSphere(80,[-120,5,-120],EarthClouds)
			this.drawSphere(4,[40,5,70],PinkPlanet)
			this.drawSphere(4,[60,5,-50],Callisto)
			
			this.drawSphere(4,[-40,5,50],Mercury)
			
			window.addEventListener("mousemove", this.onMouseMove,false);	
			this.renderer.domElement.addEventListener( 'click', this.raycast, false)
	
			this.renderer.render(this.scene, this.camera);
			
			this.animate() 

	}


	addLight = () => {
		this.light = new THREE.PointLight("#FFFFFF", 1);
		this.light.position.set(10,10,40);
		this.ambientlight = new THREE.AmbientLight("#c9c9c9");
		
		this.scene.add(this.light)
		this.scene.add(this.ambientlight)
	}
	
	drawSkybox = () => {
		let skyb = Skybox(1000);
		console.log(skyb);
		this.scene.add(skyb)
	}

	drawFloor = () => {
	
		  var geo = new THREE.PlaneGeometry(200,200);
		  var texture = new THREE.TextureLoader().load(concrete1);
		  var material = new THREE.MeshStandardMaterial({
			side: THREE.DoubleSide,
			map: texture
		  });
		  var mesh = new THREE.Mesh(geo, material);
		  mesh.receiveShadow = true;
		  mesh.rotation.x = Math.PI/2;

		var planeMaterial = mesh.material
		  planeMaterial.map = texture;
		  planeMaterial.bumpMap = texture;
		  planeMaterial.roughnessMap = texture;
		  planeMaterial.roughness = 0.65;
		  planeMaterial.metalness = 0.75;
		  planeMaterial.bumpScale = 0.01;
		  
		var repetition = 10
		var textures = ['map', 'bumpMap', 'roughnessMap']; 
		textures.forEach((mapName) => {
			planeMaterial[mapName].wrapS = THREE.RepeatWrapping;
			planeMaterial[mapName].wrapT = THREE.RepeatWrapping;
			planeMaterial[mapName].repeat.set(repetition, repetition);
		}); 

		this.scene.add(mesh);
		//
	}

	drawSphere = (size,position,TxtFile) => {
		
		let texture = new THREE.TextureLoader().load(TxtFile);
		let sphereMaterial = new THREE.MeshStandardMaterial({
			map: texture
		  });
		let sphereGeo =  new THREE.SphereGeometry(size, 30, 30);
		let sphereX = new THREE.Mesh(sphereGeo, sphereMaterial);
		sphereX.position.set(position[0],position[1],position[2]);
		sphereX.castShadow = true;	
		
		this.scene.add(sphereX);
	}

	drawMirrorSphere = () => {
		var size = 2

		const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, { 
			format: THREE.RGBFormat, 
			generateMipmaps: true, 
			minFilter: THREE.LinearMipmapLinearFilter 
	    } );

		// Create cube camera
 		this.cubeCamera = new THREE.CubeCamera( 1, 10000, cubeRenderTarget );
		this.cubeCamera.position.set(0,size/2,0);
		this.scene.add( this.cubeCamera );

		let sphereMaterial = new THREE.MeshBasicMaterial( {envMap: this.cubeCamera.renderTarget.texture} ); 

		let sphereGeo =  new THREE.SphereGeometry(size, 30, 30);
		mirrorSphere = new THREE.Mesh(sphereGeo, sphereMaterial);
		mirrorSphere.position.set(5, size/2+1, 0);
		mirrorSphere.castShadow = true;	
		
		this.scene.add(mirrorSphere);
		
	}

	onMouseMove(event){
		//prevent other handlers from firing
		event.preventDefault();
		//adjust for margins
		this.mouse.x = (event.clientX - 200) / 600*2 - 1 ;
		this.mouse.y = -(event.clientY - 50) / 600*2 + 1;
	}
	
	//click event = select mouseover object and start particles
	raycast = () => {
		
		this.raycaster.setFromCamera(this.mouse, this.camera);
		this.intersects = this.raycaster.intersectObjects(this.scene.children);

		if (this.intersects.length>0){

		}
	}


	//animation step
	animate = () => {
		frametick += 1
		requestAnimationFrame(this.animate)
		this.renderer.render(this.scene, this.camera);
		//this.cubeCamera.update( this.renderer, this.scene );
		this.stepForward()
	}	
	
	
	stepForward = () => {
		if (frametick < 300){
			this.camera.position.set(Math.pow(Math.sin(frametick*spd),1)*cameraDist,10,Math.pow(Math.cos(frametick*spd),1)*cameraDist)
			this.camera.lookAt(0,5,0);
		} 
	}
	
	render(){

		return(
		<div id="ThreeDiv" style={{position: "float", width:600, height:600, margin:10}}>
		</div>
		)
	}
}

export default SkyBoxIntro;