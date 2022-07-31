import React, {Component} from 'react'
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import BarChartArray from "./BarChartArray"
import AddAxes from "./RenderObjects/AddAxes"
import DrawPlane from "./RenderObjects/DrawPlane"

let rects;

class Bar3D extends Component {
	constructor(){
		super()
		
 	this.state = {
		relTime:0
	}
		
	this.clock = new THREE.Clock();

	
	//functions
	this.animate = this.animate.bind(this);
	this.raycast = this.raycast.bind(this);
	this.onMouseMove = this.onMouseMove.bind(this);
	this.drawData = this.drawData.bind(this);
	this.seriesHighlight = this.seriesHighlight.bind(this)	
	this.barGrowth = this.barGrowth.bind(this);
	
	this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75,600 / 600, 0.1,1000);
		this.camera.position.set(-15, 10, 10);

		this.renderer = new THREE.WebGL1Renderer();
		
		this.renderer.setSize( 600, 600);		
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.target = new THREE.Vector3(5,5,5);
		this.controls.update()
		
		this.light = new THREE.PointLight("#FFFFFF", 1);
		this.light.position.set(-50,300,-100);
		this.ambientlight = new THREE.AmbientLight("#c9c9c9");


		this.mouse = new THREE.Vector2();	
		this.raycaster = new THREE.Raycaster();

	}
	
	//mount objects
	
	componentDidMount(){
		    document.getElementById("ThreeDiv").appendChild( this.renderer.domElement );
			this.scene.add(this.light)
			this.scene.add(this.ambientlight)
			
			window.addEventListener("mousemove", this.onMouseMove,false);	
			this.renderer.domElement.addEventListener('mousemove', this.raycast, false)
	
			this.renderer.render(this.scene, this.camera);
	
			this.drawData()			
			this.animate() 

	}

	drawData = () => {
		//floor
		const dataset = [
					{"Category":"A","month":1, "val": 10},
					{"Category":"A","month":2, "val": getRandomInt(10)},
					{"Category":"A","month":3, "val": getRandomInt(10)},
					{"Category":"A","month":4, "val": getRandomInt(10)},
					{"Category":"B","month":1, "val": getRandomInt(10)},
					{"Category":"B","month":2, "val": getRandomInt(10)},
					{"Category":"B","month":3, "val": getRandomInt(10)},
					{"Category":"B","month":4, "val": getRandomInt(10)},	
					{"Category":"C","month":1, "val": getRandomInt(10)},
					{"Category":"C","month":2, "val": getRandomInt(10)},
					{"Category":"C","month":3, "val": getRandomInt(10)},
					{"Category":"C","month":4, "val": getRandomInt(10)},
					{"Category":"D","month":1, "val": getRandomInt(10)},
					{"Category":"D","month":2, "val": getRandomInt(10)},
					{"Category":"D","month":3, "val": getRandomInt(10)},
					{"Category":"D","month":4, "val": getRandomInt(10)},
					{"Category":"A","month":5, "val": getRandomInt(10)},
					{"Category":"A","month":6, "val": getRandomInt(10)},
					{"Category":"A","month":7, "val": getRandomInt(10)},
					{"Category":"A","month":8, "val": getRandomInt(10)},
					{"Category":"B","month":5, "val": getRandomInt(10)},
					{"Category":"B","month":6, "val": getRandomInt(10)},
					{"Category":"B","month":7, "val": getRandomInt(10)},
					{"Category":"B","month":8, "val": getRandomInt(10)},	
					{"Category":"C","month":5, "val": getRandomInt(10)},
					{"Category":"C","month":6, "val": getRandomInt(10)},
					{"Category":"C","month":7, "val": getRandomInt(10)},
					{"Category":"C","month":8, "val": getRandomInt(10)},
					{"Category":"D","month":5, "val": getRandomInt(10)},
					{"Category":"D","month":6, "val": getRandomInt(10)},
					{"Category":"D","month":7, "val": getRandomInt(10)},
					{"Category":"D","month":8, "val": getRandomInt(10)}
				]
	
		//create plane 
		const geometry = new THREE.PlaneBufferGeometry( 50, 50 );
		const material = new THREE.MeshBasicMaterial({color: 0xbcf1c0, 
													  side: THREE.DoubleSide
													});
		const plane = new THREE.Mesh( geometry, material );
		
		plane.rotation.x = 90 * Math.PI/180
		plane.position.set(25,-.1,25)
		
		this.scene.add(plane)		

		//testing - draw plane function
		var plane2 = DrawPlane("Plane2",[50,50],1,[-50,0,0])
		this.scene.add(plane2)
		console.log(plane2)
		
		// add axes with labels, to scale
		let axes = AddAxes("Category","Month",1)
		axes.forEach((ax) => {
			this.scene.add(ax)
		})
	
		// add rectangles
		rects = BarChartArray(dataset,"Category","month");			
		rects.forEach((r) => {
			r.scale.y = 0
			r.ceiling = r.position.y
			r.position.y = 0
			this.scene.add(r);
		})
		
		//start timer
		this.setState({
			reltime: this.clock.getElapsedTime()
		})
	}
	
	onMouseMove(event){
		//prevent other handlers from firing
		event.preventDefault();
		//adjust for margins
		this.mouse.x = (event.clientX - 10) / 600*2 - 1 ;
		this.mouse.y = -(event.clientY - 60) / 600*2 + 1;
	}
	
	//click event = select mouseover object and start particles
	raycast = () => {
		
		this.raycaster.setFromCamera(this.mouse, this.camera);
		this.intersects = this.raycaster.intersectObjects(this.scene.children);

		if (this.intersects.length>0){
			//first intersecting obj
			this.seriesHighlight(this.intersects[0].object)
		}
	}


	//highlight only clicked series
	seriesHighlight = (clickedRect) => {
		//leave only moused category opaque
		if (clickedRect.Category==="Bar"){
			rects.forEach((r) => {
				if (r.HField!==clickedRect.HField){
					this.scene.remove(r);
					r.material.transparent = true
					this.scene.add(r);
				} else {
					this.scene.remove(r);
					r.material.transparent = false
					this.scene.add(r);				
				}
			})
		} else {
			//return all to opaque
			rects.forEach((r) => {
				if (r.HField!==clickedRect.HField){
					this.scene.remove(r);
					r.material.transparent = false
					this.scene.add(r);
				}
			})	
		}
	}

	//animation step
	animate = () => {
		this.barGrowth()
		requestAnimationFrame(this.animate)
		this.renderer.render(this.scene, this.camera);
	}	
	
	//initial animation
	barGrowth = () => {
		if(this.clock.getElapsedTime() - this.state.relTime < 10){
			rects.forEach((r) => {
				if (r.scale.y < 1){r.scale.y +=.03}
				if(r.position.y < r.ceiling){r.position.y += (r.ceiling *.03)}
			})
		} else if (rects[1].scale.y < 1){
			//correct for slowdown
			rects.forEach((r) => {
				if (r.scale.y < 1){r.scale.y +=.03}
				if(r.position.y < r.ceiling){r.position.y += (r.ceiling *.03)}
			})	
		}
	}
	
	render(){
		//this.zoom(this.props.selected)
		return(
		<div id="ThreeDiv" style={{position: "float", width:600, height:600, margin:10}}>
		</div>
		)
	}
}

export default Bar3D;


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



