import * as THREE from "three"

function DrawSimpleLine(id,EndpointDimA,EndpointDimB,colorHex){
	
		var endpoints = [
							new THREE.Vector3(EndpointDimA[0],EndpointDimA[1],EndpointDimA[2]), 
							new THREE.Vector3(EndpointDimB[0],EndpointDimB[1],EndpointDimB[2])
						]
		var geom = new THREE.BufferGeometry().setFromPoints(endpoints);
		var mat = new THREE.LineBasicMaterial({ color: colorHex});
						
		const line = new THREE.LineSegments(geom, mat);
		
		return(line)
};
export default DrawSimpleLine;