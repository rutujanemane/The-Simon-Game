var gamepattern=[];
var colors=["blue","green","red","yellow"];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).on("keypress",function(){
    if(!started){
    next();
    started=true;
    }
});

$(".btn").click(function(){  
    var userChosenColor=$(this).attr("id");
    $("#"+userChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio=new Audio("sounds/"+userChosenColor+".mp3");
    audio.play(); 
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamepattern[currentLevel]){
        console.log("success");
        if(gamepattern.length===userClickedPattern.length){
            setTimeout(function(){next();}, 1000); 
        }
          
    }
    else{
        started=false;
        level=0
        gamepattern=[];
        var audio=new Audio("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")},100);
        audio.play();
        $("#level-title").text("Game over!Press any key to restart");
    }
}

function next(){
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4+1);   
    var randomcolor=colors[randomNumber-1];   
    gamepattern.push(randomcolor);
    $("#"+randomcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio=new Audio("sounds/"+randomcolor+".mp3");
    audio.play();
    level++;
    $("#level-title").text("Level "+level);
}
