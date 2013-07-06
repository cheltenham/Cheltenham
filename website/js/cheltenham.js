function showContentContainer(contentContainerId) {
	$('.content-container').hide();
	$('#directoryAccess').show();
	$('#inputPassword').val("");
	$('.nav-item').removeClass('active');
	$('#div' + contentContainerId).show();
	$('#li' + contentContainerId).addClass('active');
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
	var errorDiv = $('#passwordError');
	var successDiv = $('#directoryDownload');
	errorDiv.slideUp(200);
	successDiv.slideUp(200);
	successDiv.html("");
	if (!validateUsername(username) || !validatePassword(password)) {
		errorDiv.slideDown(300);
	} else {
		$('#directoryAccess').slideUp(200);
		successDiv.html(
			"<a href='doc/directory.pdf' target='_blank'><img src='img/pdf.png' alt='Download Directory PDF'/> Download Directory</a>" +
			"<br/><small class='muted'>(Updated as of April 20, 2013)</small>" +
			"<br/><br/><small class='muted'>This directory is solely for the use of Cheltenham residents and " +
			"is not to be used for commercial or solicitation purposes.</small>");
		successDiv.slideDown(300);
	}
}