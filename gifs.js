// My Cool Sci-Fi Animated Gif Finder!

// *** Starting with the movie activity button maker

 // Initial array of gifs
 var gifs = ["side eye", "woah", "yay", "smh"];
  
 // displaygifInfo function re-renders the HTML to display the appropriate content
 function displaygifInfo() {

   var gif = $(this).attr("data-name");
   var queryURL = "https://www.omdbapi.com/?t=" + gif + "&y=&plot=short&apikey=trilogy";

   // Creates AJAX call for the specific gif button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {

     // Creates a div to hold the gif
     $("")
     // Retrieves the Rating Data
     // Creates an element to have the rating displayed
     // Displays the rating
     // Retrieves the release year
     // Creates an element to hold the release year
     // Displays the release year
     // Retrieves the plot
     // Creates an element to hold the plot
     // Appends the plot
     // Creates an element to hold the image
     // Appends the image
     // Puts the entire gif above the previous gifs.

     console.log(response);
   });



 }

 // Function for displaying gif data
 function renderButtons() {

   // Deletes the gifs prior to adding new gifs
   // (this is necessary otherwise you will have repeat buttons)
   $("#buttons-view").empty();
   // Loops through the array of gifs
   for (var i = 0; i < gifs.length; i++) {

     // Then dynamicaly generates buttons for each gif in the array
     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
     var a = $("<button>");
     // Adds a class of gif to our button
     a.addClass("gif");
     // Added a data-attribute
     a.attr("data-name", gifs[i]);
     // Provided the initial button text
     a.text(gifs[i]);
     // Added the button to the buttons-view div
     $("#buttons-view").append(a);
   }
 }

 // This function handles events where the add gif button is clicked
 $("#add-gif").on("click", function(event) {
   event.preventDefault();
   // This line of code will grab the input from the textbox
   var gif = $("#gif-input").val().trim();

   // The gif from the textbox is then added to our array
   gifs.push(gif);

   // Calling renderButtons which handles the processing of our gif array
   renderButtons();
 });

 // Adding click event listeners to all elements with a class of "gif"
 $(document).on("click", ".gif", displaygifInfo);

 // Calling the renderButtons function to display the intial buttons
 renderButtons();
