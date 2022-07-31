import * as THREE from "three"
import boxImg_ft from "../Images/corona_ft.png"
import boxImg_bk from "../Images/corona_bk.png"
import boxImg_lf from "../Images/corona_lf.png"
import boxImg_rt from "../Images/corona_rt.png"
import boxImg_up from "../Images/corona_up.png"
import boxImg_dn from "../Images/corona_dn.png"

function Skybox(dist){
	
	//must be correct order
	let imgArray = [boxImg_ft, boxImg_bk,
					boxImg_up, boxImg_dn,
					boxImg_rt, boxImg_lf]
	let materialArray = [];
	
	let skyboxGeo = new THREE.BoxGeometry(dist,dist,dist)
	imgArray.forEach(img => {
		let texture = new THREE.TextureLoader().load(img)
		materialArray.push(new THREE.MeshBasicMaterial({map: texture}))	
	})
	for (var i=0; i<6; i++){
		materialArray[i].side = THREE.BackSide
	}

	let skyboxObj = new THREE.Mesh(skyboxGeo,materialArray);

	return(skyboxObj)

}
export default Skybox;

