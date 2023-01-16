var NUM_ROWS = 8;
var BRICK_TOP_OFFSET = 10;
var BRICK_SPACING = 2;
var NUM_BRICKS_PER_ROW = 10;
var BRICK_HEIGHT = 10;
var SPACE_FOR_BRICKS = getWidth() - (NUM_BRICKS_PER_ROW + 1) * BRICK_SPACING;
var BRICK_WIDTH = SPACE_FOR_BRICKS / NUM_BRICKS_PER_ROW;
//
var bricks;
var counter = 0;
var counterTwo = 0;
var counterThree = 0;
var colorChange = Color.RED;
var brickRemove = 0;
//
var PADDLE_WIDTH = 80;
var PADDLE_HEIGHT = 15;
var PADDLE_OFFSET = 10;
var BALL_RADIUS = 15;
//
var ball;
var paddle;
var paddleX = getWidth() / 2 - PADDLE_WIDTH / 2;
var paddleY = getHeight() - PADDLE_OFFSET - (PADDLE_HEIGHT / 2);
var lives = 5;
//LIVES COUNTER
var livesCounter = new Text("Lives : " + lives, "15pt Arial");
livesCounter.setPosition(3, (getHeight()- 5));
add(livesCounter);
var ballsArr = [];

function start() {
    makeRows();
    ball = new BallCircle(BALL_RADIUS);
    ball.setIsBall();
    ball.setPosition(getWidth() / 2, getHeight() / 2);
    ball.dy = 3;
    ball.dx = 3;
    ballsArr.push(ball);
    setTimer(draw, 1);
//powerUp(oneUp);
    paddle = new Rectangle(PADDLE_WIDTH, PADDLE_HEIGHT);
    paddle.setPosition(paddleX, paddleY);
    mouseMoveMethod(movePaddle);
    add(paddle);
    add(ball);
// powerups
//setTimer(powerupMovement, 1);
//setTimer( rainbowPowerups, 50 );
}
function draw() {
    livesCounter.setText("Lives :" + lives);
    for (var b = 0; b < ballsArr.length; b++)
{
    var hasHitBrick = false;
    var x = 0;
    var y = 0;
    var spawnX = ball.x;
    var spawnY = ball.y;
    var elemTop = getElementAt(ballsArr[b].getX(), ballsArr[b].getY() - (BALL_RADIUS));
    var elemLeft = getElementAt(ballsArr[b].getX() - (BALL_RADIUS), ballsArr[b].getY());
    var elemRight = getElementAt(ballsArr[b].getX() + (BALL_RADIUS), ballsArr[b].getY());
    var elemBottom = getElementAt(ballsArr[b].getX(), ballsArr[b].getY() + (BALL_RADIUS));

    if (elemBottom != livesCounter && elemTop != livesCounter && elemLeft != livesCounter && elemRight != livesCounter) {
    if (elemBottom == paddle)
{
ballsArr[b].dy = -ballsArr[b].dy;
}
   if (elemTop != null && elemTop != ballsArr[b] && elemTop != paddle && elemTop.isPowerup != true && elemTop.isBall != true) {
        spawnX = elemTop.x + BRICK_WIDTH / 2;
        spawnY = elemTop.y + BRICK_HEIGHT / 2;
        remove(elemTop);
        ballsArr[b].dy = -ballsArr[b].dy;
        brickRemove = brickRemove + 1;
        hasHitBrick = true;
}
    if (elemLeft != null && elemLeft != ballsArr[b] && elemLeft != paddle && elemLeft.isPowerup != true && elemLeft.isBall != true) {
        spawnX = elemLeft.x + BRICK_WIDTH / 2;
        spawnY = elemLeft.y + BRICK_HEIGHT / 2;
        remove(elemLeft);
        ballsArr[b].dx = -ballsArr[b].dx;
        brickRemove = brickRemove + 1;
        hasHitBrick = true;
}
    if (elemRight != null && elemRight != ballsArr[b] && elemRight != paddle && elemRight.isPowerup != true && elemRight.isBall != true) {
        spawnX = elemRight.x + BRICK_WIDTH / 2;
        spawnY = elemRight.y + BRICK_HEIGHT / 2;
        remove(elemRight);
        ballsArr[b].dx = -ballsArr[b].dx;
        brickRemove = brickRemove + 1;
        hasHitBrick = true;
}
    if (elemBottom != null && elemBottom != ballsArr[b] && elemBottom != paddle && elemBottom.isPowerup != true && elemBottom.isBall != true ) {
        spawnX = elemBottom.x + BRICK_WIDTH / 2;
        spawnY = elemBottom.y + BRICK_HEIGHT / 2;
        remove(elemBottom);
        ballsArr[b].dy = -ballsArr[b].dy;
        brickRemove = brickRemove + 1;
        hasHitBrick = true;
}
    if (hasHitBrick) {
        x = spawnX;
        y = spawnY;
        var randInt = Randomizer.nextInt(1, 15);
//if(randInt == 5 || randInt == 10 )
// spawnPowerup(x, y);
}
}
checkWalls(b);
winLost(b);
if(ballsArr[b] != undefined)
{
ballsArr[b].move(ballsArr[b].dx, ballsArr[b].dy);
}
}
}
function newBall() {
    var nBall = new BallCircle(BALL_RADIUS);
        nBall.setIsBall();
        nBall.dx = 3;
        nBall.dy = 3;
        nBall.setPosition(getWidth() / 2 - BALL_RADIUS, getHeight() / 2 - BALL_RADIUS);
        add(nBall);
        ballsArr.push(nBall);
}
function checkWalls(z) {
//right wall
    if (ballsArr[z].getX() + ballsArr[z].getRadius() > getWidth()) {
        ballsArr[z].dx = ballsArr[z].dx * -1;
}
//left wall
if (ballsArr[z].getX() - ballsArr[z].getRadius() < 0) {
ballsArr[z].dx = ballsArr[z].dx * -1;
}
// Top wall
    if (ballsArr[z].getY() - ballsArr[z].getRadius() < 0) {
        ballsArr[z].dy = ballsArr[z].dy * -1;
}
}
function checkLives() {

    if (lives == 0) {
        livesCounter.setText("Lives :" + lives);
        stopTimer(draw);
    var lost = new Text("you lose, try again", "30pt Comic Sans");
        lost.setPosition((getWidth() / 2) - 150, (getHeight() / 2)- 50);
        add(lost);
}
}
function winLost(p) {
    if (ballsArr[p].getY() + ballsArr[p].getRadius() > getHeight()) {
        stopTimer(draw);
        remove(ballsArr[p]);
    if(ballsArr[p] == ball)
{
        ballsArr[p].setPosition(getWidth() / 2, getHeight() / 2);
        add(ballsArr[p]);
}
    else
{
    ballsArr.remove(p);
}
    setTimer(draw, 15);
    lives--;
    checkLives();
}
   if (brickRemove == NUM_ROWS * NUM_BRICKS_PER_ROW) {
    stopTimer(draw);
    remove(ballsArr[p]);
    var winner = new Text("You Win ", "30pt Arial");
    winner.setPosition((getWidth() / 2) - 150, (getHeight() / 2)-50);
    add(winner);
}
}
function movePaddle(e) {
    paddle.setPosition(e.getX() - PADDLE_WIDTH / 2, paddleY);
    if (e.getX() <= (PADDLE_WIDTH / 2)) {
    paddle.setPosition(0, paddleY);
    }
    if (e.getX() >= (getWidth() - (PADDLE_WIDTH / 2))) {
    paddle.setPosition(getWidth() - PADDLE_WIDTH, paddleY);
}
}
function makeBrick(color, x, y) {
var bricks = new Rectangle(BRICK_WIDTH, BRICK_HEIGHT);
    bricks.setColor(color);
    bricks.setPosition(x, y);
    add(bricks);
}
function brickColor() {
    if (counterThree == 20) {
    colorChange = Color.ORANGE;
    } else if (counterThree == 40) {
    colorChange = Color.GREEN;
    } else if (counterThree == 60) {
    colorChange = Color.BLUE;
    } else if (counterThree == 80) {
    colorChange = Color.RED;
}
}
function makeRows() {
    for (var i = 0; i <= ((NUM_BRICKS_PER_ROW * NUM_ROWS) - 1); i++) {
    counterThree++;
    if (i % 10 == 0) {
    counter++;
}
    counterTwo++;
    if (i % 10 == 0) {
    counterTwo = 0;
}
    makeBrick(colorChange, 0 + BRICK_SPACING + (BRICK_WIDTH * counterTwo + BRICK_SPACING * counterTwo), (BRICK_TOP_OFFSET * counter + BRICK_SPACING * counter));
    brickColor();
}
}
    class BallCircle extends Circle
{
    constructor(radius)
{
    super(radius)
}
    setIsBall()
{
this.isBall = true;
}
}