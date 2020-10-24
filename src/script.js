const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 32;
const MaxX = 16;
const MaxY = 14;

function getX(X) {
  let position = X + 1;
  position = position * box;
  return position;
}

function getY(Y) {
  let position = Y + 3;
  position = position * box;
  return position;
}

function drawBox(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(getX(x), getY(y), box, box);
}

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.strokeRect(getX(x), getY(y), box, box);
}

function drawText(text, x, y) {
  let fontSize = 35;
  ctx.fillStyle = "white";
  ctx.font = fontSize+"px Arial";
  ctx.fillText(text, getX(x), getY(y) + fontSize);
}

function newFoodPosition() {
  return {
    x : Math.floor(Math.random()*MaxX),
    y : Math.floor(Math.random()*MaxY)
  }
}

let nextDirection;
let prevDirection;
let score = 0;

document.addEventListener("keydown", directionEvent);
function directionEvent(event){
  let key = event.keyCode;
  if( key == 37 && prevDirection != "RIGHT"){
    nextDirection = "LEFT";
  }else if(key == 38 && prevDirection != "DOWN"){
    nextDirection = "UP";
  }else if(key == 39 && prevDirection != "LEFT"){
    nextDirection = "RIGHT";
  }else if(key == 40 && prevDirection != "UP"){
    nextDirection = "DOWN";
  }
}


let food = newFoodPosition();
const ground = new Image();
const foodImg = new Image();

ground.src = 'img/ground.png';
foodImg.src = 'img/food.png';

let snake = [
  {x: 0, y: 0}
];
function isPointInSnake(point) {
  for (let index = 0; index < snake.length; index++) {
    const element = snake[index];
    if (element.x == point.x && element.y == point.y) {
      return true;
    }
  }
  return false;
}
let isDrawing = false;
function draw() {
  if (isDrawing) {
    return;
  }
  isDrawing = true;
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(foodImg, getX(food.x), getY(food.y));
  for (let index = 0; index < snake.length; index++) {
    const point = snake[index];
    let color = index == 0 ? 'green' : 'red';
    drawBox(point.x, point.y, color);
  }
  drawText(score, 1, -2.5);
  let currentHead = snake[0];
  let nextHead = {x: currentHead.x, y: currentHead.y};
  if(nextDirection == "LEFT")  nextHead.x -= 1;
  if(nextDirection == "UP")    nextHead.y -= 1;
  if(nextDirection == "RIGHT") nextHead.x += 1;
  if(nextDirection == "DOWN")  nextHead.y += 1;
  prevDirection = nextDirection;
  if (nextHead.x == food.x && nextHead.y == food.y) {
    // lets eat
    let isIn = false;
    do {
      food = newFoodPosition();
      isIn = isPointInSnake(food);
    } while (isIn);
    score = score + 1;
  }
  else{
    snake.pop();
  }
  let doCrash = false;
  if (nextHead.x < 0 || nextHead.x > MaxX || nextHead.y < 0 || nextHead.y > MaxY) {
    doCrash = true;
  }
  if (isPointInSnake(nextHead)) {
    doCrash = true;
  }
  if (doCrash) {
    clearInterval(game);
  }
  snake.unshift(nextHead);
  isDrawing = false;
}
const speed = 200;
let game = setInterval(draw, speed);
