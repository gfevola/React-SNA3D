import React from "react";

import axios from "axios";

 function ImportAxios(){
	 
	 var axios_data = []
	 
		axios
          .get("http://localhost:8000/api/todos/")
          .then(res => {
				axios_data = res.data }
			)
          .catch(err => console.log(err));
		  
		  console.log("axios");
		  console.log(axios_data);
		  

	return (axios_data)
}	

export default ImportAxios