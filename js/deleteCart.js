function  deleteAll() {
	if(User_uid==null){
		alert("请先登录");
	}else{
		
		$.ajax({
			url : "/BookStore/deleteAll?uid=" + User_uid,
			contentType : "text/json;charset=utf-8",
			type : "GET",
			success : function(data) {
				alert("购物车已经清空");
				var html=location.href;
				console.log("delete"+html);
				if(html=="http://localhost:8080/BookStore/checkout.html"){
					console.log("test:");
					location.reload();
				}
			}
		})
	}
}
function allmoney(){
	if(User_uid!=null){
		$.ajax({
			url : "/BookStore/allMoney?uid=" + User_uid,
			contentType : "text/json;charset=utf-8",
			type : "GET",
			success : function(data) {
				var sum=data.result;
				var count=data.counter;
				$("#allmoney").html(sum);
				$("#simpleCart_quantity").html(count);
			}
		})
	}
}