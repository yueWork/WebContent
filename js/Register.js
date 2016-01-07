function Register() {
	var userName = $("#userName").val();
	var phone = $("#phone").val();
	var email = $("#email1").val();
	var password0 = $("#password0").val();
	var password1 = $("#password1").val();
	console.log("userName" + userName.length + "phone" + phone.length + "email"
			+ email.length + "password0" + password0.length + "password1"
			+ password1.length);
	if (userName.length != 0 && phone.length != 0 && email.length != 0
			&& password0.length != 0 && password1.length != 0) {
		if (password0.length >= 6) {
			if (password0 == password1)
				$.ajax({
					url : "/BookStore/Register?userName=" + userName
							+ "&phone=" + phone + "&email=" + email
							+ "&password0=" + password0 + "&password1="
							+ password1,
					contentType : "text/json;charset=utf-8",
					type : "POST",
					success : function(data) {
						var msg = data[0].msg;
						var state = data[1].state
						console.log(msg);
						$("#msg").html(msg);
						if (state == '0')
							window.location.href = "/BookStore/index.html";
					}
				});
			else {
				console.log("密码不一致");
				var msg = "密码不一致";
				$("#msg").html(msg);
			}
		} else {
			console.log("密码必须不少于6位");
			var msg = "密码必须不少于6位";
			$("#msg").html(msg);

		}

	} else {
		console.log("存在参数为空");
		var msg = "存在参数为空";
		$("#msg").html(msg);
	}

}