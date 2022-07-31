import * as THREE from "three"

function DrawLinks(linksdata){

			var endpoints = [
						new THREE.Vector3(linksdata.source.x,linksdata.source.y,linksdata.source.z),
						new THREE.Vector3(linksdata.target.x,linksdata.target.y,linksdata.target.z)
					]
			var geom = new THREE.BufferGeometry().setFromPoints(endpoints);
			geom.setAttribute("color", new THREE.BufferAttribute(new Float32Array([.5, 0, 1, 1, 1]), 3));
			
			var mat = new THREE.LineBasicMaterial({
								vertexColors: ["#FFFFFF","#FFFFFF"]
							});
							
			const line = new THREE.LineSegments(geom, mat);
			return(line)

};
	
export default DrawLinks