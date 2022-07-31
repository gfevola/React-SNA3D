import React, {Component} from 'react'
import * as THREE from "three"
import smoke1 from "../Images/smoke-1.png"

class CloudBackground extends Component {
	constructor(){
		super()
			
	this.animate = this.animate.bind(this);
	this.raycast = this.raycast.bind(this);
	this.onMouseMove = this.onMouseMove.bind(this);
	this.drawClouds = this.drawClouds.bind(this);
	this.lightningEffect = this.lightningEffect.bind(this);
	this.lightningTimeout = this.lightningTimeout.bind(this);
	
	this.cloudParticles = [];
	
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1,1000);
		this.camera.position.set(0,-20,20);
		this.camera.rotation.x = 1.16;
	    this.camera.rotation.y = -0.12;
		this.camera.rotation.z = 0.27;
		
		this.renderer = new THREE.WebGL1Renderer();
		this.renderer.setSize( 600, 600);		
	
		this.scene.fog = new THREE.FogExp2(0x03544e, 0.001);
		
		this.mouse = new THREE.Vector2();	
		this.raycaster = new THREE.Raycaster();

	}
	
	//mount objects
	
	componentDidMount(){
		    document.getElementById("ThreeDiv").appendChild( this.renderer.domElement );
	
			this.drawClouds()
			this.setLighting()
			
			window.addEventListener("mousemove", this.onMouseMove,false);	
			this.renderer.domElement.addEventListener( 'click', this.raycast, false)
	
			this.renderer.render(this.scene, this.camera);
			
			this.animate() 

	}

	drawClouds = () => {
		let cloudGeo;
		let cloudMaterial;
		
		let texture = new THREE.TextureLoader().load(smoke1)

		cloudGeo = new THREE.PlaneBufferGeometry(500,500);
		cloudMaterial = new THREE.MeshLambertMaterial({
			  map: texture,
			  transparent: true
		});

		//each cloud
		for (var p=0;p<50;p++){
		 let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
		  cloud.position.set(
			Math.random()*800 - 400,
			500,
			Math.random()*500 - 500
		  );

		  cloud.rotation.x = 1.16;
		  cloud.rotation.y = -0.12;
		  cloud.rotation.z = Math.random()*2*Math.PI;
		  cloud.material.opacity = 0.55;
		  this.cloudParticles.push(cloud);
		  this.scene.add(cloud);
		}
		
	}

	lightningEffect = () => {

		this.flashLight = new THREE.PointLight(0xf6f6bc,50,450,1.7);
		this.flashLight.position.set(Math.random()*300-150,
									300,
									Math.random()*300-150);
		this.scene.add(this.flashLight)	
		
		setTimeout(this.lightningTimeout,120)
	}
	
	lightningTimeout = () =>{
		this.scene.remove(this.flashLight)
	}

	setLighting = () => {
				
		let directionalLight = new THREE.DirectionalLight(0xff8c19);
		directionalLight.position.set(0,0,1);
		let ambientlight = new THREE.AmbientLight("#c9c9c9");

		let orangeLight = new THREE.PointLight(0xcc6600,50,450,1.7);
		orangeLight.position.set(200,300,100);

		let redLight = new THREE.PointLight(0xd8547e,50,450,1.7);
		redLight.position.set(100,300,100);

		let blueLight = new THREE.PointLight(0x3677ac,50,450,1.7);
		blueLight.position.set(300,300,200);

			
		this.scene.add(directionalLight)
		this.scene.add(ambientlight)
		this.scene.add(orangeLight)
		this.scene.add(redLight)
		this.scene.add(blueLight)
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
			this.lightningEffect()
		}

	}


	//animation step
	animate = () => {
		this.cloudParticles.forEach(cl => {
			cl.rotation.z +=.001
		})

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

export default CloudBackground;