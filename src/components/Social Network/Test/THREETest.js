import React, {Component} from 'react'
import * as THREE from "three"
import Draw_Sphere from "./Draw_Sphere"
import axios from "axios"
//import Axios3dParse from "../Axios/Axios3dParse"

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
//import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

const colors = ["#a3f2f2", "#42850d","#004ea5","#8722df", "#77ceba", "#ae0000"]



class THREETest extends Component {
	constructor(){
		super()
		this.state = {
			vals: [],
		}
		this.refreshList = this.refreshList.bind(this);
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
	  
	componentDidMount() {

			// === THREE.JS CODE START ===
				  const canvas = document.querySelector('#c');
				  const renderer = new THREE.WebGLRenderer({canvas});

				  const fov = 45;
				  const aspect = 2;  // the canvas default
				  const near = 0.1;
				  const far = 100;
				  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
				  camera.position.set(0, 50, 0);

				  const controls = new OrbitControls(camera, canvas);
				  controls.target.set(0, 0, 0);
				  controls.update();

				  const scene = new THREE.Scene();
				  scene.background = new THREE.Color('black');

			//
			this.refreshList();
			
			//add circles
			var i;
			for (i= 0; i < 10; i++){
				const circles=Draw_Sphere(2,[12,12],colors[i],[0+i*4,0+i*3,0+i])		  
				scene.add(circles)
			}
		  {
			const color = 0xFFFFFF;
			const intensity = 1;
			const light = new THREE.PointLight(color, intensity);
			light.position.set(100,100,40);
			scene.add(light);
			
			const ambLight = new THREE.AmbientLight(color,intensity/2);
			scene.add(ambLight);
		  }

		  function resizeRendererToDisplaySize(renderer) {
			const canvas = renderer.domElement;
			const width = canvas.clientWidth;
			const height = canvas.clientHeight;
			const needResize = canvas.width !== width || canvas.height !== height;
			if (needResize) {
			  renderer.setSize(width, height, false);
			}
			return needResize;
		  }

		  function render() {

			if (resizeRendererToDisplaySize(renderer)) {
			  const canvas = renderer.domElement;
			  camera.aspect = canvas.clientWidth / canvas.clientHeight;
			  camera.updateProjectionMatrix();
			}

			renderer.render(scene, camera);

			requestAnimationFrame(render);
		  }

		  requestAnimationFrame(render);
					
					//renderer.setSize( window.innerWidth, window.innerHeight );
					//this.mount.appendChild(renderer.domElement);
					

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