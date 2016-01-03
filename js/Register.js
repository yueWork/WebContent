function Register() {
	console.log("test");
<<<<<<< HEAD
	var userName = $("#userName").val();
	var phone = $("#phone").val();
	var email = $("#email1").val();
	var password0 = $("#password0").val();
	var password1 = $("#password1").val();
	console.log("userName"+userName.length+"phone"+phone.length+"email"+email.length+"password0"+password0.length+"password1"+password1.length);
	if (userName.length != 0 && phone.length != 0 && email.length != 0
			&& password0.length != 0 && password1.length != 0) {
		if(password0 == password1)
			$.ajax({
				url : "/BookStore/Register?userName=" + userName + "&phone="
						+ phone + "&email=" + email + "&password0=" + password0
						+ "&password1=" + password1,
				contentType : "text/json;charset=utf-8",
				type : "POST",
				success : function(data) {
				}
			});
		else
			console.log("密码不一致");
	} else
		console.log("存在参数为空");

=======
	var username=$("#userName").val();

	console.log(username);
	$.ajax({
		url:"/BookStore/Register?userName="+username+"&phone="+phone+"&email="+email+"&password0="+password0+"&password1="+password1,
		contentType:"text/json;charset=utf-8",
		type:"POST",		
		success:function(data){	
		}
	});
>>>>>>> origin/master
}