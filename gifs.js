// My SciFi Gif Finder

// Take the input from the movie activity and try to tweak it for Giphy api




// Initial array of gifs
      var gifs = ["side eye", "yay", "smh", "woah"];
      var searchThis = [];
      // displaygifInfo function re-renders the HTML to display the appropriate content
      function displaygifInfo() {

        var gif = $(this).attr("data-name");
        var topic = "cat";
        var queryURL = "http://api.giphy.com/v1/gifs/";
        var apiKey = "&api_key=emOMci8RYO3mn4qBUZ1Bha17obohp3Ft";
        var searchThis = "search?q=" + topic;
        // search string - search?q=" + searchThis +"&api_key=emOMci8RYO3mn4qBUZ1Bha17obohp3Ft"

        // Creating an AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL + searchThis + apiKey,
          method: "GET"
        }).then(function(response) {
          // Creating a div to hold the gif
          var gifDiv = $("<div class='gif'>");

          // Storing the rating data
          var rating = response.rating;
          console.log("this is the response: ", response.data);
          console.log("search This: " + queryURL + searchThis + apiKey);

          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          gifDiv.append(pOne);

          // Storing the release year
          var title = response.data.title;

          // Creating an element to hold the release year
          var pTwo = $("<p>").text("Released: " + title);

          // Displaying the release year
          gifDiv.append(pTwo);

          // Storing the plot
          var slug = response.data.slug;

          // Creating an element to hold the slug
          var pThree = $("<p>").text("Plot: " + slug);

          // Appending the slug
          gifDiv.append(pThree);

          // Retrieving the URL for the image
          var imgURL = response.data.url;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          gifDiv.append(image);

          // Putting the entire gif above the previous gifs
          $("#buttons-view").prepend(gifDiv);
        });

      }

      // Function for displaying gif data
      function renderButtons() {

        // Deleting the gifs prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of gifs
        for (var i = 0; i < gifs.length; i++) {

          // Then dynamicaly generating buttons for each gif in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of gif-btn to our button
          a.addClass("gif-btn");
          // Adding a data-attribute
          a.attr("data-name", gifs[i]);
          // Providing the initial button text
          a.text(gifs[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a gif button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();

        // Adding gif from the textbox to our array
        gifs.push(gif);

        searchThis.push(gif);
console.log("afterbuttonclick searchThis: " + searchThis);

queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchThis +"&api_key=emOMci8RYO3mn4qBUZ1Bha17obohp3Ft";


        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "gif-btn"
      $(document).on("click", ".gif-btn", displaygifInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();