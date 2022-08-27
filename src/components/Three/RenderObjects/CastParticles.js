import * as THREE from "three"
	
function CastParticles(N,origPosn,destPosn){	
	//geometry
	var particleGeometry = new THREE.Geometry()	

 	
	particleGeometry.primaryPosition = [];
	particleGeometry.direction = []; 

	let positions = [];
	
	for (var i = 0; i < N; i++){
		let posn = randPosition(10)
		let dirn = randPosition(3)

		positions.push(...posn)
		
 		particleGeometry.primaryPosition.push(
			posn
		);
		particleGeometry.direction.push(
			dirn
		);
		
		particleGeometry.vertices.push( new THREE.Vector3(1,1,1) )
		
	}
	
	//new style
	/* 
	particleGeometry.setAttribute(
			  'position',
			  new THREE.BufferAttribute(new Float32Array(positions), 3)
	); */
		

return(particleGeometry)
	
};

export default CastParticles;


function randPosition(c) {
	
	let xval = (Math.random()-.5) * c;
	let yval = (Math.random()-.5) * c;
	let zval = (Math.random()-.5) * c;
	let xvaladj = xval/Math.pow(Math.pow(xval,2)+Math.pow(yval,2)+Math.pow(zval,2),.5)*c - 5
	let yvaladj = yval/Math.pow(Math.pow(xval,2)+Math.pow(yval,2)+Math.pow(zval,2),.5)*c
	let zvaladj = zval/Math.pow(Math.pow(xval,2)+Math.pow(yval,2)+Math.pow(zval,2),.5)*c - 5
	
	//let newpos = new THREE.Vector3(xvaladj,yvaladj,zvaladj)
	let newpos = [xvaladj,yvaladj,zvaladj]
  return newpos
};

