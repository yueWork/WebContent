function GetRequest() {
// var url =
// unescape(encodeURI(window.parent.location.search).replace(/\\\\u/g,'%u'));
	var url = location.search; // 获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
var pageNum=0;
function Next() {
	pageNum++;
	console.log(pageNum);
	document.getElementById("pre").setAttribute("onclick", "Pre()");
	$("#pre").children(".prearrow").attr("style", "border-right-color:#ff6000;");
	books();
}
function Pre() {
	if(pageNum>0){
		pageNum--;
		console.log(pageNum);
		$("#next").children(".nextarrow").attr("style", "border-left-color:#ff6000;");
		$("#nextpage").attr("style","");
		document.getElementById("next").setAttribute("onclick", "Next()");
		books();
		if(pageNum==0){
			document.getElementById("pre").onclick=null;
			$("#pre").children(".prearrow").attr("style", "border-right-color:#6C6C6C;");
		}
	}else{
		document.getElementById("pre").onclick=null;
		$("#pre").children(".prearrow").attr("style", "border-right-color:#6C6C6C;");
	}
	
}
function Single(dom){
	console.log("single.html.test");
//	var Request = new Object();
//	Request = GetRequest();
//	var bid = decodeURI(Request["bid"]);
	var a=$(dom).parent().parent().find("span");
	var bid=a.html();
	console.log("a:"+bid);
	window.location.href = "single.html?bid="+bid;
//	window.open()
	
}
function books() {
	console.log("books.html.test");
	var Request = new Object();
	Request = GetRequest();
	var num = Request["num"];
	var bids = [];
	for(var i=0;i<num;i++){
		var temp = "bid"+i;
		bids[i] = Request[temp];
	}
	var url = "/BookStore/Books?pageNum="+pageNum+"&num=" + num;
	for (var i = 0; i < num; i++) {
		url = url + "&bid" + i + "=" + bids[i];
	}
	$.ajax({
		url : url,
		contentType : "text/json;charset=utf-8",
		type : "POST",
		success : function(data) {
			var msg = data.msg;
			var state = data.state;
			var count = data.count;
//			console.log(msg);
//			console.log(state);
//			console.log("1234"+count);
			if(state == "0"){
				var i=0
				for(i;i<count;i++){
					var temp1 = "image" + i;
					var temp2 = "bookName" + i;
					var temp3 = "price" + i;
					var temp4 = "bid" + i;
					var temp5 = "counter" + i;
					document.getElementById(temp1).src = (data.books)[i].cover;
//					document.getElementById(temp2).
					$("#"+temp2).html((data.books)[i].bname+" 著");
					$("#"+temp3).html((data.books)[i].price+" ¥");
					$("#"+temp4).html((data.books)[i].bid);
					$("#"+temp5).html((data.books)[i].counter);
					var temp = "book" + i;
//					console.log(temp)
					$("#"+temp).show();
					
				}
				for(i;i<6;i++){
					var temp = "book" + i;
//					console.log(temp)
					$("#"+temp).hide();
				}
				
			}else{
				alert("页面加载出错");
			}
		}
		});
//	click();
}
$(document).ready(books());
function click(){
	var type;
	$("#type a").on("click",function(){
	       var p =$(this).html();//这里是获取点击某一个<a>标签的html值
	       console.log(p);
	       var reg = /<[^>]+>/ig;
	       type = p.replace(reg,"");
	       console.log(type);		
	  });
	$.ajax({
		url :  "/BookStore/Books?type=" + type ,
		contentType : "text/json;charset=utf-8",
		type : "POST",
		success : function(data) {
			
		}
	});
}
function addcartBooks(dom){
	var span=$(dom).parent().parent().parent().find(".product-img  .b-wrapper h4 span");
	var index=span.html();
	console.log("h4:"+index);
	if(User_uid==null){
		alert("请登录！");
	}
	else{
		var url="/BookStore/ShopCart?uid="+User_uid+"&bid="+index+"&num="+1;
		$.ajax({
			url : url,
			contentType : "text/json;charset=utf-8",
			type : "GET",
			success : function(data) {
				alert("添加购物车成功");
			},
			error : function(){
				alert("添加购物车失败");
			}
		});
	}
}