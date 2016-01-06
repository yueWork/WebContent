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
		+ '<p>New User ? <a class="sign" href="account.html">Sign Up</a> <span><a href="#">Forgot your password?</a></span></p>'
	+'</form>';

function Logout(){
	$("#loginBox").html(html1);
	console.log("删除cookies");
	delCookie("uid");
	delCookie("uname");
	delCookie("email");
	delCookie("password");
	
	
}
//删除cookie
function delCookie(name){//为cookie name
	   var date = new Date();
	   date.setTime(date.getTime() - 1000000);
	   document.cookie = name + "=a; expires=" + date.toGMTString();
	}