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
    playsound(userChosenColor) 
    $("#"+userChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); 
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
        level=0;
        gamepattern=[];
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")},100);
        playsound("wrong");
        $("#level-title").text("Game over!Press any key to restart");
    }
}

function next(){
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);   
    var randomcolor=colors[randomNumber];  
    $("#"+randomcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomcolor);
    gamepattern.push(randomcolor);
    level++;
    $("#level-title").text("Level "+level);
}
function playsound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play(); 
}
