//function loadcartinfo() {
//	var url="/BookStore/"
//	$.ajax({
//		url : url,
//		contentType : "text/json;charset=utf-8",
//		type : "POST",
//		success : function(data) {
//			
//		}
//	})
//}
var checkoutPage=0;
function next() {
	checkoutPage++;
	console.log(checkoutPage);
	loadcartinfo();
	document.getElementById("pre").setAttribute("onclick", "pre()");
	$("#pre").children(".prearrow").attr("style", "border-right-color:#ff6000;");
	
}
function pre() {
	if(checkoutPage>0){
		checkoutPage--;
		console.log(checkoutPage);
		$("#next").children(".nextarrow").attr("style", "border-left-color:#ff6000;");
		$("#nextpage").attr("style","");
		document.getElementById("next").setAttribute("onclick", "next()");
		loadcartinfo();
		if(checkoutPage==0){
			document.getElementById("pre").onclick=null;
			$("#pre").children(".prearrow").attr("style", "border-right-color:#6C6C6C;");
		}
	}else{
		document.getElementById("pre").onclick=null;
		$("#pre").children(".prearrow").attr("style", "border-right-color:#6C6C6C;");
	}
}
function loadcartinfo() {
	
	$("#cart-header0").attr("style","visibility: visible;");
	$("#cart-header1").attr("style","visibility: visible;");
	$("#cart-header2").attr("style","visibility: visible;");
	var uid="df52fe5a840d4c1bbf976976ec370cd1";
	$.ajax({
		url : "/BookStore/loadShopCart?uid=" + uid+"&pagenum="+checkoutPage,
		contentType : "text/json;charset=utf-8",
		type : "GET",
		success : function(data) {
			var counter;
			var bname;
			var author;
			var cover;
			var counterid="#counter";
			var bnameid="#bname";
			var authorid="#author";
			var coverid="#cover";
			console.log("sta:"+data.status);
			if(data.next=="0"){
				document.getElementById("next").onclick=null;
				$("#next").children(".nextarrow").attr("style", "border-left-color:#6C6C6C;");
				$("#nextpage").attr("style","color: rgb(232, 232, 232);");
			}
			if(data.status=="0"){
				$("#cart-header0").attr("style","visibility: hidden;");
				$("#cart-header1").attr("style","visibility: hidden;");
				$("#cart-header2").attr("style","visibility: hidden;");
			}else{
				var result=data.result;
				var i;
				console.log("len:"+result.length);
				for(i=0;i<result.length;i++){
					counter=result[i].counter;
					bname=result[i].bname;
					author=result[i].author;
					cover=result[i].cover;	
					var counterhtml="购买数量&nbsp;&nbsp;&nbsp;&nbsp;";
					counterhtml+=counter;
					$(counterid+i).html(counterhtml);
					$(bnameid+i).html(bname);
					$(authorid+i).html(author);
					$(coverid+i).attr("src",cover);														
				}
				for(;i<3;i++){
					var order="#cart-header"+i;
					console.log("test")
					$(order).attr("style","visibility: hidden;");
				}
			}
		}
	});
}
$(document).ready(loadcartinfo())