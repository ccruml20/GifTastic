$(document).ready(function() {
    var categories = ["Guitar", "Piano", "Horns", "Drums", "Bands", "Jazz", "Blues", "Slide Guitar", "Tamborine", "Violin", "Cello"]
    var apiKey = "dc6zaTOxFJmzC"
    var searchGif;
    var imageData;
    var imgKeys;
    // Here we construct our URL
    function findImage(res) {
        var imagesObject
        $.each(res.data, function(index, value) {
            var keys = Object.keys(value);
            keys.forEach(function(key) {
                    if (key === "images") {
                        // console.log("object keys" , key, value);
                        imagesObject = value[key];

                        // console.log("img object" ,imagesObject.original_still.url);	
                    }

                })
              // console.log("img object" ,imagesObject);

                // console.log("IM the result of img data",imageData(imagesObject).stillImage)

        })
        return imageData(imagesObject);
    };

    function imageData(imagesObject) {
        var stillImage;
        var movingImage;
        imgKeys = Object.keys(imagesObject);

        imgKeys.forEach(function(imageskey) {
            // console.log("img key result", imageskey);
            if (imageskey === "original_still") {
                stillImage = imagesObject[imageskey].url;
                // console.log("help me find the still image" , stillImage);
                // $(".gifImages").attr('src', stillImg);
            } else if (imageskey === 'original') {
                movingImage = imagesObject[imageskey].url;
            }
        })
         console.log("What are are image values", stillImage, movingImage);
         console.log("img object" ,imgKeys);
        return { stillImage, movingImage };
       
        
    }

    function createImage(imageData) {

        console.log("what what", imageData);
        var img = $('<img id="dynamic">');
        img.attr('src', imageData.stillImage);
        img.appendTo('.gifImages');
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
            imageData = findImage(res); //{ stillImage, movingImage }
            var createdImage = createImage(imageData);
            // createImage();
            // console.log(res);
        });
    };

    $.each(categories, function(index, value) {
        var button = $("<button class='buttonStyle'>");
        button.text(value);
        button.click(fetchGifs);
        $(".categoryEl").append(button);
    });
});
