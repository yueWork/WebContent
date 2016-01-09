function GetRequest() {
//    var url = unescape(encodeURI(window.parent.location.search).replace(/\\\\u/g,'%u'));
	var url = location.search; //获取url中"?"符后的字串
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
	var cover = decodeURI(Request["cover"]);
	$("#cover1").html(cover);
}
$(document).ready(books());