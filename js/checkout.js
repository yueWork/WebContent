function loadcartinfo() {
	var url="/BookStore/"
	$.ajax({
		url : url,
		contentType : "text/json;charset=utf-8",
		type : "POST",
		success : function(data) {
			
		}
	})
}
$(document).ready(loadcartinfo())