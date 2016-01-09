
function Search(){
	
	var selectsubject=$("#selectsubject").html();
	var x=selectsubject.indexOf("<");
	selectsubject=selectsubject.substring(0,x);	
	
	var search_name = $("#searchinput").val();
	$.ajax({
		url : "/BookStore/Search?search_type=" + selectsubject + "&search_name="
				+ search_name,
		contentType : "text/json;charset=utf-8",
		type : "POST",
		success : function(data) {

			var msg = data.msg;
			var state = data.state;
			var count = data.count;
			console.log(msg);
			console.log(state);
			for(var i = 0;i<count;i++){
				console.log("bid:"+((data.books)[i].bid));
				console.log("bname:"+((data.books)[i].bname));
				console.log("price:"+((data.books)[i].price));
				console.log("cover:"+((data.books)[i].cover));
			}
			
//			window.location.href = "books.html?cover=" + encodeURI(encodeURI((data.books)[0].cover));
			window.location.href = "books.html?cover=" + encodeURI((data.books)[0].cover);
		}
	});
}
