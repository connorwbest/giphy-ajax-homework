var topics = ["Moana", "Mulan", "Lion King", "Zootopia", "Big Hero 6"];

//Generates preexisting buttons on page load
$(document).ready(function () {


    for (i = 0; i < topics.length; i++) {
        var movieBtn = $("<button>");

        movieBtn.addClass("mvBtn");

        movieBtn.attr("data-movie", topics[i]);

        movieBtn.html(topics[i]);

        JSON.stringify(movieBtn);

        $('#buttons').append(movieBtn);
        console.log(movieBtn);

    }


    //On click for generating gifs
    $(document).on('click', '.mvBtn', function (event) {
        event.preventDefault();
        $('#gifHolder').empty();

        //variable tied to the data-movie attribute of the button
        var movieName = $(this).attr("data-movie");

        //creating the variable which will hold the giphy url that our data-movie will be passed into to grab 10 gifs
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
            movieName + "&api_key=kSpcdr8HsnhH8UpUNXbIvMv7xPN331dI&limit=10";


        //ajax get request
        $.ajax({
            url: queryUrl,
            method: "GET"
        })

            //promise to execute after ajax call finishes
            .then(function (response) {


                var results = response.data;
                console.log(queryUrl);
                console.log(results);

                //loop for going through each object and prepending img to div
                for (i = 0; i < results.length; i++) {

                    var gifDiv = $('<div>');
                    gifDiv.attr('id', 'gifHere')

                    var p = $('<p>').text("Rating: " + results[i].rating);

                    var gifImage = $("<img class=gif>");

                    gifImage.attr("src", results[i].images.downsized_still.url);
                    gifImage.attr('data-still', results[i].images.downsized_still.url);
                    gifImage.attr('data-animate', results[i].images.downsized_medium.url);
                    gifImage.attr('data-state', 'still');

                    gifDiv.prepend(p);
                    gifDiv.append(gifImage);

                    $('#gifHolder').prepend(gifDiv);




                }

                $('.gif').on('click', function () {

                    var state = $(this).attr('data-state');

                    console.log(state);

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }


                })




            })



    })

    $('#addMovie').on('click', function (event) {
        event.preventDefault();

        console.log("hello");

        var newBtn = $('#movieAdd').val();
        console.log(newBtn);

        topics.push(newBtn);
        console.log(topics);

        $('#buttons').empty();

        for (i = 0; i < topics.length; i++) {
            var movieBtn = $("<button>");

            movieBtn.addClass("mvBtn");

            movieBtn.attr("data-movie", topics[i]);
            console.log(movieBtn.attr("data-movie"));
            movieBtn.html(topics[i]);

            JSON.stringify(movieBtn);

            $('#buttons').append(movieBtn);
            console.log(movieBtn);

        };



    });

});

