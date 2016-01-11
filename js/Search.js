function Search() {

	var selectsubject = $("#searchinput").val();
	console.log(selectsubject);
//	var search_type = $(".searchtype").val();
	
//	var select_type=$(dom).html();
//	console.log("select"+select_type);
//	var html=select_type+"<b class=\"caret\"></b>";
//	$(".searchtype").html(html);
	console.log(search_type);
	console.log("/BookStore/Search?search_type=" + search_type
				+ "&search_name=" + selectsubject);

	
	var search_name = $("#searchinput").val();
	$.ajax({
		url : "/BookStore/Search?search_type=" + search_type
				+ "&search_name=" + selectsubject,
		contentType : "text/json;charset=utf-8",
		type : "POST",
		success : function(data) {

			var msg = data.msg;
			var state = data.state;
			var count = data.count;
			console.log(msg);
			console.log(state);
			if (state == "0") {
				var url = "books.html?flags=0&num=" + count;
				for (var i = 0; i < count; i++) {
					url = url + "&bid" + i + "=" + (data.books)[i].bid;
				}
				console.log(url);
//				console.log("u:"+url);
				window.location.href = url;
//				window.location.href = "books.html?cover="
//						+ encodeURI((data.books)[0].cover);
			}
			else{
				alert("无符合条件的书籍");
			}
		}

	});
}
