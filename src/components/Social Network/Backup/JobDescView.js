import React, {Component} from 'react'
import * as THREE from "three"
import DrawNodes from "./Data/DrawNodes"
import axios from "axios"
import {Button} from 'react-bootstrap'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"


///////////////////////////////////////////
class THREE_Example2 extends Component{
  constructor(props){
    super(props)
	this.state = {
		vals:[],
	}
	this.updateData = this.updateData.bind(this);
	this.refreshList = this.refreshList.bind(this);
	this.onMouseMove = this.onMouseMove.bind(this);
	
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1,1000);
    this.renderer = new THREE.WebGL1Renderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
	
	//set cube at origin
    this.geometry = new THREE.BoxGeometry();
    this.material = new THREE.MeshBasicMaterial( { color: 0x32a852});
    this.cube = new THREE.Mesh( this.geometry, this.material);
	
	this.light = new THREE.PointLight("#FFFFFF", 1);
	this.light.position.set(100,100,40);
	this.ambientlight = new THREE.AmbientLight("#c9c9c9");	
	
	this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  
	this.raycaster = new THREE.Raycaster();
	this.mouse = new THREE.Vector2();
	
	this.canvas1 = document.createElement('canvas');
	this.context1 = this.canvas1.getContext('2d');
	
  } 
  
  animate = () => {
	
	this.raycaster.setFromCamera(this.mouse, this.camera);
	this.intersects = this.raycaster.intersectObjects(this.scene.children);
		for  (var t=0; t < this.intersects.length; t++){
			
			console.log(this.intersects[0].object);
			//this.intersects[t].object.material.color.set(0xff0000);cont
				var message = this.intersects[ 0 ].object.name;
				var metrics = this.context1.measureText(message);
	
				this.context1.clearRect(0,0,window.innerWidth,window.innerHeight);
				this.context1.fillRect( 0,0, metrics.width+8,20+8);
				this.context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
				this.context1.fillText( message, 4,20 );
				
				//this.scene.add(this.context1);
		}	

	requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera);
	

  }
  
	 ///api data request	
    refreshList = () => {
        axios
          .get("http://localhost:8000/sna/network1")
          .then(res => {
			  this.setState({
					vals: res.data,
			  })
		  })
          .catch(err => console.log(err));
      }; 
 
  
  componentDidMount() {
        document.body.appendChild( this.renderer.domElement );
        this.scene.add( this.cube );
        this.camera.position.set(20,20,0);
        this.animate()
		this.scene.add(this.light);

		window.addEventListener("mousemove", this.onMouseMove,false);
		this.refreshList()  
    }
	
	//function to add API data
	updateData = () => {
	
		var i;
		for (i= 0; i < 300; i++){
					//
			const circles=DrawNodes(this.state.vals[i].id,
									.5,
									[12,12],
									+this.state.vals[i].Attribute1,
									[this.state.vals[i].Xvalue,
										this.state.vals[i].Yvalue,
										this.state.vals[i].Zvalue]
								)		  
			this.scene.add(circles)
			
		}

	}
	
	onMouseMove(event){
		//prevent other handlers from firing
		event.preventDefault();
		
		this.mouse.x = (event.clientX / window.innerWidth)*2 - 1;
		this.mouse.y = -(event.clientY / window.innerHeight)*2 + 1;
	}

  render(){

    return(
      <div id='document-body-01'>
		<Button onClick={this.updateData}>Update </Button>
      </div>
    );
  }
}

export default THREE_Example2;