var MINUTES_DIR = 'doc/minutes';
var DATE_FORMAT = 'YYYYMMDD';
var YEARS_BEFORE_ARCHIVING = 3;

/**
 * Populates the minutes table with contents.
 * @param minutesContentId the ID of the DOM element to populate
 */
function populateMinutesTable(minutesContentId) {
	return fileNamesToHtml(MINUTES_DIR, minutesContentId, function(fileName) {
		var html = "";
		var date = moment(fileName.substring(0, 8), DATE_FORMAT);
		if (yearsSince(date) <= YEARS_BEFORE_ARCHIVING) {
			html = "<tr>" +
						"<td>" + date.format('MMMM D, YYYY') + "</td>" +
						"<td>" + getMinutesFileNameMeetingType(fileName)+ "</td>" +
						"<td>" +
							"<a href='" + MINUTES_DIR + '/' + fileName + "' target='_blank'>" +
								"<img src='img/" + getFileExtension(fileName) + ".png' alt='Download Minutes'> Download Minutes" +
							"</a>" +
						"</td>" +
				   "</tr>"
		}
		return html;
	});
}

/**
 * Populates the archived minutes table with contents.
 * @param minutesContentId the ID of the DOM element to populate
 */
function populateArchivedMinutesTable(minutesContentId) {
	return fileNamesToHtml(MINUTES_DIR, minutesContentId, function(fileName) {
		var html = "";
		var date = moment(fileName.substring(0, 8), DATE_FORMAT);
		if (yearsSince(date) > YEARS_BEFORE_ARCHIVING) {
			html = "<tr>" +
						"<td>" + date.format('MMMM YYYY') + "</td>" +
						"<td>" +
							"<a href='" + MINUTES_DIR + '/' + fileName + "' target='_blank'>" +
								"<img src='img/" + getFileExtension(fileName) + ".png' alt='Download Minutes'> " + getMinutesFileNameMeetingType(fileName) + " Minutes" +
							"</a>" +
						"</td>" +
				   "</tr>"
		}
		return html;
	});
}

/**
 * Converts the file name of a Minutes file to a meeting type.
 * @param minutesFileName the file name
 * @returns string the meeting type
 */
function getMinutesFileNameMeetingType(minutesFileName) {
	var type = minutesFileName.substring(minutesFileName.toLowerCase().indexOf('minutes_') + 8, minutesFileName.indexOf('.'));

	switch(type) {
		case "annual"     : type = "Annual Meeting"; break;
		case "board"      : type = "Board Meeting"; break;
		case "exec"       : type = "Executive Committee Meeting"; break;
		case "homeowners" : type = "Homeowners Meeting"; break;
	}

	return type;
}