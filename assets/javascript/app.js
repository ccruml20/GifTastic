$( document ).ready(function() {
var categories = ["Guitar", "Piano", "Horns", "Drums", "Bands", "Jazz", "Blues", "Slide Guitar", "Tamborine", "Violin", "Cello"]
var apiKey = "dc6zaTOxFJmzC"
var searchGif;
var imageData;
        // Here we construct our URL
function findImage(res){
	$.each(res.data, function(index, value){
		var keys = Object.keys(value);
		keys.forEach(function (key){
			if (key === "images"){
				// console.log("object keys" , key, value);
				var imagesObject = value[key];
				imgData(imagesObject);
				console.log("img object" ,imagesObject);	
			}
		
		})
		

	})
};

function imgData(imagesObject){
	var imgKeys = Object.keys(imagesObject);
	var stillImage;
	var movingImage;
	imgKeys.forEach(function (imageskey){
		// console.log("img key result", imageskey);
		if (imageskey === "original_still"){
			stillImage = imagesObject[imageskey].url;
			console.log("help me find the still image" , stillImage);
			// $(".gifImages").attr('src', stillImg);
		} else if (imageskey === 'original') {
			movingImage = imagesObject[imageskey].url;
		}

		return { stillImage, movingImage };

	})
}


function createImage(imageData) {
	console.log("what what", imgKeys.stillImage)
};
function fetchGifs(e){
e.preventDefault();
// console.log($(this));
searchGif = $(this).text()
var queryURL = 	`http://api.giphy.com/v1/gifs/search?q=${searchGif}&api_key=${apiKey}`;
$.ajax({
    url: queryURL,
    method: "GET"
}).done(function(res) {
	imageData = findImage(res); //{ stillImage, movingImage }
	var createdImage = createImage(imageData);

    // console.log(res);

});
};

$.each(categories, function(index, value){
var button = $("<button class='buttonStyle'>");
button.text(value);
button.click(fetchGifs);
$(".categoryEl").append(button);




});
});