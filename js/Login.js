var User_uid = null;
var User_uname = null;
var User_email = null;
// 获取cookie
function getCookie(cookie_name) {
	var allcookies = document.cookie;
	var cookie_pos = allcookies.indexOf(cookie_name); // 索引的长度

	// 如果找到了索引，就代表cookie存在，
	// 反之，就说明不存在。
	if (cookie_pos != -1) {
		// 把cookie_pos放在值的开始，只要给值加1即可。
		cookie_pos += cookie_name.length + 1; // 这里容易出问题，所以请大家参考的时候自己好好研究一下
		var cookie_end = allcookies.indexOf(";", cookie_pos);

		if (cookie_end == -1) {
			cookie_end = allcookies.length;
		}

		var value = unescape(allcookies.substring(cookie_pos, cookie_end)); // 这里就可以得到你想要的cookie的值了。。。
	}
	return value;
}
function Login() {
	var email = $("#email").val();
	var password = $("#password").val();
	var remember_flag = document.getElementById("checkbox").checked;
	var all_cookies = document.cookie;
	if (all_cookies.length > 0) {
		console.log("不为空");
		console.log(all_cookies);
		var cookie_uid = getCookie("uid");
		var cookie_uname = getCookie("uname");
		var cookie_email = getCookie("email");
		var cookie_password = getCookie("password");
		console.log(cookie_uid);
		console.log(cookie_uname);
		console.log(cookie_email);
		console.log(cookie_password);
		User_uid = cookie_uid;
		User_uname = cookie_uname;
		User_email = cookie_email;
		
		var html2 = '<li class="J_Menu menu my-taobao" data-spm="1997525045"  style="list-style: none !important;">'
			+ '<div class="background_user" style="width:200%" >'
			+ '<ul class="multi-column-dropdown"style="background-color:rgb(255,255,255);width:100%; margin:0 auto;border: 1px solid rgba(0, 0, 0, .15);'
		    +'border-radius: 4px;background-clip: padding-box;">'
			+ '<li class="searchtype"><a class="list" style="margin-left: 0px;" onClick="select(this)">'+User_uname+'</a></li>'
			+ '<li class="searchtype"><a href="UserInfo.html" class="list" style="margin-left: 0px;" onClick="select(this)">主页</a></li>'
			+ '<li class="searchtype"><a class="list" style="margin-left: 0px;" onClick="Logout()">退出</a></li>'
			+ '</ul>' + '</div>' + '</li>';
		
		$("#loginBox").html(html2);
	} else {
		console.log("为空");
		if (email.length != 0 && password.length != 0) {
			console.log("1");
			$.ajax({
				url : "/BookStore/Login?email=" + email + "&password="
						+ password + "&remember_flag=" + remember_flag,
				contentType : "text/json;charset=utf-8",
				type : "POST",
				success : function(data) {
					console.log("成功");
					var msg = data[0].msg;
					console.log(msg);
					var state = data[1].state;
					console.log(state);
					if (state == '0') {
						$("#msg").html(msg);
						console.log(msg);
						
						User_uid = data[2].uid;
						User_uname = data[3].uname;
						User_email = email;
						console.log(User_uid);
						console.log(User_uname);
						console.log(User_email);
						
						var html2 = '<li class="J_Menu menu my-taobao" data-spm="1997525045"  style="list-style: none !important;">'
							+ '<div class="background_user" style="width:200%" >'
							+ '<ul class="multi-column-dropdown"style="background-color:rgb(255,255,255);width:100%; margin:0 auto;border: 1px solid rgba(0, 0, 0, .15);'
						    +'border-radius: 4px;background-clip: padding-box;">'
							+ '<li class="searchtype"><a class="list" style="margin-left: 0px;" onClick="select(this)">'+User_uname+'</a></li>'
							+ '<li class="searchtype"><a href="UserInfo.html" class="list" style="margin-left: 0px;" onClick="select(this)">主页</a></li>'
							+ '<li class="searchtype"><a class="list" style="margin-left: 0px;" onClick="Logout()">退出</a></li>'
							+ '</ul>' + '</div>' + '</li>';
						
						$("#loginBox").html(html2);
					} else {
						$("#msg").html(msg);
						console.log(msg);
					}
				}
			});
		} else {
			console.log("参数为空");
			$("#msg").html("参数不能为空");
		}
	}
}
$(document).ready(Login());