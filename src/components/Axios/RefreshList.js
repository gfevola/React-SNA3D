 import axios from 'axios'
 
 function RefreshList(path){
	let data=[];	

	//"http://localhost:8000/api/empstate"	

	axios
          .get(path)
          .then(res => {
			  data = res.data
		  })
          .catch(err => console.log(err));
	console.log(data)	  
	return(data);	  
 };
 
export default RefreshList;	