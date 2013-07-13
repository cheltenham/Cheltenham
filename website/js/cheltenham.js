$(function() {
	populateMinutes();
});

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
	minutesFileNameToHtml("20130324_minutes_board.pdf");
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

function populateMinutes() {
	try {
		$.ajax({
			type: "GET",
			url: "scripts/listMinutes.php"
		}).done(function (result) {
			var jsonResult = $.parseJSON(result);
			var html = "";
			$(jsonResult).each(function(index, fileName) {
				html += minutesFileNameToHtml(fileName.toLowerCase());
			});
			$('#minutesTable').html(html);
		});
	} catch (e) {
		alert("error: " + e.description);
	}
}

function minutesFileNameToHtml(minutesFileName) {
	if (minutesFileName == '.' || minutesFileName == '..') {
		return "";
	}
	else {
		var date = formatBigEndianDate(minutesFileName.substring(0, 8));
		var type = getMinutesType(minutesFileName);
		var link = getMinutesLink(minutesFileName);
		return "<tr><td>" + date + "</td><td>" + type + "</td><td>" + link + "</td></tr>";
	}
}

function formatBigEndianDate(bigEndianDate) {
	var year = bigEndianDate.substring(0, 4);
	var month = bigEndianDate.substring(4, 6);
	var day = bigEndianDate.substring(6, 8);

	var monthStr;
	switch (month) {
		case "01": monthStr = 'January'; break;
		case "02": monthStr = 'February'; break;
		case "03": monthStr = 'March'; break;
		case "04": monthStr = 'April'; break;
		case "05": monthStr = 'May'; break;
		case "06": monthStr = 'June'; break;
		case "07": monthStr = 'July'; break;
		case "08": monthStr = 'August'; break;
		case "09": monthStr = 'September'; break;
		case "10": monthStr = 'October'; break;
		case "11": monthStr = 'November'; break;
		case "12": monthStr = 'December'; break;
	}

	return monthStr + " " + day + ", " + year;
}

function getMinutesType(minutesFileName) {
	var type = minutesFileName.substring(minutesFileName.indexOf('minutes_') + 8);
	type = type.substring(0, type.indexOf('.'));

	var typeStr;
	switch(type) {
		case "board": typeStr = 'Board Meeting'; break;
		case "exec": typeStr = 'Executive Committee Meeting'; break;
		case "annual": typeStr = 'Annual Meeting'; break;
		case "homeowners": typeStr = 'Homeowners Meeting'; break;
		default: typeStr = type; break;
	}
	return typeStr;
}

function getMinutesLink(minutesFileName) {
	return "<a href='doc/minutes/" + minutesFileName + "' target='_blank'>" +
		"<img src='img/" + getMinutesExtension(minutesFileName) + ".png' alt='Download Minutes'> Download Minutes</a>"
}

function getMinutesExtension(minutesFileName) {
	return minutesFileName.substring(minutesFileName.indexOf('.') + 1);
}

