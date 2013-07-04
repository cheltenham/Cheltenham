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

function validateUsername(username) {
	var salt = 'BMiT!V)R++e';
	var hash = '5f1f7e109c39d4a0691fec571d6d84c679294a655d9dd6293d67f6d511063744';
	return hash == CryptoJS.SHA256(username + salt).toString();
}

function validatePassword(password) {
	var salt = 'ZcEh*3-/{';
	var hash = '082b9b907c1beb8752e2e5718a50fb3ac5d648b50fb95aa0424e5a9aa8d4f822';
	return hash == CryptoJS.SHA256(password + salt).toString();
}

function fetchDirectory(username, password) {
	if (!validateUsername(username) || !validatePassword(password)) {
		alert("Incorrect username or password.");
	} else {
		window.open('doc/directory.pdf', '_blank')
	}
}