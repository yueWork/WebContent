var types;
var page = 0;
var flag1 = 0;
function Next() {
	if (flag1 == 1) {
		page++;
		console.log(pageNum);
		document.getElementById("pre").setAttribute("onclick", "Pre()");
		$("#pre").children(".prearrow").attr("style",
				"border-right-color:#ff6000;");
		click();
	} else if (flag == 1) {
		pageNum++;
		console.log(pageNum);
		document.getElementById("pre").setAttribute("onclick", "Pre()");
		$("#pre").children(".prearrow").attr("style",
				"border-right-color:#ff6000;");
		books();
	}else if(flag2 == 1) {
		page2++;
		console.log(pageNum);
		document.getElementById("pre").setAttribute("onclick", "Pre()");
		$("#pre").children(".prearrow").attr("style",
				"border-right-color:#ff6000;");
		books();
	}
}
function Pre() {
	if (flag1 == 1) {
		if (page > 0) {
			page--;
			console.log(page);
			$("#next").children(".nextarrow").attr("style",
					"border-left-color:#ff6000;");
			$("#nextpage").attr("style", "");
			document.getElementById("next").setAttribute("onclick", "Next()");
			click();
			if (page == 0) {
				document.getElementById("pre").onclick = null;
				$("#pre").children(".prearrow").attr("style",
						"border-right-color:#6C6C6C;");
			}
		} else {
			document.getElementById("pre").onclick = null;
			$("#pre").children(".prearrow").attr("style",
					"border-right-color:#6C6C6C;");
		}
	} else if (flag == 1) {
		if (pageNum > 0) {
			pageNum--;
			console.log(pageNum);
			$("#next").children(".nextarrow").attr("style",
					"border-left-color:#ff6000;");
			$("#nextpage").attr("style", "");
			document.getElementById("next").setAttribute("onclick", "Next()");
			books();
			if (pageNum == 0) {
				document.getElementById("pre").onclick = null;
				$("#pre").children(".prearrow").attr("style",
						"border-right-color:#6C6C6C;");
			}
		} else {
			document.getElementById("pre").onclick = null;
			$("#pre").children(".prearrow").attr("style",
					"border-right-color:#6C6C6C;");
		}
	}else if (flag2 == 1) {
		if (page2 > 0) {
			page2--;
			console.log(page2);
			$("#next").children(".nextarrow").attr("style",
					"border-left-color:#ff6000;");
			$("#nextpage").attr("style", "");
			document.getElementById("next").setAttribute("onclick", "Next()");
			books();
			if (page2 == 0) {
				document.getElementById("pre").onclick = null;
				$("#pre").children(".prearrow").attr("style",
						"border-right-color:#6C6C6C;");
			}
		} else {
			document.getElementById("pre").onclick = null;
			$("#pre").children(".prearrow").attr("style",
					"border-right-color:#6C6C6C;");
		}
	}
}
$(document).ready(function check() {
	$("p").each(function() {
		console.log("ppp");
		$(this).click(function() {
			types = $(this).html();
			click();
		});
	});

});

function click() {

//	$("#type a").on("click", function() {
//		var p = $(this).html();// 这里是获取点击某一个<a>标签的html值
//		var reg = /<[^>]+>/ig;
//		types = p.replace(reg, "");
//		console.log(types);
//	});
	flag1 = 1;

	console.log("type:"+types);
			$.ajax({
				url : "/BookStore/SearchByType?pageNum="
						+ page + "&type=" + types,
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
						alert("最后一页！");
						page--;
					}

				}
			});

}
