//写cookies
function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires="
			+ exp.toGMTString();
}
// 获取cookie
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
// 删除cookie
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function Login() {
	
	console.log("test");
	
	var email = $("#email").val();
	var password = $("#password").val();
	var remember_flag = document.getElementById("checkbox").checked;// true or
	console.log("e:"+email.length+"p"+password.length);																// false
	if (email.length != 0 && password.length != 0) {
		$
				.ajax({
					url : "/BookStore/Login?email=" + email + "&password="
							+ password,
					contentType : "text/json;charset=utf-8",
					type : "POST",
					success : function(data) {
						var msg = data[0].msg;
						console.log(msg);
//						if (remember_flag) {
//							setCookie()
//						}
					}
				});
	}
	else{
		console.log("参数为空");
	}
}
