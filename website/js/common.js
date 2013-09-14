var DEFAULT_EMAIL_RECIPIENT = 'kpolicano+cheltenham@gmail.com';
var PAGES_DIR = 'pages';
var PHP_DIR = 'scripts';

/**
 * Function executed on document ready
 */
$(function() {
	/** Initialize default open tab **/
	$('#aboutUs').load(PAGES_DIR + '/aboutUs.html', function() {
		$('#tabs').tab();
	});

	/** When other tabs are selected, populate the tab content via AJAX **/
	$('#tabs').bind('shown.bs.tab', function(e) {
		var contentId = e.target.toString().match(/#.+/gi)[0];
		$(contentId).load(PAGES_DIR + '/' + contentId.replace('#','') + '.html', function() {
			$('#tabs').tab();
		});
	});

	/** When a tab is clicked, add "#[tab]" to the URL **/
	$('a[data-toggle="pill"]').on('click', function(e) {
		history.pushState(null, null, $(this).attr('href'));
	});

	/** Enable support for back/forward browser buttons when switching tabs **/
	window.addEventListener("popstate", function(e) {
		var activeTab = $('[href=' + location.hash + ']');
		if (activeTab.length) {
			activeTab.tab('show');
		} else {
			$('.nav-pills a:first').tab('show');
		}
	});

	/** Fix for IE10 viewport width **/
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement("style");
		msViewportStyle.appendChild(
			document.createTextNode(
				"@-ms-viewport{width:auto!important}"
			)
		);
		document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
	}
});

/**
 * Convert the contents of a server directory to HTML.
 * @param directoryPath the path to the directory
 * @param contentId the id of the DOM element to populate
 * @param htmlConversionFunction the function which defines the conversion process -- of the format "function(fileName, isFirstFile)"
 */
function fileNamesToHtml(directoryPath, contentId, htmlConversionFunction) {
	$.ajax({
		type: "POST",
		url: PHP_DIR + "/listFiles.php",
		data: {
			path: directoryPath
		}
	}).done(function(result) {
		var data = $.parseJSON(result);
		var html = "";
		$(data).each(function(index, fileName) {
			html += htmlConversionFunction.call(this, fileName, index == 0);
		});
		$(contentId).html(html);
	});
}

/**
 * Gets the extension (e.g., 'pdf') of the given file name.
 * @param fileName the file name
 * @returns String the file extension
 */
function getFileExtension(fileName) {
	return fileName.substring(fileName.lastIndexOf('.') + 1);
}

/**
 * Sends a plain-text email.
 * @param to the recipient email address
 * @param from the sender email address
 * @param subject the email subject
 * @param message the email message
 * @param resultFunction a function that is called after the email is sent -- of the format "function(response, errorMessage)"
 */
function sendEmail(to, from, subject, message, resultFunction) {
	$.ajax({
		type: "POST",
		url: PHP_DIR + "/sendEmail.php",
		data: {
			to: to,
			from: from,
			subject: subject,
			message: message
		}
	}).done(function(result) {
		var data = $.parseJSON(result);
		console.log(data);
		resultFunction.call(this, data.result, data.errors);
	});
}

/**
 * Gets the number of years from the given date to now.
 * @param dateMoment the date as a Moment object
 * @returns the number of years between the given date and now
 */
function yearsSince(dateMoment) {
	return moment().diff(dateMoment, 'years', true);
}