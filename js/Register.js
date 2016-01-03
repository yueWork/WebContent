function Register(){
	
	$.ajax({
		url:"/BookStore/Login?userName="+username+"&password="+password,
		contentType:"text/json;charset=utf-8",
		type:"POST",		
		success:function(data){	
		}
	})
}