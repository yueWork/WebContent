var uid="4b38b561723c4a01b978b72bc785ef06";
var gender;
var userinfo="";
var pagenum=0;
var imagepath="/BookStore/userImg/userimg";
function Edit() {	
	$("#modellog").modal();
}
function editUserPic() {
	
	$("#edit").attr("style","display:inline");
}
function upload(obj1) {
	$.ajaxFileUpload({
        url:'/BookStore/ImgUpload',//处理图片脚本
        secureuri :false,
        fileElementId :'fileToUpload',//file控件id
        dataType : 'json',
        success : function (data, status){
        	
        	alert("success");        	
        	var index=data.indexOf("{");
     	    var end=data.length-1;
     	    var filename=data.substring(index,end);
     	    index=filename.indexOf(":")+1;
	     	filename=filename.substring(index,end);
	     	
	     	filename="\"userImg/"+filename+"\"";
        	filename.replace("\"", "");
        	console.log('<img id="userPicImg" src='+filename+'style="width:80px;height:80px;">');
        	$("#mouseevent").empty();
        	$("#mouseevent").html('<img id="userPicImg" src='+filename+'style="width:80px;height:74px;">');
			
            if(typeof(data.error) != 'undefined'){
                if(data.error != ''){
                    alert(data.error);
                }else{
                	var result=data.filename;
                	console.log(result);
                }
            }
        },
        error: function(data, status, e){
        	alert(e);
//            alert("shibai");
        }
	})
	
	return false;
}
function updateUserInfo() {
	
	var flag=new Array();
	var userInfoSet=new Array();
	userInfoSet[0]=$("#unameinput").val();	
	userInfoSet[1]=$("#phoneinput").val();
	userInfoSet[2]=$("#passwordinput").val();
	userInfoSet[3]=$("#confirminput").val();
	userInfoSet[4]=$("#ageinput").val();
	userInfoSet[5]=$("#userPicImg").attr("src");
	console.log(userInfoSet[5]);
	if(userInfoSet[0]==""){
		$("#unamea").attr("style","visibility:visible;");
		flag[0]=false;
	}else{
		$("#unamea").attr("style","visibility:hidden;");
		flag[0]=true;
	}
	
	if(userInfoSet[3]!=userInfoSet[2]){
		$("#confirma").attr("style","visibility:visible;");
		flag[1]=false;
	}else{
		$("#confirma").attr("style","visibility:hidden;");
		flag[1]=true;
	}
	var sex;
	if(document.getElementById("fcheck").checked){
		sex=1;
	}else{
		sex=0;
	}
	if(flag[0]&&flag[1]){
		$.ajax({
			url : "/BookStore/UpdateUserInfo?uid=" + uid+"&uname="+userInfoSet[0]+"&phone="+userInfoSet[1]+
			"&password="+userInfoSet[2]+"&age="+userInfoSet[4]+"&sex="+sex+"&portait="+userInfoSet[5],
			contentType : "text/json;charset=utf-8",
			type : "GET",
			success : function(data) {
				alert("修改信息成功");
				window.location.href="/BookStore/UserInfo.html";
			}
		});
	}
}
function test(obj) {
	$("#fileToUpload").click();
}
function removeout() {
	$("#edit").attr("style","display:none");
}
function radioEve(dom) {
	document.getElementById("fcheck").checked=false;
	document.getElementById("mcheck").checked=false;
	var id=$(dom).attr("id");
	
	document.getElementById(id).checked=true;
}
function loadOrder() {
	$("#order0").show();
	$("#order1").show();
	$("#order2").show();
	
	$.ajax({
		url : "/BookStore/OrderInfo?uid=" + uid+"&pagenum="+pagenum,
		contentType : "text/json;charset=utf-8",
		type : "GET",
		success : function(data) {
			var date;
			var bname;
			var oid;
			var price;
			var dateid="#date";
			var bnameid="#bname";
			var onoid="#orderno";
			var priceid="#price";
			console.log("sta:"+data.status);
			if(data.status=="0"){
				$("#order0").hide();
				$("#order1").hide();
				$("#order2").hide();
			}else{
				var result=data.result;
				var i;
				for(i=0;i<result.length;i++){
					date=result[i].time;
					bname=result[i].bname;
					oid=result[i].oid;
					price=result[i].price;	
					$(dateid+i).html(date);
					$(bnameid+i).html(bname);
					$(onoid+i).html(oid);
					$(priceid+i).html(price);														
				}
				for(;i<3;i++){
					var order="#order"+i;
					$(order).hide();
				}
			}
		}
	});
}
function next() {
	pagenum++;
	console.log(pagenum);
	loadOrder();
}
function pre() {
	if(pagenum>0){
		pagenum--;
		console.log(pagenum);
		loadOrder();
	}
}
$(document).ready(function() {
	loadOrder();
	$.ajax({
		url : "/BookStore/UserInfo?uid=" + uid,
		contentType : "text/json;charset=utf-8",
		type : "GET",
		success : function(data) {
			var sex = data.sex;
			var age = data.age;
			var uname = data.uname;
			var portait=data.portait;
			console.log(portait);
			if (sex == "1") {
				gender = "女";
			} else {
				gender = "男";
			}
			userinfo += gender + "&nbsp;&nbsp;&nbsp;&nbsp;" + age;
			$("#username").html(uname);
			$("#userinfomation").html(userinfo);
			$("#userPicImg").attr("src",portait);
			$("#userMainPic").attr("src",portait);
			
		}
	});
});