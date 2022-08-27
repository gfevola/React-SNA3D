import * as THREE from "three"
	
function MoveParticles(particles,from_dest, to_dest, intr){	
	
	for( var v = 0; v < particles.geometry.vertices.length ; v++ ){	
	
		particles.geometry.vertices[v] = getPosition(
												particles.geometry.primaryPosition[v],
												from_dest,
												to_dest,
												particles.geometry.direction[v],
												intr
											)
	}

	particles.geometry.verticesNeedUpdate=true	
	
};

export default MoveParticles;


function getPosition(prevPos,vFrom, vTo, variables, intr) {

	intr = intr - (variables[0]*40)

	var diffX = (vTo.x - vFrom.x)
	var diffY = (vTo.y - vFrom.y)
	var diffZ = (vTo.z - vFrom.z)	

	if (vTo.x!==vFrom.x) {var tx = Math.abs(intr/diffY/diffZ) % diffX} else {tx = 0}
	if (vTo.y!==vFrom.y) {var ty = Math.abs(intr/diffX/diffZ) % diffY} else {ty = 0}
	if (vTo.z!==vFrom.z) {var tz = Math.abs(intr/diffY/diffX) % diffZ} else {tz = 0}

	var endptX = tx / diffX
	var endptY = ty / diffY
	var endptZ = tz / diffZ

	if (vTo.x < vFrom.x) { var signX= -1} else {signX = 1}
	if (vTo.y < vFrom.y) { var signY= -1} else {signY = 1}
	if (vTo.z < vFrom.z) { var signZ= -1} else {signZ = 1}	

	//return vector
	let newpos = new THREE.Vector3(
		vFrom.x + signX * (tx + Math.sin(endptX*Math.PI)*variables[0]),
		vFrom.y + signY * (ty + Math.sin(endptY*Math.PI)*variables[1]),
		vFrom.z + signZ * (tz + Math.sin(endptZ*Math.PI)*variables[2])
	)

  return newpos
};
