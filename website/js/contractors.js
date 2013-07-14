/**
 * Resets the 'Recommend Contractor' form
 */
function resetRecommendContractorRequest() {
	$('#recommendContractorName').val('');
	$('#recommendContractorEmail').val('');
	$('#recommendContractorRecommendation').val('');
	$('#recommendContractorError').hide();
	$('#recommendContractorSuccess').hide();
	$('#recommendContractorName, #recommendContractorEmail, #recommendContractorRecommendation, #recommentContractorCancelBtn, #recommentContractorSubmitBtn').prop("disabled", false);
}

/**
 * Handles submitting a contractor recommendation
 * @param name the resident's name
 * @param email the resident's email address
 * @param recommendation the recommended contractor
 * @param errorContentId
 * @param successContentId
 */
function submitRecommendContractorRequest(name, email, recommendation, errorContentId, successContentId) {
	var errorContainer = $(errorContentId);
	var successContainer = $(successContentId);
	var formElements = $('#recommendContractorName, #recommendContractorEmail, #recommendContractorRecommendation, #recommentContractorCancelBtn, #recommentContractorSubmitBtn');

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
		var subject = name + ' has recommended a contractor for the Cheltenham website';
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