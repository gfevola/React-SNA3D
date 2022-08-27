import React, {Component} from 'react'
import * as THREE from "three"
import Draw_Sphere from "./Draw_Sphere"
import axios from "axios"
import EmptyDiv from "./EmptyDiv"

//import Axios3dParse from "../Axios/Axios3dParse"

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
//import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

const colors = ["#a3f2f2", "#42850d","#004ea5","#8722df", "#77ceba", "#ae0000",
				"#a3f2f2", "#42850d","#004ea5","#8722df", "#77ceba", "#ae0000"]


	  // === THREE.JS CODE START ===
	  //const canvas = document.querySelector('#c');
	  //const renderer = new THREE.WebGLRenderer({canvas});

	  const fov = 45;
	  const aspect = 2;  // the canvas default
	  const near = 0.1;
	  const far = 100;
	  //const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	  //camera.position.set(0, 50, 0);

	  //const controls = new OrbitControls(camera, canvas);
	  //controls.target.set(0, 0, 0);
	  //controls.update();

	  //const scene = new THREE.Scene();
	  //scene.background = new THREE.Color('black');


class THREETest extends Component {
	constructor(){
		super()
		this.state = {
			canvas: {},
			canvas1: {},
			renderer: [],
			camera: new THREE.PerspectiveCamera(fov, aspect, near, far),
			controls: [],
			scene:new THREE.Scene(),
			vals: [],
		}
		this.refreshList = this.refreshList.bind(this);
		this.renderScene = this.renderScene.bind(this);
		this.resizeRendererToDisplaySize = this.resizeRendererToDisplaySize.bind(this);
	}
	
	 ///api data request	
      refreshList = () => {
        axios
          .get("http://localhost:8000/sna/network1")
          .then(res => {
			  console.log(res.data);
			  //not yet helping
			  //let dd = Axios3dParse(res.data,"qwerty",false);
			  this.setState({
					vals: res.data,
			  })
		  })
          .catch(err => console.log(err));
		  	 
      };

	//function2
	  resizeRendererToDisplaySize(renderer) {
		const canvas = this.state.renderer.domElement;
		const width = this.state.canvas.clientWidth;
		const height = this.state.canvas.clientHeight;
		const needResize = this.state.canvas.width !== width || this.state.canvas.height !== height;
		if (needResize) {
		  this.state.renderer.setSize(width, height, false);
		}
		return needResize;
	  }
	  
	//function3	
	  renderScene() {

		if (this.resizeRendererToDisplaySize()) {
		  const canvas = this.state.renderer.domElement;
		  this.state.camera.aspect = this.state.canvas.clientWidth / this.state.canvas.clientHeight;
		  this.state.camera.updateProjectionMatrix();
		}
		this.state.renderer.render(this.state.scene, this.state.camera);
		requestAnimationFrame(this.render);
	  }

	  
	componentDidMount() {
		
		this.setState({
			canvas: document.querySelector('#c'),
			canvas1: new EmptyDiv(),
		})
		
		console.log(this.state);
		console.log(document.querySelector('#c'));
		
		this.setState({
			renderer: new THREE.WebGLRenderer(this.state.canvas),
			controls: new OrbitControls(this.state.camera, this.state.canvas),
		});
			//
			this.refreshList();

			var i;
			for (i= 0; i < 10; i++){
				const circles=Draw_Sphere(2,
										[12,12],
										colors[i],
										[this.state.vals.Xvalue,this.state.vals.Yvalue,this.state.vals.Zvalue]
									)		  
				this.scene.add(circles)
			}

			
		  {
			const color = 0xFFFFFF;
			const intensity = 1;
			const light = new THREE.PointLight(color, intensity);
			light.position.set(100,100,40);
			this.scene.add(light);
			
			const ambLight = new THREE.AmbientLight(color,intensity/2);
			this.scene.add(ambLight);
		  }

		  requestAnimationFrame(this.render);
					

	}

	
  render() {
    return (
		<div>
			<canvas id="c"></canvas>
		</div>
    )
  }

}

export default THREETest
//<div ref={ref => (this.mount =  ref)} />