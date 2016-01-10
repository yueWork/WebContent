function GetRequest1() {
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
$(document).ready(function() {
//	var bid=1;
	var Request = new Object();
	Request = GetRequest1();
	var bid = Request["bid"];
//	var bid=1;
	$.ajax({
		url : "/BookStore/Single?bid=" + bid ,
				contentType : "text/json;charset=utf-8",
				type : "GET",
				success : function(data) {
					console.log("成功");
					var Bid=data[0].bid;
					var Bname=data[1].bname;
					var Author=data[2].author;
					var Publisher=data[3].publisher;
					var Publish_data=data[4].publish_data;
					var Price=data[5].price;
					var Cover=data[6].cover;
					var Tname=data[7].tname;
					var Instruction=data[8].instruction;
					
					
					$("#bname").html(Bname);
					console.log(Bname);
					$("#bauthor").html("作者："+Author);
					console.log(Author);
					if(Publisher.length==0)
						$("#bpublisher").html("出版商：暂无信息");
					else
						$("#bpublisher").html("出版商："+Publisher);
					console.log(Publisher);
					if(Publish_data.length==0)
						$("#Publish_data").html("出版日期：暂无信息");
					else
						$("#Publish_data").html("出版日期："+Publish_data);
					console.log(Publish_data);
					$("#tname").html("类别："+Tname);
					console.log(Tname);
					$("#bprice").html("价格："+Price);
					console.log(Price);
					$("#binstruction").html(Instruction);
					console.log(Instruction);
					document.getElementById("book_image").src = Cover;
				}
	})
})