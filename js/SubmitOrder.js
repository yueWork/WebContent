//User_uid="4b38b561723c4a01b978b72bc785ef06";

function submitOrder(){
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
		url : "/BookStore/SubmitOrder?uid=" + User_uid + "&name=" + NAME + "&phone=" + PHONE + "&address=" + ADDRESS + "&zip_code=" + ZIPCODE
			+ "&bid=" + bid + "&bcounter=" + qty,
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
function modal(){
	var bid="1";
	var nam=$("#bname").html();
	var prc=$("#bprice").html();
	var qty=$("#quantity").val();
	
	console.log(nam);
	console.log(prc);
	console.log(qty);
	
	if(User_uid == null)
		alert("请先登录");
	else{
		$("#order_name").html(nam);
		$("#order_price").html(prc);
		$("#order_counter").html(qty);
		console.log(prc.substring(3,prc.length));
		console.log(parseFloat(prc.substring(3,prc.length))*parseInt(qty));
		$("#order_totalPrice").html(parseFloat(prc.substring(3,prc.length))*parseInt(qty));
		$("#modellog").modal();
	}
		
}