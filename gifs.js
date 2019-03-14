// My SciFi Gif Finder

// Take the input from the movie activity and try to tweak it for Giphy api




// Initial array of gifs
      var gifs = ["side eye", "yay", "smh", "woah"];
      var searchThis = [];
      // displaygifInfo function re-renders the HTML to display the appropriate content
      function displaygifInfo() {

        var gif = $(this).attr("data-topic");
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

          // console log the url and the response
          
          console.log("this is the response: ", response.data);
          console.log("search This: " + queryURL + searchThis + apiKey);


          // Creating a div to hold the gif
          var gifDiv = $("<div class='gif'>");
          var gifCard = $('<div id="gif" class="card" style="width: 18rem;">');
          //var gifImg = $("<img id='gif'>" + );

        //   // Storing the rating data
        //   var rating = response.data[0].rating;
        //   console.log("the rating", rating);
          
        //   // Creating an element to have the rating displayed
        //   var pOne = $("<p>").text("the rating: " + rating);

        //   // Displaying the rating
        //   gifDiv.append(pOne);

        //   // Storing the release year
        //   var title = response.data[0].title;
        //   console.log("the title", title);

        //   // Creating an element to hold the release year
        //   var pTwo = $("<p>").text("Title: " + title);

        //   // Displaying the release year
        //   gifDiv.append(pTwo);

        //   // Storing the plot
        //   var slug = response.data[0].slug;
        //   console.log("the slug", slug);

        //   // Creating an element to hold the slug
        //   var pThree = $("<p>").text("Slug: " + slug);

        //   // Appending the slug
        //   gifDiv.append(pThree);

          // Retrieving the URL for the image
          var imgURL = response.data[0].url;
          console.log("the image url", imgURL);

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);
        //image.attr("class", card-img-top);

          // Appending the image
          //gifDiv.append(image);
          gifCard.append(image);
          $("#'gif'").append(image);

          // Putting the entire gif above the previous gifs
          //$("#gifOrama").append(gifDiv);
          $("gifOrama").append(gifCard);
          console.log("this is the card info: ", gifCard);
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
          a.attr("data-topic", gifs[i]);
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
      $(document).on("click", ".gif-btn", function(){
        var topic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          topic + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
          })
            .then(function(response) {
              var results = response.data;
    
              for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
    
                var rating = results[i].rating;
    
                var p = $("<p>").text("Rating: " + rating);
    
                var topicImage = $("<img>");
                topicImage.attr("src", results[i].images.fixed_height.url);
    
                gifDiv.prepend(p);
                gifDiv.prepend(topicImage);
    
                $("#gifs-appear-here").prepend(gifDiv);
              }
            });
      });

      // Calling the renderButtons function to display the intial buttons
      renderButtons();


      //*** Lets try getting gifs to appear  */

      $("button").on("click", function(e) {
        
        var topic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          topic + "&api_key=dc6zaTOxFJmzC&limit=10";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
  
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div>");
  
              var rating = results[i].rating;
  
              var p = $("<p>").text("Rating: " + rating);
  
              var topicImage = $("<img>");
              topicImage.attr("src", results[i].images.fixed_height.url);
  
              gifDiv.prepend(p);
              gifDiv.prepend(topicImage);
  
              $("#gifs-appear-here").prepend(gifDiv);
            }
          });
      });