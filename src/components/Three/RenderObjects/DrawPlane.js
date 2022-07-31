import * as THREE from "three"

//numberofsides, face3 not importing

function DrawPlane(id,dimensions,color,positioning){

		const geometry = new THREE.BoxGeometry( dimensions[0], dimensions[1], 1 );
		const material = new THREE.MeshBasicMaterial({color: 0xffffff
													});
		
		//coloration blend		
		var faceIndices = [ 'a', 'b', 'c', 'd' ];	
		for ( var i = 0; i < geometry.faces.length; i++ ) 
		{
			let face = geometry.faces[ i ];
			// determine if current face is a tri or a quad
			//let numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;
			// assign color to each vertex of current face
			console.log(face)
			for( var j = 0; j < 4; j++ ) 
			{
				let vertexIndex = face[ faceIndices[ j ] ];
				// store coordinates of vertex
				let point = geometry.vertices[ vertexIndex ];
				// initialize color variable
				console.log(point)
				let col = new THREE.Color( color );
				col.setRGB(point.x/dimensions[0], 
								point.y/dimensions[1],
								point.z/dimensions[2]);
				face.vertexColors[ j ] = col;
			}
		}	
		const plane = new THREE.Mesh( geometry, material );

		plane.rotation.x = 90 * Math.PI/180
		plane.position.set(positioning[0] + dimensions[0]/2,
							positioning[1] + -.1,
							positioning[2] + dimensions[2]/2)
		plane.name = id		
		
	return(plane)		
}
export default DrawPlane;