//import * as THREE from "three"
import IsInArray from "../helper_functions/IsInArray"
import IsInVector from "../helper_functions/IsInVector"

function Particles(clickedNode,Links,depth){
	//create list of links, ordered by distance from clicked node
	
	var treeList=[]
		var linkMap=[] //link index, depth
		var nodeMap=[]
		var nodeMaptemp=[]
		
		//create list of links beginning with node
		//ids are equivalent to name in this dataset
		
		nodeMap.push(clickedNode.name)
		nodeMaptemp.push(clickedNode.name)
		
		for(var d=1; d<=depth; d++){
			Links.forEach((ln) => {
				
				if (IsInVector(nodeMap,ln.source.id)===true || IsInVector(nodeMap,ln.target.id)===true){
						//matched source instead of target and target not in nodemap
						if(IsInVector(nodeMap,ln.target.id)===false){ 
							var xx = Object.assign([],ln)//holding object 
							ln.source = xx.target
							ln.target = xx.source
						}
						
							//add node map
							if(IsInVector(nodeMap,ln.source.id)===false){
								nodeMaptemp.push(ln.source.id); //may have duplicates this way
							}
								
							//add new link
							if(IsInArray(linkMap,ln.index,0)===false){
								linkMap.push([ln.index,d])
								treeList.push(ln)
							} 
				}

			})
			//add this round's nodeMap to true nodeMap
			nodeMaptemp.forEach((tl) => {
				if(IsInArray(nodeMap,tl,0)===false){
					nodeMap.push(tl); 
				}
			});	
		}

	return([treeList,linkMap])
}
export default Particles		