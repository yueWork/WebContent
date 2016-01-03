function Register(){
	console.log("test");
	var username=$("#userName").val();
	console.log(username);
	$.ajax({
		url:"/BookStore/Register?userName="+username+"&phone="+phone+"&email="+email+"&password0="+password0+"&password1="+password1,
		contentType:"text/json;charset=utf-8",
		type:"POST",		
		success:function(data){	
		}
	});
}