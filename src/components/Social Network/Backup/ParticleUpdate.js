import * as THREE from "three"

/////////////
function ParticleUpdate(particles,globalTime,cycleLen,N){

	for( var v = 0; v < particles.geometry.vertices.length ; v++ ){	
		//for each particle 

			var startTime = globalTime - (particles.TimeStart[v][0]-1) * cycleLen
			var depthPos = (globalTime - (particles.TimeStart[v][0]-1)*cycleLen) 
			var vPos = (depthPos - (v % N)/N) % cycleLen
			
			if (startTime>0 & vPos > 0){
				var line = particles.L_mapping[v]
				particles.geometry.vertices[v] = position(
													line.target,
													line.source,
													vPos,
													cycleLen
												);		
			}								

			
		}
	particles.geometry.verticesNeedUpdate=true	

}
	
	
function position(vertexA,vertexB,t,cyc) {
//flows A to B
		return new THREE.Vector3(
				(vertexA.x*(cyc-t) + vertexB.x*(t))/cyc,
				(vertexA.y*(cyc-t) + vertexB.y*(t))/cyc,
				(vertexA.z*(cyc-t) + vertexB.z*(t))/cyc
			)
}
export default ParticleUpdate