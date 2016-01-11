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

function submit(){
	var price;
	var quantity;
	var bid;
	
	var check="buyCheck";
	var total=0;
	var sum=0;
	var flag=new Array();
	var temp=0;
	for(var i=0;i<3;i++){
		var id=check+i;
		
		if(document.getElementById(id).checked){
			console.log("sdf");
			temp = temp + 1;
			console.log(temp);
		}
	}
	console.log("temp:"+temp);
	if(temp > 0){
		$("#modellog").modal();
		for(var i=0;i<3;i++){
			var id=check+i;
			var htmls = "";
			if(document.getElementById(id).checked){
				htmls = htmls + "<table width=\"100%\";id=\"tb"+i+"\"style=\"border-bottom: 0px; color: #34495e;font-size:20px;\">"
				+"<tr>"
					+"<td width=\"100\">书籍名称：</td>"
					+"<td width:\"200\"; id=\"order_name"+i+"\">name</td>"
				+"</tr>"
				+"<tr>"
					+"<td>单价：</td>"
					+"<td id=\"order_price"+i+"\">price</td>"
				+"</tr>"
				+"<tr>"
					+"<td>数量：</td>"
					+"<td id=\"order_counter"+i+"\">counter</td>"
				+"</tr>"
			+"</table>"
			+"<hr/>";
				$("#tables").html(htmls);
				price=$("#price"+i).html()*1;
				quantity=$("#counter"+i).val()*1;
				bname=$("#bname"+i).html();
				$("#order_name"+i).html(bname);
				$("#order_price"+i).html(price);
				$("#order_counter"+i).html(quantity);
				sum+=price*quantity;
				
			}
			$("#sum").html(sum);
	}
	
//	$("#modellog").modal();
}
}
function confirm(){
	console.log("SubmitOrder!!!");
	var bid="101";
	//var bid=$("#bid");
	var nam=$("#bname").html();
	var prc=$("#bprice").html();
	var qty=$("#quantity").val();

	var NAME=$("#NAME").val();
	var PHONE=$("#PHONE").val();
	var ADDRESS=$("#ADDRESS").val();
	var ZIPCODE=$("#ZIPCODE").val();

	console.log(NAME);
	console.log(PHONE);
	console.log(ADDRESS);
	console.log(ZIPCODE);
	
	if(NAME.length == 0)
		$("#NAMEa").attr("style","visibility:visible;");
	else if(PHONE.length == 0)
		$("#PHONEa").attr("style","visibility:visible;");
	else if(ADDRESS.length == 0)
		$("#ADDRESSa").attr("style","visibility:visible;");
	else if(ZIPCODE.length == 0){
		$("#ZIPCODEa").attr("style","visibility:visible;");
		$("#ZIPCODEa").html("*邮编不能为空");
	}
	else if(isNaN(ZIPCODE)){
		$("#ZIPCODEa").html("*请正确写入邮编");
		$("#ZIPCODEa2").attr("style","visibility:visible;");
	}
	else{
		console.log("OK!!!");
		$.ajax({
		url : "/BookStore/Confirm?uid=" + User_uid + "&name=" + NAME + "&phone=" + PHONE + "&address=" + ADDRESS + "&zip_code=" + ZIPCODE,
				contentType : "text/json;charset=utf-8",
				type : "POST",
				success : function(data) {
					console.log("成功");
					if(data.state0 == "1"){
						alert("订单已提交！付款成功！");
						$('#modellog').modal('hide');
					}
					else
						alert("订单提交失败！！");
				}
		});
	}
}
$(document).ready(loadcartinfo());

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

