//  jjs code for giphy buttons


    // array for heroes to make the buttons
    var heroes = ['Batman','Superman','Spiderman','Ironman','Wonder Woman','Robin','Green Arrow','Hulk'];

    // making of the buttons on the page
    for(var i in heroes){
        $('#buttons').append(`<tr><td><button type="button" data-name='${heroes[i]}'>${heroes[i]}</button></td></tr>`);
    };

    // event listener that fetches gifs and displays them on a button click
    $('button').on('click',function(event){
        // #NORELOAD
        event.preventDefault();
        // pass the name attribute to the function and the callback
        getTheGifs($(this).data('name'), displayTheGifs);

    });

   function startListener(){

        $('img').on('click', function(){
        
            if($(this).attr('data-state') === 'still'){
                $(this).attr('src', $(this).data('anim'));
                $(this).attr('data-state','anim');
                return;
            }
            if($(this).attr('data-state') === 'anim'){
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state','still');
                return;
            }
            
        });
    };

    // the function that does stuff, aka goes and gets the gifs.
    function getTheGifs(name, callback){
        console.log(`The function ran because you clicked the ${name} button`);

        // ajax request 
        var req = $.get(`http://api.giphy.com/v1/gifs/search?q=${name}&api_key=4czYHAMKDVYo2GY2CCEHk1OVuKLTkKsA&limit=10`);
        
        // fail condition function
        req.fail(function(meta){
            console.log(`This shit failed with an error code of ${meta.status}`);
        });

        // success condition function
        req.done(function(data) {

            var gif;
            var gifs= [];
            var results = data.data;//LOL 

            // loop through the results and create a gif object with the info we neeed
            for(var i in results){
                gif = {
                    dataName: name,
                    dataStill: results[i].images.fixed_height_still.url,
                    dataAnim: results[i].images.fixed_height.url
                }
                // push newly minted gif into an array appropriately called gifs
                gifs.push(gif);
            }
        // slap the callback function and pass it the array of gifs
        callback(gifs,startListener);
        });
        
    };

    // function to display the gifs
    function displayTheGifs(arr, callback){
        $('#gifs').html('');
        // loop through and stick em on the page hoorah
        for( var i in arr){
            $('#gifs').append(`<tr><td><img src=${arr[i].dataStill} data-still=${arr[i].dataStill} data-anim=${arr[i].dataAnim} data-state="still">`);
        }
        callback();
    }
