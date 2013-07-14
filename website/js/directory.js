/**
 * Handles access to the directory of residents
 * @param username the username
 * @param password the password
 * @param errorContainerId the ID of the DOM element that displays error messages
 * @param successContainerId the ID of the DOM element that displays the link to the directory
 * @param directoryAuthenticationContainerId the ID of the DOM element that contains the authentication fields
 */
function fetchDirectory(username, password, errorContainerId, successContainerId, directoryAuthenticationContainerId) {
	var errorContainer = $(errorContainerId);
	var successContainer = $(successContainerId);
	var authenticationContainer = $(directoryAuthenticationContainerId);

	errorContainer.slideUp(200);
	successContainer.slideUp(200);

	/** Encrypt username and password **/
	$.ajax({
		type: "GET",
		url: PHP_DIR + "/salt.php"
	}).done(function(result) {
		var salts = $.parseJSON(result);
		var encryptedUsername = CryptoJS.SHA256(username + salts.usernameSalt).toString();
		var encryptedPassword = CryptoJS.SHA256(password + salts.passwordSalt).toString();

		/** Request directory access **/
		$.ajax({
			type: "POST",
			url: PHP_DIR + "/accessDirectory.php",
			data: {
				username: encryptedUsername,
				password: encryptedPassword
			}
		}).done(function (result) {
			var jsonResult = $.parseJSON(result);
			if (jsonResult.resultMessage == "SUCCESS") {
				successContainer.html(jsonResult.resultHtml);
				successContainer.slideDown(300);
				authenticationContainer.slideUp(200);
			}
			else {
				errorContainer.html(jsonResult.resultHtml);
				errorContainer.slideDown(300);
			}
		});
	});
}

/**
 * Resets the 'Update Contact Information' form
 */
function resetUpdateContactInformationRequest() {
	$('#updateContactName').val('');
	$('#updateContactEmail').val('');
	$('#updateContactDetails').val('');
	$('#updateContactInformationError').hide();
	$('#updateContactInformationSuccess').hide();
	$('#updateContactName, #updateContactEmail, #updateContactDetails, #updateContactCancelBtn, #updateContactSubmitBtn').prop("disabled", false);
}

/**
 * Handles submitting an update contact information request
 * @param name the contact's name
 * @param email the contact's email address
 * @param details the details of the update request
 * @param errorContentId
 * @param successContentId
 */
function submitUpdateContactInformationRequest(name, email, details, errorContentId, successContentId) {
	var errorContainer = $(errorContentId);
	var successContainer = $(successContentId);
	var formElements = $('#updateContactName, #updateContactEmail, #updateContactDetails, #updateContactCancelBtn, #updateContactSubmitBtn');

	errorContainer.html('').slideUp(200);
	successContainer.slideUp(200);
	formElements.prop("disabled", true);

	var inputErrors = "";
	if (!name) {
		inputErrors += "Please enter your name. ";
	}
	if (!email) {
		inputErrors += "Please enter your email address. ";
	}
	if (!details) {
		inputErrors += "Please enter the details of your request. ";
	}

	if (inputErrors == "") {
		var subject = name + ' would like to update his/her Cheltenham Directory information';
		sendEmail(DEFAULT_EMAIL_RECIPIENT, email, subject, details, function(response, errorMessage) {
			if (response == 'SUCCESS') {
				successContainer.slideDown();
			} else {
				errorContainer.html(errorMessage).slideDown();
				formElements.prop("disabled", false);
			}
		});
	}
	else {
		errorContainer.html(inputErrors).slideDown();
		formElements.prop("disabled", false);
	}
}

/**
 * Resets the 'Request Directory Access' form
 */
function resetDirectoryAccessRequest() {
	$('#directoryAccessName').val('');
	$('#directoryAccessEmail').val('');
	$('#directoryAccessPhone').val('');
	$('#directoryAccessAddress').val('');
	$('#directoryAccessRequestError').hide();
	$('#directoryAccessRequestSuccess').hide();
	$('#directoryAccessName, #directoryAccessEmail, #directoryAccessPhone, #directoryAccessAddress, #directoryAccessRequestCancelBtn, #directoryAccessRequestSubmitBtn').prop("disabled", false);
}

/**
 * Handles submitting a directory access request
 * @param name the resident's name
 * @param email the resident's email address
 * @param phone the resident's phone number
 * @param address the address of the resident
 * @param errorContentId
 * @param successContentId
 */
function submitDirectoryAccessRequest(name, email, phone, address, errorContentId, successContentId) {
	var errorContainer = $(errorContentId);
	var successContainer = $(successContentId);
	var formElements = $('#directoryAccessName, #directoryAccessEmail, #directoryAccessPhone, #directoryAccessAddress, #directoryAccessRequestCancelBtn, #directoryAccessRequestSubmitBtn');

	errorContainer.html('').slideUp(200);
	successContainer.slideUp(200);
	formElements.prop("disabled", true);

	var inputErrors = "";
	if (!name) {
		inputErrors += "Please enter your name. ";
	}
	if (!email) {
		inputErrors += "Please enter your email address. ";
	}
	if (!phone) {
		inputErrors += "Please enter your phone number. ";
	}
	if (!address) {
		inputErrors += "Please enter your address. ";
	}

	if (inputErrors == "") {
		var subject = name + ' has requested access to the Cheltenham directory';
		var message = "Name: " + name + "\nPhone: " + phone + "\n\nAddress: " + address;
		sendEmail(DEFAULT_EMAIL_RECIPIENT, email, subject, message, function(response, errorMessage) {
			if (response == 'SUCCESS') {
				successContainer.slideDown();
			} else {
				errorContainer.html(errorMessage).slideDown();
				formElements.prop("disabled", false);
			}
		});
	}
	else {
		errorContainer.html(inputErrors).slideDown();
		formElements.prop("disabled", false);
	}
}