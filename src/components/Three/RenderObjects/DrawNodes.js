import * as THREE from "three"


const colors = ["#a3f2f2","#d81564", "#42850d","#8722df", "#eeac2f","#004ea5", 
				"#e3e129", "#841607", "#1b7612","#77ceba", "#ae0000", "#8179a3",
				"#85817b", "#21851e", "#25a6b8", "#bfb7d8", "#a4df50", "#316959"]


function DrawNodes(id,radius,divisions,colorIdx,positioning){
		
		var color = (isNaN(colorIdx)) ? colorIdx : colors[colorIdx % colors.length]
		
		const sphereRadius = radius;
		const sphereWidthDivisions = divisions[0];
		const sphereHeightDivisions = divisions[1];
		const sphereGeo = new THREE.SphereBufferGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
		const sphereMat = new THREE.MeshPhongMaterial({color: color});
		const mesh = new THREE.Mesh(sphereGeo, sphereMat);
		mesh.position.set(positioning[0], positioning[1], positioning[2]);
		mesh.name=id
	return(mesh)		
}
export default DrawNodes;