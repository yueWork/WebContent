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
function books() {
	console.log("books.html.test");
	var Request = new Object();
	Request = GetRequest();
	var num = Request["num"];
	var bids = [];
	for(var i=0;i<num;i++){
		var temp = "bid"+i;
		bids[i] = Request[temp];
		console.log(bids[i]);
	}
	var url = "/BookStore/Books?num=" + num;
	for (var i = 0; i < num; i++) {
		url = url + "&bid" + i + "=" + bids[i];
	}
	console.log(url);
	$.ajax({
		url : url,
		contentType : "text/json;charset=utf-8",
		type : "POST",
		success : function(data) {
			var msg = data.msg;
			var state = data.state;
			var count = data.count;
			console.log(msg);
			console.log(state);
			console.log("1234"+count);
			if(state == "0"){
				
				for(var i=0;i<count;i++){
					var temp1 = "image" + i;
					var temp2 = "bookName" + i;
					var temp3 = "price" + i;
					var temp4 = "bid" + i;
					var temp5 = "counter" + i;
					document.getElementById(temp1).src = (data.books)[i].cover;
//					document.getElementById(temp2).
					$("#"+temp2).html((data.books)[i].bname+"著");
					$("#"+temp3).html((data.books)[i].price+"¥");
					$("#"+temp4).html((data.books)[i].bid);
					$("#"+temp5).html((data.books)[i].counter);
				}
				
			}else{
				alert("页面加载出错");
			}
		}
		});
}
$(document).ready(books());