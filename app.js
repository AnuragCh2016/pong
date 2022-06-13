var canvas;
var canvasContext;
var ballX = 400;
var ballY = 300;
var ballDx = -5;
var ballDy = -5;

var paddle_A_Y=250;
var paddle_B_Y=250;
const PADDLE_HEIGHT = 100;

var playerAScore=0;
var playerBScore=0;
const winningScore = 5;

var showingWinScreen = false;

function calculateMousePosition(evt){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return{
    x:mouseX,
    y:mouseY
  };
}

function handleMouseClick(evt){
  if(showingWinScreen){
    playerAScore=0;
    playerBScore=0;
    showingWinScreen=false;
  }
}

window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  var frameRate = 30;
  setInterval(function(){
    moveEverything();
    drawEverything();
  }, 1000/frameRate);
  
  canvas.addEventListener('mousedown',handleMouseClick);
  canvas.addEventListener('mousemove',
  function(evt){
    var mousePos = calculateMousePosition(evt);
    paddle_A_Y = mousePos.y-(PADDLE_HEIGHT/2);
  }
)
  
  //drawEverything();
}

function ballReset(){
  if(playerAScore==winningScore||playerBScore==winningScore){
    showingWinScreen = true;
  }
  //ballDx=-5;
  ballDy=-5;
  ballDx*=-1;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function computerMovement(){
  var paddle_B_Center = paddle_B_Y + (PADDLE_HEIGHT/2);
  if(paddle_B_Center<ballY-35){
    paddle_B_Y+=5;
  }else if(paddle_B_Center>ballY+35){
    paddle_B_Y-=5;
  }
}

function moveEverything(){
  if(showingWinScreen){
    return;
  }
  computerMovement();
  if ((ballY<590 && ballY>=10)&&(ballX>25 && ballX<=775)){
    if(ballX==30){
      if(ballY>paddle_A_Y && ballY<paddle_A_Y+PADDLE_HEIGHT){
        var deltaY = ballY - (paddle_A_Y+PADDLE_HEIGHT/2);
        ballDy = deltaY *0.25;
        ballDx*=-1;
      }
    }
    else if(ballX==775){
      //console.log(ballX);
      if(ballY>paddle_B_Y && ballY<paddle_B_Y+PADDLE_HEIGHT){
        //console.log(ballDx);
        var deltaY = ballY - (paddle_A_Y+PADDLE_HEIGHT/2);
        ballDy = deltaY *0.25;
        ballDx*=-1;
        //console.log(ballDx);
      }
    }
  }
  else if(ballX<10 || ballX>=783){
    //ballX=295;
    if(ballX<10){
      playerBScore+=1;
    }
    else{
      playerAScore+=1;
    }
    ballReset();
  }
  else if(ballY>=590 || ballY<10){
    ballDy*=-1;
  }
  
  ballX+=ballDx;
  ballY+=ballDy;
}

function drawNet(){
  for(var i=10;i<canvas.height;i+=40){
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(canvas.width/2-1,i,2,20);
  }
}

function drawEverything(){
  
  //for the window
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  if(showingWinScreen){
    canvasContext.fillStyle='white';
    if(playerAScore==winningScore){
      canvasContext.fillText("Player A won!", 350, 100);  
    }
    else if(playerBScore==winningScore){
      canvasContext.fillText("Player B won!", 350, 100);  
    }
    canvasContext.fillText("click to continue", 350, 500);  
    return;
  }
  
  drawNet();
  
  //for the left paddle
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(10,paddle_A_Y, 15, PADDLE_HEIGHT);
  
  //for the right paddle
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(canvas.width-25,paddle_B_Y, 15, PADDLE_HEIGHT);
  
  //for the ball
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, 2*Math.PI);
  canvasContext.fillStyle = 'white';
  canvasContext.fill();
  
  //for the score
  canvasContext.fillText(playerAScore, 100, 100);
  canvasContext.fillText(playerBScore, canvas.width-100, 100);
}