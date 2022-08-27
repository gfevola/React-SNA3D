import React, {Component} from 'react'
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

class FractalTHREE extends Component {
	constructor(){
		super()
			
	
	this.animate = this.animate.bind(this);
	this.drawData = this.drawData.bind(this);
	this.changeFrame = this.changeFrame.bind(this);
	
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1,2000);
		this.camera.position.set(1,1,1)
		
		this.renderer = new THREE.WebGL1Renderer();
		this.renderer.setSize( 600, 600);		
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		
		this.light = new THREE.PointLight("#FFFFFF", 1);
		this.light.position.set(10,10,40);
		this.ambientlight = new THREE.AmbientLight("#c9c9c9");

		this.testval = 1
		this.counter = 0
	}
	
	//mount objects
	
	componentDidMount(){
		    document.getElementById("ThreeDiv").appendChild( this.renderer.domElement );
			this.scene.add(this.light)
			this.scene.add(this.ambientlight)

			this.drawData()

			this.renderer.render(this.scene, this.camera);
			
			this.animate() 

	}

	drawData = () => {
	//delete last
	 this.scene.remove(this.mesh)
	
	 this.uniforms = {
		res: {type: 'vec2', value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
		aspect: {type: 'float', value: 1},
		zoom: {type:'float', value: .12},
		offset: {type:'vec2', value: .4},
		testval: {type:'float',value:this.testval},
		pset1: {type:'vec3', value: new THREE.Vector3(1,-.1,-.7)},
		pset2: {type:'vec3', value: new THREE.Vector3(0,-1,-.6)}
	  };

	  let geometry = new THREE.PlaneBufferGeometry(4, 4);
	  let material = new THREE.ShaderMaterial({
		uniforms: this.uniforms,
		fragmentShader: fragmentShaderPlus(),
	  });
	 this.mesh = new THREE.Mesh(geometry, material);
	 //add redraw
	 this.scene.add(this.mesh);	
	}


	//animation step
	animate = () => {
		this.changeFrame()
		requestAnimationFrame(this.animate)
		this.renderer.render(this.scene, this.camera);
	}	
	
	changeFrame = () => {	
		this.counter += .005
		this.testval = 5*Math.sin(this.counter) + 1.5

		this.drawData()
	}
	
	render(){

		return(
		<div id="ThreeDiv" style={{position: "float", width:1000, height:1000, margin:10}}>
		</div>
		)
	}
}

export default FractalTHREE;


//static image
function fragmentShaderPlus(){
  return `
    precision highp float;
    uniform vec2 res;
    uniform float aspect;
	uniform float zoom;
	uniform float offset;
	uniform float testval;
	
    float mandelbrot(vec2 c){
      float alpha = 1.0;
      vec2 z = vec2(0.0 , 0.0);
      for(int i=0; i < 100; i++){  // i < max iterations
		float x_sq = z.x*z.x;
        float y_sq = z.y*z.y;
        vec2 z_sq = vec2(x_sq - y_sq, 1.5*z.x*z.y);

		z = z_sq+ c;
		
        if(x_sq + y_sq > 4.0){
          alpha = float(i)/200.0;
          break;
        }
      }
      return alpha;
    }
  void main(){ // gl_FragCoord in [0,1]
   vec2 uv = zoom * vec2(aspect, 1.0) * gl_FragCoord.xy / res + offset;
 
    float s = 1.0 - mandelbrot(uv);
    vec3 coord = vec3(s, s, s);
	
    gl_FragColor = vec4(pow(coord, vec3(3, 2, 3)), 1);
    }
  `
}


/* function fragmentShaderOrig(){
  return `
    precision highp float;
    uniform vec2 res;
    uniform float aspect;
	uniform float testval;
	
    float mandelbrot(vec2 c){
      float alpha = 1.0;
      vec2 z = vec2(0.0 , 0.0);
      for(int i=0; i < 100; i++){  // i < max iterations
        float x_sq = z.x*z.x;
        float y_sq = z.y*z.y;
        vec2 z_sq = vec2(x_sq - y_sq, testval*z.x*z.y);

		z = z_sq+ c;
		
        if(x_sq + y_sq > 4.0){
          alpha = float(i)/200.0;
          break;
        }
      }
      return alpha;
    }
  void main(){ // gl_FragCoord in [0,1]
    vec2 uv = 4.0 * vec2(aspect, 1.0) * gl_FragCoord.xy / res - 2.0*vec2(aspect, 1.0);
    float s = 1.0 - mandelbrot(uv);
    vec3 coord = vec3(s, s, s);
    gl_FragColor = vec4(pow(coord, vec3(3, 2, 3)), 1);
    }
  `
} */
