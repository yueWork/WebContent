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
function change(dom) {
	var num=$(dom).val();
	
	var id=$(dom).attr("id");
	var bid="#bid"+id.replace("counter","");
	var bidhtml=$(bid).html();
	console.log("num:"+num);
	$.ajax({
		url : "/BookStore/changeCart?uid=" + User_uid+"&bid="+bidhtml+"&num="+num,
		contentType : "text/json;charset=utf-8",
		type : "GET",
		success : function(data) {
//			alert("修改信息成功");
			
		}
	});
}
function loadcartinfo() {
	
	$("#cart-header0").attr("style","visibility: visible;");
	$("#cart-header1").attr("style","visibility: visible;");
	$("#cart-header2").attr("style","visibility: visible;");
	console.log("pa"+checkoutPage);
	$.ajax({
		url : "/BookStore/loadShopCart?uid=" + User_uid+"&pagenum="+checkoutPage,
		contentType : "text/json;charset=utf-8",
		type : "GET",
		success : function(data) {
			var counter;
			var bname;
			var author;
			var cover;
			var price;
			var bid;
			var counterid="#counter";
			var bnameid="#bname";
			var authorid="#author";
			var coverid="#cover";
			var priceid="#price";
			var bidid="#bid";
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
					price=result[i].price;
					bid=result[i].bid;
					console.log("counter"+counter);
					console.log("counterid:"+counterid+i+"num:"+$(counterid+i).val());
					$(counterid+i).val(counter);
					$(bnameid+i).html(bname);
					$(authorid+i).html(author);
					$(coverid+i).attr("src",cover);	
					$(priceid+i).html(price);
					$(bidid+i).html(bid);
					console.log("counterid:"+counterid+i+"num:"+$(counterid+i).val());
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
function check() {
	var price;
	var quantity;
	var bid;
	console.log("price"+price);
	var check="buyCheck";
	var sum=0;
	var header="#cart-header";
	var flag=new Array();
	
	for(var i=0;i<3;i++){
		var id=check+i;
		if(document.getElementById(id).checked){
			
			price=$("#price"+i).html()*1;
			quantity=$("#counter"+i).val()*1;
			bid=$("#bid"+i).html();
			header+=i;
			$(header).remove();
			sum+=price*quantity;
			console.log("/BookStore/checkShopCart?uid=" + User_uid+"&bid="+bid+"&num="+quantity);
			$.ajax({
				url : "/BookStore/checkShopCart?uid=" + User_uid+"&bid="+bid+"&num="+quantity,
				contentType : "text/json;charset=utf-8",
				type : "GET",
				success : function(data) {
//					alert("结算成功");
					flag[i]=true;
				},
				error : function(data) {
//					alert("结算失败");
					flag[i]=false;
				}
			});
		}
	}
	
	alert("sum:"+sum);
	if(flag[0]&&flag[1]&&flag[2]){
		alert("结算成功");
		window.location.href="/BookStore/checkout.html";
		console.log("href:"+href);
	}
}
function close(dom) {
	console.log("test");
	var id=$(dom).attr("id");
	id=id.replace("close","");
	var classid=".cart-header"+id;
	console.log(classid);
	id=id-1;
	var bidid=$("#bid"+id);
	var bid=$(bidid).html();
	console.log(bid);
}
$(document).ready(function() {
	loadcartinfo();
	$('#close11').on('click', function(c) {
		console.log("test");
		var bid=$("#bid0").html();
		$.ajax({
			url : "/BookStore/deleteCartThing?uid=" + User_uid+"&bid="+bid,
			contentType : "text/json;charset=utf-8",
			type : "GET",
			success : function(data) {
				
				
			},
			error : function(data) {
				
				
			}
		});
		console.log(bid);
	});
	$('#close22').on('click', function(c) {
		console.log("test");
		var bid=$("#bid1").html();
		$.ajax({
			url : "/BookStore/deleteCartThing?uid=" + User_uid+"&bid="+bid,
			contentType : "text/json;charset=utf-8",
			type : "GET",
			success : function(data) {
				
				
			},
			error : function(data) {
				
				
			}
		});
		console.log(bid);
	});
	$('#close33').on('click', function(c) {
		console.log("test");
		var bid=$("#bid2").html();
		$.ajax({
			url : "/BookStore/deleteCartThing?uid=" + User_uid+"&bid="+bid,
			contentType : "text/json;charset=utf-8",
			type : "GET",
			success : function(data) {
				alert("结算成功");
				
			},
			error : function(data) {
				alert("结算失败");
				
			}
		});
		console.log(bid);
	});
})