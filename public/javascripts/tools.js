
function showEditDialog(ev) {
	var dbid = $(this).attr("dbid");
	$("#bmname").val(dbid);
	$("#bmurl").val( $(this).attr("url") );
	$("#bmname").val( $(this).attr("name") );
	var dlg = $("#dlgedit");
	dlg.dialog( {
		buttons: {
			Ok: function() {
				var data = {
					dbid: dbid,
					name: $("#bmname").val(),
					url: $("#bmurl").val(),
					success: function(data) {
						console.log("server finished:" + data);
					}
				}
				// update database
				$.ajax( {
					type: "POST",
					url: "/bookmark/update", 
					data: data } );
				$(this).dialog("close");
			},
			Cancel: function() {
				$(this).dialog("close");
			}
		}
	});
	dlg.dialog( "option", "position", { my: "left+20% top-10%", of: $(this) });
}


// show .dynamicshow on hover a table row
$('.highlight').hover( function() {
	$(this).find('.dynamicshow').toggleClass('hide');
} );

$('a[call="edit"]').click( showEditDialog );




