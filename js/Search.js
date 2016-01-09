function Search() {

	var selectsubject = $("#selectsubject").html();
	var x = selectsubject.indexOf("<");
	selectsubject = selectsubject.substring(0, x);

	var search_name = $("#searchinput").val();
	$.ajax({
		url : "/BookStore/Search?search_type=" + selectsubject
				+ "&search_name=" + search_name,
		contentType : "text/json;charset=utf-8",
		type : "POST",
		success : function(data) {

			var msg = data.msg;
			var state = data.state;
			var count = data.count;
			console.log(msg);
			console.log(state);
			if (state == "0") {
				var url = "books.html?num=" + count;
				for (var i = 0; i < count; i++) {
					url = url + "&bid" + i + "=" + (data.books)[i].bid;
				}
				console.log(url);
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
