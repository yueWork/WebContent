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
var flag = true;
var html1 = '<form id="loginForm">'
		+ '<fieldset id="body">'
		+ '<fieldset>'
		+ '<label for="email">Email Address</label>'
		+ '<input type="text" name="email" id="email">'
		+ '</fieldset>'
		+ '<fieldset>'
		+ '<label for="password">Password</label>'
		+ '<input type="password" name="password" id="password">'
		+ '</fieldset>'
		+ '<input type="button" id="login" value="Sign in" onClick="Login()">'
		+ '<label for="checkbox"><input type="checkbox" id="checkbox"> <i>Remember me</i></label>'
		+ '<a>ddd</a>'
		+ '</fieldset>'
		+ '<p>New User ? <a class="sign" href="account.html">Sign Up</a> <span><a href="#">Forgot your password?</a></span></p' > +'</form>';

		var html2 = '<li class="J_Menu menu my-taobao" data-spm="1997525045">'
			+'<div>'
			+'<ul class="multi-column-dropdown" style="list-style: none !important;">'
				+'<li class="searchtype"><a class="list" style="margin-left: 10px;" onclick="select(this)">作者</a></li>'
				+'<li class="searchtype"><a class="list" style="margin-left: 10px;" onclick="select(this)">书名</a></li>'
				+'<li class="searchtype"><a class="list" style="margin-left: 10px;" onclick="select(this)">出版社</a></li>'
				+'<li class="searchtype"><a class="list" style="margin-left: 10px;" onclick="select(this)">书籍编号</a></li>'
			+'</ul>'
			+'</div>'
			+'</li>'
//		var html2 = '<li class="J_Menu menu my-taobao" data-spm="1997525045" id="test">'
//		+ '<div class="menu-hd J_MenuMyTaobao">'
//		+ '<a href="//i.taobao.com/my_taobao.htm" target="_top">我的淘宝</a>'
//		+ '<span class="arrow-icon-wrapper"><span class="g-icon arrow-icon"></span></span></div>'
//		+ '<div class="menu-bd menu-list"><div class="menu-bd-panel">'
//		+ '<a href="//buyertrade.taobao.com/trade/itemlist/list_bought_items.htm" target="_top">已买到的宝贝</a>'
//		+ '<a href="//lu.taobao.com/newMyPath.htm" target="_top">我的足迹</a>'
//		+ '<a href="//guang.taobao.com/?scm=2022.1.1.1" target="_top">爱逛街 <em class="J_GuangCount guang-count"></em></a>'
//		+ '<a href="//daren.taobao.com/" target="_top">淘宝达人</a>'
//		+ '<a href="//love.taobao.com/" target="_top">新欢</a></div></div></li>'
function Login() {
	var email = $("#email").val();
	var password = $("#password").val();
	var remember_flag = document.getElementById("checkbox").checked;
	console.log("test");
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
		$("#loginBox").html(html2);
	} else {
		console.log("为空");
		if (email.length != 0 && password.length != 0) {
			$.ajax({
				url : "/BookSystem/Login?email=" + email + "&password="
						+ password,
				contentType : "text/json;charset=utf-8",
				type : "POST",
				success : function(data) {
					var msg = data[0].msg;
					console.log(msg);
					flag = false;
					$("#loginBox").html(html2);
					// if (remember_flag) {
					// setCookie()
					// }
				}
			});
		} else {
			console.log("参数为空");
		}
	}
}
