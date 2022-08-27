
//requires hardcoded fields to pass through
//will need to add in id
function LinkNodeMerge(pureData){
	
	let linksFull=[];
	let tempNode1;
	let tempNode2;
	let n=0;

	pureData.link.forEach((lk) => {
		n += 1
		pureData.node.forEach((nd)=> {
			if(lk.Sender===nd.EmpID){
				tempNode1=nd
			} else if(lk.Recipient===nd.EmpID) {
				tempNode2=nd
			}
		})

		linksFull.push({
			Key: n,
			index: n,
			source: lk.Sender,
			target: lk.Recipient,
			DeptSource: tempNode1.Attribute1,
			DeptTarget: tempNode2.Attribute1,
			Count: +lk.Count
		})
		tempNode1 = [];
		tempNode2 = [];
	})
	return(linksFull)
}
export default LinkNodeMerge