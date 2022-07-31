//import * as THREE from "three"
import IsInArray from "../helper_functions/IsInArray"
import IsInVector from "../helper_functions/IsInVector"

function NeighborLinks(clickedNode,Links,depth,isData){
	//create list of links, ordered by distance from clicked node
	
	var treeList=[]
		var linkMap=[] //link index, depth
		var nodeMap=[]
		var nodeMaptemp=[]
		
		//create list of links beginning with node
		//ids are equivalent to name in this dataset

		nodeMap.push(clickedNode.name)
		nodeMaptemp.push(clickedNode.name)	
		

		var d;
		
		for(d=1; d<=depth; d++){
			Links.forEach((ln) => {
				if(isData===true){
					ln.sourceid = ln.source
					ln.targetid = ln.target
				} else {
					ln.sourceid = ln.source.id
					ln.targetid = ln.target.id
				}
				
				if (IsInVector(nodeMap,ln.sourceid)===true || IsInVector(nodeMap,ln.targetid)===true){

						//matched source instead of target and target not in nodemap
						if(IsInVector(nodeMap,ln.targetid)===false){ 
							var xx = Object.assign([],ln)//holding object 
							ln.source = xx.target
							ln.target = xx.source
							ln.sourceid = xx.targetid
							ln.targetid = xx.sourceid
						}
						
						//add node map
						if((IsInVector(nodeMap,ln.sourceid)===false) & (IsInVector(nodeMaptemp,ln.sourceid)===false)){
							nodeMaptemp.push(ln.sourceid); //may have duplicates this way
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
		
	return([treeList,linkMap,nodeMap])
}
export default NeighborLinks		