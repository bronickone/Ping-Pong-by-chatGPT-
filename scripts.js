const canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

const paddleHeight = 150;
const paddleWidth = 20;
const ballRadius = 8;
const player1Color = "#FF4500";
const player2Color = "#1E90FF";
const ballColor = "#FFFFFF";

let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

let player1Score = 0;
let player2Score = 0;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

let wPressed = false;
let sPressed = false;
let oPressed = false;
let lPressed = false;

function keyDownHandler(e) {
    if (e.key === "w") wPressed = true;
    if (e.key === "s") sPressed = true;
    if (e.key === "o") oPressed = true;
    if (e.key === "l") lPressed = true;
}

function keyUpHandler(e) {
    if (e.key === "w") wPressed = false;
    if (e.key === "s") sPressed = false;
    if (e.key === "o") oPressed = false;
    if (e.key === "l") lPressed = false;
}

function drawPaddle(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall(x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
}

function drawScore() {
    ctx.fillStyle = "#FFF";
    ctx.font = "36px Arial";
    ctx.fillText(player1Score, canvas.width / 4, 50);
    ctx.fillText(player2Score, (canvas.width / 4) * 3, 50);
}

function updatePaddlePositions() {
    if (wPressed && player1Y > 0) player1Y
-= 5;
if (sPressed && player1Y < canvas.height - paddleHeight) player1Y += 5;
if (oPressed && player2Y > 0) player2Y -= 5;
if (lPressed && player2Y < canvas.height - paddleHeight) player2Y += 5;
}

function resetBall() {
ballX = canvas.width / 2;
ballY = canvas.height / 2;
ballSpeedX = -ballSpeedX;
ballSpeedY = 5;
}

function checkScore() {
if (player1Score >= 10 || player2Score >= 10) {
ctx.fillStyle = "#FFF";
ctx.font = "64px Arial";
const winner = player1Score >= 10 ? "Гравець 1" : "Гравець 2";
ctx.fillText(winner + " переміг!", canvas.width / 4, canvas.height / 2);
setTimeout(() => {
player1Score = 0;
player2Score = 0;
resetBall();
}, 2000);
}
}

function updateBallPosition() {
ballX += ballSpeedX;
ballY += ballSpeedY;

if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
}

if (ballX - ballRadius < paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    ballSpeedY += (ballY - (player1Y + paddleHeight / 2)) * 0.25;
} else if (ballX + ballRadius > canvas.width - paddleWidth && ballY > player2Y && ballY < player2Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    ballSpeedY += (ballY - (player2Y + paddleHeight / 2)) * 0.25;
} else if (ballX + ballRadius > canvas.width) {
    player1Score++;
    resetBall();
} else if (ballX - ballRadius < 0) {
    player2Score++;
    resetBall();
}
}

function gameLoop() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
updatePaddlePositions();
updateBallPosition();

drawPaddle(0, player1Y, player1Color);
drawPaddle(canvas.width - paddleWidth, player2Y, player2Color);
drawBall(ballX, ballY, ballColor);
drawScore();

checkScore();

requestAnimationFrame(gameLoop);

}

gameLoop();