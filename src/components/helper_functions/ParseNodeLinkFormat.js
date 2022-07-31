

function nodelinkdata(data){
	let n=0;
	let m=0;
	let nodearray = [];
	let linkarray = [];
	let emailarray = [];	
	
	data.forEach(d => {
	
		d.node.forEach(function(r,i){
			nodearray.push({
				"EmpID": r.EmpID,
				"Name": r.Name,
				"val": 1,
				"Attribute1": r.Attribute1,
				"Attribute2": r.Attribute2,
				"Grouping": r.nodefields[0].Grouping,
				"CentralityMeasure1": r.nodefields[0].Centrality_Measure1,
				"CentralityMeasure2": r.nodefields[0].Centrality_Measure2,
				"JDMeasure1": r.nodefields[0].JDMeasure1,
				"JDMeasure2": r.nodefields[0].JDMeasure2,
				"JDMeasure3": r.nodefields[0].JDMeasure3,
				"JDMeasure4": r.nodefields[0].JDMeasure4,
				"JDMeasure5": r.nodefields[0].JDMeasure5
			})
		})
		
		d.link.forEach(function(r){
			n = n + 1
			linkarray.push({
				"id":n,
				"index":n,
				"source": r.Sender, 
				"target": r.Recipient,
				"count": r.Count
			})
		})
		
		d.email.forEach(function(r){
			m = m + 1
			emailarray.push({
				"id":m,
				"index":m,
				"date":r.Date,
				"source": r.Sender, 
				"target": r.Recipient,
				"inverted": r.Inverted,
				"count": 1
			})
		})		
		
	})

	return({"nodes": nodearray, "links": linkarray, "emails":emailarray})

}

export default nodelinkdata