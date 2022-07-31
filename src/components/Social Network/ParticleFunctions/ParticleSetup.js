//import React, {Component} from 'react'
import * as THREE from "three"
//import ParticleUpdate from "./ParticleUpdate"


function ParticleSetup(lines,TimeMapping,N_part){
	//create N particles for each line
	
	//geometry
	var particleGeometry = new THREE.BufferGeometry()	
	var a = 0
	lines.forEach((ln)=> {
		var px = ln.source.x
		var py = ln.source.y
		var pz = ln.source.z

		for (var i = 0; i < N_part; i++){
			particleGeometry.vertices.push( new THREE.Vector3(px,py,pz) );
		}
		
	})
	
	//material
	var pMaterial = new THREE.PointsMaterial({
		color: 0x00FF00,
		size: .4,
		blending: THREE.AdditiveBlending,
		transparent: true
	})	
	
	//finished particle object
	var particles = new THREE.Points(particleGeometry,pMaterial)
	
	//add lines to javascript THREE object
	particles.L_mapping = []
	particles.TimeStart = []
	lines.forEach((ln) => {
		for (var i = 0; i < N_part; i++){
			particles.L_mapping.push(ln)
			particles.TimeStart.push([TimeMapping[a][1],i]) //capture depth and particle N
		}		
		a = a + 1
	})

	return(particles);
}

	

export default ParticleSetup;