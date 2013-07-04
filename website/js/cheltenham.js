function showContentContainer(contentContainerId) {
	$('.content-container').hide();
	$('.nav-item').removeClass('active');
	$('#div' + contentContainerId).show();
	$('#li' + contentContainerId).addClass('active');
}

function styleTableRows() {
	$("tr:even").addClass("tr-even");
	$("tr:odd").addClass("tr-odd");
}