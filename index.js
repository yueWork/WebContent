function SearchBook(){
	var search=$("#searchinput").val();
	var selectsubject=$("#selectsubject").html();
	var x=selectsubject.indexOf("<");
	selectsubject=selectsubject.substring(0,x);
//	window.location.href="/BookSystem/books.html";
	$.ajax({
		url:"/BookSystem/Search?selectSubject="+selectsubject+"&search="+search,
		contentType:"text/json;charset=utf-8",
		type:"GET",		
		success:function(data){
			console.log("success");
			var result=data[0].result;
			console.log(result);
		}
	});
}
function select(dom) {
	var select=$(dom).html();
	console.log(select);$
	
	var html=select+"<b class=\"caret\"></b>";
	$("#selectsubject").html(html);
	
}