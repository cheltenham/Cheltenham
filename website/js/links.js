/**
 * Resets the 'Recommend Link' form
 */
function resetRecommendLink() {
	$('#recommendLinkName').val('');
	$('#recommendLinkEmail').val('');
	$('#recommendLinkRecommendation').val('');
	$('#recommendLinkError').hide();
	$('#recommendLinkSuccess').hide();
	$('#recommendLinkName, #recommendLinkEmail, #recommendLinkRecommendation, #recommendLinkCancelBtn, #recommendLinkSubmitBtn').prop("disabled", false);
}

/**
 * Handles submitting a link recommendation
 * @param name the resident's name
 * @param email the resident's email address
 * @param recommendation the recommended link
 * @param errorContentId
 * @param successContentId
 */
function submitRecommendLink(name, email, recommendation, errorContentId, successContentId) {
	var errorContainer = $(errorContentId);
	var successContainer = $(successContentId);
	var formElements = $('#recommendLinkName, #recommendLinkEmail, #recommendLinkRecommendation, #recommendLinkCancelBtn, #recommendLinkSubmitBtn');

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
	if (!recommendation) {
		inputErrors += "Please make a recommendation. ";
	}

	if (inputErrors == "") {
		var subject = name + ' has recommended a link for the Cheltenham website';
		var message = "Name: " + name + "\n\nRecommendation: " + recommendation;
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