/**
 * Sends a "Contact Us" email
 * @param to the recipient email address
 * @param from the sender email address
 * @param name the sender's name
 * @param phone the sender's phone number
 * @param message the email message
 */
function submitContactUs(to, from, name, phone, message) {
	var errorContainer = $('#contactUsErrors');
	var successContainer = $('#contactUsSuccess');
	var formElements = $('#contactSendTo, #contactName, #contactEmail, #contactPhone, #contactMessage, #contactSubmit');

	errorContainer.html('').slideUp(200);
	successContainer.slideUp(200);
	formElements.prop("disabled", true);

	var inputErrors = "";
	if (!to) {
		inputErrors += "Please select a recipient.<br/>";
	}
	if (!name) {
		inputErrors += "Please enter your name.<br/>";
	}
	if (!from) {
		inputErrors += "Please enter your email address.<br/>";
	}
	if (!message) {
		inputErrors += "Please enter a message.<br/>";
	}

	if (inputErrors == "") {
		var subject = name + ' has contacted you from the Cheltenham website';
		var emailMessage = "Name: " + name + "\nPhone: " + (phone ? phone : "not provided") + "\n\nMessage: " + message;
		sendEmail(to, from, subject, emailMessage, function(response, errorMessage) {
			if (response == 'SUCCESS') {
				successContainer.slideDown();
			} else {
				errorContainer.html(errorMessage).slideDown();
			}
			formElements.prop("disabled", false);
		});
	}
	else {
		errorContainer.html(inputErrors).slideDown();
		formElements.prop("disabled", false);
	}
}
