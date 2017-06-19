$(document).ready(function() {
    var categories = ["Guitar", "Piano", "Horns", "Drums", "Bands", "Jazz", "Blues", "Slide Guitar", "Tamborine", "Violin", "Cello"]
    var apiKey = "dc6zaTOxFJmzC"
    var searchGif;
    var imageData;
    var imgKeys;

    // Here we construct our URL
    function findImage(imagesObj) {
        var imageUrlStill;
        var imageUrlMoving;
        // var rating;
        let keys = Object.keys(imagesObj);
        // console.log(' IMAGE OBJECT', imageObject);
        keys.forEach(function(key) {
            // rating = imageObject[key].rating
            if (key === 'original_still') {
                imageUrlStill = imagesObj[key].url;
            } else if (key === 'original') {
                imageUrlMoving = imagesObj[key].url;
            }
        });

        // console.log('WHAT IS OUR RES NOW???', imageUrlStill, imageUrlMoving);
        return { imageUrlStill, imageUrlMoving };
    };

    // createImage function that is being passed imageData object
    function createImage(imageData) {

        let keys = Object.keys(imageData);
        let objVal = Object.values(imageData);
        var img = $('<img id="dynamic" class="col-xs-4 still">');
        img.attr('src', imageData.imageUrlStill);
        img.appendTo('.gifImages');
        img.on("click", function(){
        	img.toggleClass("still");
        	if(img.hasClass("still")){
        	img.attr('src', imageData.imageUrlStill);	
        	}else {
        	img.attr('src', imageData.imageUrlMoving);
        	};
        	

        })




    };

    function fetchGifs(e) {
        e.preventDefault();
        // console.log($(this));
        searchGif = $(this).text()
        var queryURL = `http://api.giphy.com/v1/gifs/search?q=${searchGif}&api_key=${apiKey}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(res) {
        	$(".gifImages").empty();
            res.data.forEach(function(val) {
                var keys = Object.keys(val);
                keys.forEach(function(key) {

                    if (key === 'images' && key !== undefined) {
                        imageData = findImage(val[key]); //{ stillImage, movingImage }
                        var createdImage = createImage(imageData);

                    }
                })
            })

        });
    };

    //used a each fuction to creat buttons from categories array 

    $.each(categories, function(index, value) {
        var button = $("<button class='buttonStyle'>");
        button.text(value);
        button.click(fetchGifs);
        $(".categoryEl").append(button);
    });
});
