var uid="4b38b561723c4a01b978b72bc785ef06";
var gender;
var userinfo="";
$(document).ready(function (){
	$.ajax({
				url : "/BookSystem/UserInfo?uid=" + uid,
				contentType : "text/json;charset=utf-8",
				type : "GET",
				success : function(data) {
					var sex=data.sex;
					var age=data.age;	
					var uname=data.uname;
					if(sex=="1"){
						gender="女";
					}
					else{
						gender="男";
					}
					userinfo+=gender+"&nbsp;&nbsp;&nbsp;&nbsp;"+age;
					$("#username").html(uname);
					$("#userinfomation").html(userinfo);
				}
			});
});