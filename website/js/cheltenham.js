function showContentContainer(contentContainerId) {
	$('.content-container').hide();
	$('#directoryAccess').show();
	$('#inputPassword').val("");
	$('.nav-item').removeClass('active');
	$('#div' + contentContainerId).show();
	$('#li' + contentContainerId).addClass('active');
	$('#landing').slideUp();
	$('#sidebar').show();
	$('#navbar').slideDown();
	$('#footer').hide();
	$('#contactUsSuccessContainer').hide();
	$('#contactUsErrorContainer').hide();
	document.body.scrollTop = document.documentElement.scrollTop = 0;
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
		successDiv.html("<a href='doc/directory.pdf' target='_blank'><img src='img/pdf.png' alt='Download Directory PDF'/> Download Directory</a>");
		successDiv.slideDown(300);
	}
}

function sendMail(recipientEmail, senderEmail, senderName, senderPhone, message) {
	var errorDiv = $('#contactUsErrorContainer');
	errorDiv.slideUp(200);
	$('#contactUsSuccessContainer').slideUp(200);

	var errorMessage = "";
	if (!recipientEmail)
		errorMessage += "<br/>• Please select a recipient";
	if (!senderName)
		errorMessage += "<br/>• Please enter your name";
	if (!senderEmail)
		errorMessage += "<br/>• Please enter your email address";
	if (!message)
		errorMessage += "<br/>• Please enter a message";

	if (errorMessage) {
		$('#contactUsErrors').html("Could not send message:" + errorMessage);
		errorDiv.slideDown(300);
	}
	else {
		ajaxPhpMail(recipientEmail, senderEmail, senderName, senderPhone ? senderPhone : "(not provided)", message)
	}
}

function ajaxPhpMail(recipientEmail, senderEmail, senderName, senderPhone, message) {
	try {
		$('#contactSendTo').prop('disabled', true);
		$('#contactName').prop('disabled', true);
		$('#contactEmail').prop('disabled', true);
		$('#contactPhone').prop('disabled', true);
		$('#contactMessage').prop('disabled', true);
		$('#contactSubmit').prop('disabled', true);

		$.ajax({
			type: "POST",
			url: "scripts/sendEmail.php",
			data: {
				recipientEmail: recipientEmail,
				subject: "Someone has contacted you from cheltenham.cc",
				senderEmail: senderEmail,
				senderName: senderName,
				senderPhone: senderPhone,
				message: message
			}
		}).done(function (result) {
			var jsonResult = eval("(" + result + ")");
			if (jsonResult.errors) {
				$('#contactUsErrors').html(jsonResult.responseMessage);
				$('#contactUsErrorContainer').slideDown(300);
			}
			else {
				$('#contactUsErrorContainer').slideUp(200);
				$('#contactUsSuccessContainer').slideDown(300);
				$('#contactName').val("");
				$('#contactEmail').val("");
				$('#contactPhone').val("");
				$('#contactMessage').val("");
			}
			$('#contactSendTo').prop('disabled', false);
			$('#contactName').prop('disabled', false);
			$('#contactEmail').prop('disabled', false);
			$('#contactPhone').prop('disabled', false);
			$('#contactMessage').prop('disabled', false);
			$('#contactSubmit').prop('disabled', false);
		});
	} catch (e) {
		alert("error: " + e.description);
	}
}