import React, {Component} from 'react'
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import CastParticles from "./RenderObjects/CastParticles"
import MoveParticles from "./RenderObjects/MoveParticles"

import DrawNodes from "./RenderObjects/DrawNodes"
import {Button} from 'react-bootstrap'


	let iter = 0
	let part = []

	const circle1 = DrawNodes("A",2,[12,12],"#FFAABB",[-10,15,-3])	
	const circle2 = DrawNodes("B",2,[12,12],"#1F87CD",[-20,0,3])	
		
	const uniforms = {
	  u_resolution: { value: { x: null, y: null } },
	  u_time: { value: 0.0 },
	  u_mouse: { value: { x: null, y: null } },
	}

class ParticleFlow extends Component {
	
	constructor(){
		super()
	
		this.state = {
			particles: [],
		}
			
		//functions
		this.drawData = this.drawData.bind(this);
		this.animate = this.animate.bind(this);
	
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
		    document.getElementById("ParticleDiv").appendChild( this.renderer.domElement );
			this.scene.add(this.light)
			this.scene.add(this.ambientlight)

			this.renderer.render(this.scene, this.camera);
	
			this.drawData()	
			this.drawMesh()
			
			this.animate() 
	}
	
	drawData = () => {
			
		this.scene.add(circle1)
		this.scene.add(circle2)
		//create points geometry
		let pointGeom = CastParticles(40, circle1.position, circle2.position)
		console.log(pointGeom)
		
		//material	
		var pMaterial = new THREE.PointsMaterial({
			color: 0xc0F301,
			size: .4,
			blending: THREE.AdditiveBlending,
			transparent: true
		})	

		part = new THREE.Points(pointGeom,pMaterial)

		this.scene.add(part)

		MoveParticles(part, circle1.position ,circle2.position, iter)

	}

	drawMesh = () => {
		// define geometry and material
		const geometry = new THREE.BoxGeometry(1,1,1);
		const material = new THREE.ShaderMaterial({
		  vertexShader: vShader,
		  fragmentShader: fShader,
		  uniforms
		});
		// mesh 'em together
		const cube = new THREE.Mesh(geometry, material);
		// add to scene
		this.scene.add( cube );	
	}
	
	animate = () => {
		iter += 1
		MoveParticles(part,circle1.position, circle2.position, iter)
	
		uniforms.u_time.value = this.clock.getElapsedTime();
		
		requestAnimationFrame(this.animate)
		this.renderer.render(this.scene, this.camera);

	}	
		
	render(){
		//this.zoom(this.props.selected)
		return(
		<div>
			<div id="ParticleDiv" style={{position: "float", width:800, height:700, margin:10}}>
			</div>
		</div>
		)
	}
}

export default ParticleFlow;


const vShader = `
  varying vec2 v_uv;
  void main() {
     v_uv = uv;
     gl_Position = projectionMatrix * modelViewMatrix *    vec4(position, 1.0);
}`

const fShader = `
  varying vec2 v_uv;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform vec3 u_color;
  uniform float u_time;
void main() {
    vec2 v = u_mouse / u_resolution;
    vec2 uv = gl_FragCoord.xy / u_resolution;
    gl_FragColor = vec4(1.0, 0.0, sin(u_time * 5.0) + 0.5, 1.0).rgba;
}
`