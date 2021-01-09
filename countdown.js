$(document).ready(function(){
    //Variables used to hold name and time of timer currently being used
    var name;
    var date;
    var time;
    var timeLeft;
    var dateTime;
    //display create-modal which allows user to create new countdown
    $("#new-timer-btn").click(function(){
        $("#overlay").show();
        $("body").css("overflow","hidden");
        $("#create-modal").show();
        //timer creation happens in function below triggered by create-btn click
    });
    //close modal button function
    $(".close-modal-btn").click(function(){
        $("#overlay").hide();
        $("body").css("overflow","auto");
        $(this).parent().hide();
        $("#show-modal h1").remove();
        $("#show-modal br").remove();
    });
    //function triggered by creating new countdown via button within create-modal
    $("#create-btn").click(function(e){
        e.preventDefault();
        createCountdown();
        name="";
        //Hide countdown timer creation modal
        $("#overlay").hide();
        $("body").css("overflow","auto")
        $("#create-modal").hide();

        //Show timer modal with large countdown display
        $(".timer").off("click").on("click",function(e){
            //Assign timer name and dateTime string (dateTime holds end date and time of timer formatted for date constructor)
            name=$(this).find(".timer-name").text();

            //show overlay/modal
            $("#overlay").show();
            $("body").css("overflow","hidden")
            $("#show-modal").show();

            //add elements to hold name, display time left, and delete button
            $("#show-modal").append("<h1>"+name+"</h1><br><h1 class='timer-display'>Loading...</h1><br><h1 class='delete-timer-btn'>Delete</h1>");

            //following function creates and updates time remaining every second
            countdownTime=$(this).attr("value");
            setInterval(function(){
                //call function to get new time left string
                timeLeft= getCountdownTime(countdownTime);
                //reset text to new time left string
                $("#show-modal .timer-display").text(timeLeft);
            },1000);
            function getCountdownTime(countdownTime){
                //get current time
                var curTime = new Date().getTime();
                //get difference
                var diff = countdownTime - curTime;
                //get values for day hours minutes and seconds from result
                var days = Math.floor(diff / (1000 * 60 * 60 * 24));
                var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((diff % (1000 * 60)) / 1000);
                //return countdown timer as string
                return ""+days+"d"+hours+"h"+minutes+"m"+seconds+"s";
            }
        });
        function createCountdown(){
            //store timer name, date, and time from user input
            name=$("#timer-name").val();
            date=$("#timer-end-date").val();
            time=$("#timer-end-time").val();

            //concatenate date and time to create arguement for date constructor
            dateTime=date+"T"+time; 
            //create new date object
            var countdownTime = new Date(dateTime).getTime();//add this to div to be used when showing actual countdown in modal
            
            //Append new display for countdown to main
            $("main").append("<div value="+countdownTime+" class='timer-card timer'><h1 class='timer-name'>"+name+"</h1><h3 class='delete-timer-btn'>Delete</h1></div>");
            }
    });
});