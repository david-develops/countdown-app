$(document).ready(function(){
    var name;
    //display create-modal and allow user to create new modal
    $("#new-timer-btn").click(function(){
        $("#overlay").show();
        $("body").css("overflow","hidden");
        $("#create-modal").show();
        //timer creation happens in function below triggered by create-btn click
    });
    //close modal button function
    $(".close-modal-btn").click(function(){
        $("#overlay").hide();
        $("body").css("overflow","auto")
        $(this).parent().hide();
        $("#show-modal h1").remove();
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
            name=$(this).children("h1").text();
            $("#overlay").show();
            $("body").css("overflow","hidden")
            $("#show-modal").show();
            $("#show-modal").append("<h1>"+name+"</h1>")
        });
        function createCountdown(){
            name=$("#timer-name").val();
            var date=$("#timer-end-date").val();
            var time=$("#timer-end-time").val();
            //Append new countdown timer to main
            $("main").append("<div class='timer-card timer'><h1 class='timer-name'>"+name+"</h1><h1 class='timer-display'></h1></div>");
            }
    });
});