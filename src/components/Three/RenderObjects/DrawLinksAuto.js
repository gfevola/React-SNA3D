import * as THREE from "three"

function DrawLinksAuto(linksdata){
				console.log(linksdata)
				let fromVertex = linksdata[0].position
				let toVertex = linksdata[1].position
			
			var endpoints = [
						new THREE.Vector3(fromVertex.x,fromVertex.y,fromVertex.z),
						new THREE.Vector3(toVertex.x,toVertex.y,toVertex.z)
					]
			var geom = new THREE.BufferGeometry().setFromPoints(endpoints);
			geom.setAttribute("color", new THREE.BufferAttribute(new Float32Array([.5, 0, 1, 1, 1]), 3));
			
			var mat = new THREE.LineBasicMaterial({
								vertexColors: ["#FFFFFF","#FFFFFF"],
								linewidth: 5,
							});
							
			const line = new THREE.LineSegments(geom, mat);
			return(line)

};
	
export default DrawLinksAuto