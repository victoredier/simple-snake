const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 32;
const MaxX = 16;
const MaxY = 16;

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

function newFoodPosition() {
  return {
    x : Math.floor(Math.random()*(MaxX - 1)),
    y : Math.floor(Math.random()*(MaxY - 1))
  }
}

let d;

document.addEventListener("keydown",direction);

function direction(event){
  let key = event.keyCode;
  if( key == 37 && d != "RIGHT"){
    d = "LEFT";
  }else if(key == 38 && d != "DOWN"){
    d = "UP";
  }else if(key == 39 && d != "LEFT"){
    d = "RIGHT";
  }else if(key == 40 && d != "UP"){
    d = "DOWN";
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

function draw() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(foodImg, getX(food.x), getY(food.y));
  for (let index = 0; index < snake.length; index++) {
    const point = snake[index];
    let color = index == 0 ? 'green' : 'red';
    drawBox(point.x, point.y, color);
  }
  

  let currentHead = snake[0];
  let nextHead = {x: currentHead.x, y: currentHead.y};
  if( d == "LEFT")  nextHead.x -= 1;
  if( d == "UP")    nextHead.y -= 1;
  if( d == "RIGHT") nextHead.x += 1;
  if( d == "DOWN")  nextHead.y += 1;

  if (nextHead.x == food.x && nextHead.y == food.y) {
    // lets eat
    food = newFoodPosition();
  }
  else{
    snake.pop();
  }
  snake.unshift(nextHead);
  if (nextHead.x < 0 || nextHead.x > MaxX || nextHead.y < 0 || nextHead.y > MaxY) {
    // crash
    clearInterval(game);
  }
}
const speed = 400;
let game = setInterval(draw, speed);