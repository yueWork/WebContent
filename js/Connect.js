function Connect(){
	console.log("connect.html.test");
	var name=$("#name").val();
	var cemail=$("#CEmail").val();
	var phone=$("#phone").val();
	var info=$("#info").val();
	console.log(name);
	console.log(cemail);
	console.log(phone);
	console.log(info);
	if(name!="姓名" && cemail!="电子邮件" && phone!="联系电话" && info.length!="请写明问题")
	{
		console.log("Start!!!");
		$.ajax({
			url : "/BookStore/Connect?name=" + name + "&email=" + cemail+ "&phone=" + phone+ "&info=" + info,
				contentType : "text/json;charset=utf-8",
				type : "POST",
				success : function(data) {
					if(data.state=="0"){
						alert("提交成功");
					}			
					else
						console.log("又错惹QAQ");
					window.location.href = "/BookStore/FAQ.html";
				}
		});
	}
	else{
		var message = "*请将信息填写完整";
		console.log(message);
		$("#message").html(message);
	}
}