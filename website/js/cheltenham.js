function showContentContainer(contentContainerId) {
	$('.content-container').hide();
	$('#directoryAccess').show();
	$('#directoryPassword').val("");
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

function messageForWebMaster(message) {
	$('#contactSendTo').val('Keith Policano (Website Designer)');
	$('#contactMessage').val(message)
}

function fetchDirectory(username, password) {
	var errorDiv = $('#passwordError');
	errorDiv.html("");
	errorDiv.slideUp(200);

	var successDiv = $('#directoryDownload');
	successDiv.html("");
	successDiv.slideUp(200);

	var encryptedUserData = encryptUserData(username, password);

	$.ajax({
		type: "POST",
		url: "scripts/accessDirectory.php",
		data: {
			username: encryptedUserData.username,
			password: encryptedUserData.password
		}
	}).done(function (result) {
		var jsonResult = $.parseJSON(result);
		if (jsonResult.resultMessage == "SUCCESS") {
			successDiv.html(jsonResult.resultHtml);
			successDiv.slideDown(300);
			$('#directoryAccess').slideUp(200);
		}
		else {
			errorDiv.html(jsonResult.resultHtml);
			errorDiv.slideDown(300);
		}
		$('#directoryUsername').prop("disabled", false);
		$('#directoryPassword').prop("disabled", false);
		$('#directorySubmit').prop("disabled", false);
	});
}

function encryptUserData(username, password) {
	var usernameSalt = "";
	var passwordSalt = "";

	$.ajax({
		async: false,
		url: "scripts/salt.php"
	}).done(function (result) {
		var jsonResult = $.parseJSON(result);
		usernameSalt = jsonResult.usernameSalt;
		passwordSalt = jsonResult.passwordSalt;
	});

	return {
		username: CryptoJS.SHA256(username + usernameSalt).toString(),
		password: CryptoJS.SHA256(password + passwordSalt).toString()
	};
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
		var subject = "Someone has contacted you from cheltenham.cc";
		var formattedMessage = "From: " + senderName + "\r\nPhone: " + (senderPhone ? senderPhone : "[not provided]") + "\r\n\r\n" + message;
		ajaxPhpMail(recipientEmail, senderEmail, subject, formattedMessage)
	}
}

function ajaxPhpMail(recipientEmail, senderEmail, subject, message) {
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
				subject: subject,
				senderEmail: senderEmail,
				message: message
			}
		}).done(function (result) {
			var jsonResult = $.parseJSON(result);
			if (jsonResult.errors) {
				$('#contactUsErrors').html(jsonResult.errors);
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