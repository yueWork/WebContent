
$(document).ready(function() {
//	var bid=1;
	var Request = new Object();
	Request = GetRequest();
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
				}
	})
})