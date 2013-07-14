var MINUTES_DIR = 'doc/minutes';

/**
 * Populates the minutes table with contents.
 * @param minutesContentId the ID of the DOM element to populate
 */
function populateMinutesTable(minutesContentId) {
	return fileNamesToHtml(MINUTES_DIR, minutesContentId, function(fileName) {
		var year = Number(new Date().getFullYear());
		var fileYear = Number(fileName.substring(0, 4));
		var html = "";

		if (year < fileYear + 3) {
			html = "<tr>" +
						"<td>" + getMinutesFileNameFullDate(fileName)+ "</td>" +
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
		var year = Number(new Date().getFullYear());
		var fileYear = Number(fileName.substring(0, 4));
		var html = "";

		if (year >= fileYear + 3) {
			html = "<tr>" +
						"<td>" + getMinutesFileNamePartialDate(fileName)+ "</td>" +
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
 * Converts the file name of a Minutes file to a date.
 * @param minutesFileName the file name
 * @returns string a date
 */
function getMinutesFileNameFullDate(minutesFileName) {
	var year = minutesFileName.substring(0, 4);
	var month = minutesFileName.substring(4, 6);
	var day = minutesFileName.substring(6, 8);

	switch(month) {
		case "01": month = "January"; break;
		case "02": month = "February"; break;
		case "03": month = "March"; break;
		case "04": month = "April"; break;
		case "05": month = "May"; break;
		case "06": month = "June"; break;
		case "07": month = "July"; break;
		case "08": month = "August"; break;
		case "09": month = "September"; break;
		case "10": month = "October"; break;
		case "11": month = "November"; break;
		case "12": month = "December"; break;
	}

	return month + " " + day + ", " + year;
}

/**
 * Converts the file name of a Minutes file to a date.
 * @param minutesFileName the file name
 * @returns string a date
 */
function getMinutesFileNamePartialDate(minutesFileName) {
	var year = minutesFileName.substring(0, 4);
	var month = minutesFileName.substring(4, 6);

	switch(month) {
		case "01": month = "January"; break;
		case "02": month = "February"; break;
		case "03": month = "March"; break;
		case "04": month = "April"; break;
		case "05": month = "May"; break;
		case "06": month = "June"; break;
		case "07": month = "July"; break;
		case "08": month = "August"; break;
		case "09": month = "September"; break;
		case "10": month = "October"; break;
		case "11": month = "November"; break;
		case "12": month = "December"; break;
	}

	return month + " " + year;
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