/**
 * Resets the 'Submit News' form
 */
function resetSubmitNewsRequest() {
	$('#submitNewsName').val('');
	$('#submitNewsEmail').val('');
	$('#submitNewsNews').val('');
	$('#submitNewsError').hide();
	$('#submitNewsSuccess').hide();
	$('#submitNewsName, #submitNewsEmail, #submitNewsNews, #submitNewsCancelBtn, #submitNewsSubmitBtn').prop("disabled", false);
}

/**
 * Handles submitting a news recommendation
 * @param name the resident's name
 * @param email the resident's email address
 * @param news the news
 * @param errorContentId
 * @param successContentId
 */
function submitNewsRequest(name, email, news, errorContentId, successContentId) {
	var errorContainer = $(errorContentId);
	var successContainer = $(successContentId);
	var formElements = $('#submitNewsName, #submitNewsEmail, #submitNewsNews, #submitNewsCancelBtn, #submitNewsSubmitBtn');

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
	if (!news) {
		inputErrors += "Please enter your news. ";
	}

	if (inputErrors == "") {
		var subject = name + ' has recommended news for the Cheltenham website';
		var message = "Name: " + name + "\n\nRecommendation: " + news;
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