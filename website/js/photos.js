var PHOTOS_DIR = 'img/photos';

/**
 * Populates a carousel with photos.
 * @param carouselContentId the ID of the DOM element to populate.
 */
function populateCarousel(carouselContentId) {
	fileNamesToHtml(PHOTOS_DIR, carouselContentId, function(fileName, isActive) {
		var caption = fileName.substring(0, fileName.lastIndexOf('.'));
		return	"<div class='item" + (isActive ? " active" : "") + "'>" +
					"<img class='img-rounded' src='" + PHOTOS_DIR + "/" + fileName + "' alt='" + caption + "'>" +
					"<div class='carousel-caption'>" +
						"<p>" + caption + "</p>" +
					"</div>" +
				"</div>";
	});
}