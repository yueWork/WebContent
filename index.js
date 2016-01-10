function SearchBook(){
//	var search=$("#searchinput").val();

	
	
}
function select(dom) {
	var select=$(dom).html();
	console.log(select);
	var html=select+"<b class=\"caret\"></b>";
	$("#select_type").html(html);
	
	var type = select;
	var url = "books.html?flags=1&type=" + encodeURI(type);
	console.log(url);
	window.location.href = url;
}
var search_type;
function select1(dom) {
//	search_type=$(dom).html();
//	console.log("select"+search_type);
	
	var select=$(dom).html();
	console.log("select:"+select);
	search_type = select;
	var html=select+"<b class=\"caret\"></b>";
	$("#selectsubject").html(html);
	
//	var selectsubject=$("#selectsubject").html();
//	var x=selectsubject.indexOf("<");
//	selectsubject=selectsubject.substring(0,x);
//	var html=selectsubject+"<b class=\"caret\"></b>";
//	
//	console.log($("#searchtype").html());
//	$("#searchtype").html(html);
	var selectsubject=$("#selectsubject").html();
	var x=selectsubject.indexOf("<");
	selectsubject=selectsubject.substring(0,x);
	
}
