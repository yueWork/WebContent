var types;
$(document).ready(function check() {

	$("p").each(function() {
		console.log("ppp");
		$(this).click(function() {
			click();
		});
	});

});
function click() {
	
	$("#type a").on("click", function() {
		var p = $(this).html();// 这里是获取点击某一个<a>标签的html值
		var reg = /<[^>]+>/ig;
		types = p.replace(reg, "");
		console.log(types);
	});
	
	console.log("type:"+types);
			$.ajax({
				url : "/BookStore/SearchByType?pageNum="
						+ pageNum + "&type=" + types,
				contentType : "text/json;charset=utf-8",
				type : "POST",
				success : function(data) {
					var msg = data.msg;
					var state = data.state;
					var count = data.count;

					if (state == "0") {
						var i = 0
						for (i; i < count; i++) {
							var temp1 = "image" + i;
							var temp2 = "bookName" + i;
							var temp3 = "price" + i;
							var temp4 = "bid" + i;
							var temp5 = "counter" + i;
							document.getElementById(temp1).src = (data.books)[i].cover;

							$("#" + temp2).html(
									(data.books)[i].bname
											+ " 著");
							$("#" + temp3).html(
									(data.books)[i].price
											+ " ¥");
							$("#" + temp4).html(
									(data.books)[i].bid);
							$("#" + temp5)
									.html(
											(data.books)[i].counter);
							var temp = "book" + i;

							$("#" + temp).show();

						}
						for (i; i < 6; i++) {
							var temp = "book" + i;

							$("#" + temp).hide();
						}

					} else {
						alert("页面加载出错");
					}

				}
			});

}
