const canvasEl = document.querySelector("canvas");
const canvasContext = canvasEl.getContext("2d");

canvasEl.height = 600;
canvasEl.width = 800;

//Create necessary ball variables (speed,xP-xPosition,yP,radius)
let xP = 400; //this positions is for the center point of a ball
let yP = 300;
let radius = 50;
let speed = 10;

//Arrow Directions Event Listeners
//Create initial variables for directions keys (upDir,downDir,leftDir,rightDir)
let upDir = false;
let downDir = false;
let leftDir = false;
let rightDir = false;

/*"keydown" event is,
the event is gonna start firing 
and it is going to fire
as long as the key is down -- For that create a function and point at that "keyDown" function*/
document.addEventListener("keydown", keyDown);

/*"keyup" event is,
when the events stops firing
whenever the event is "keyUp"-- For that we create a function and point at that "keyUp" function */
document.addEventListener("keyup", keyUp);

/*The game loop. The job the game loop is 
to redraw the screen for us
60 times per second */

/* That is gonna give us 
the illusion of animating certain pieces of
the canvas */

/* In any game logic,
we're involved with some sort of game loop */

//Running the game -- The game loop
function runGame() {
  /* requestAnimationFrame is gonna render this function
    60 times per second.
    So 60 times per second
    we are refreshing our secreen 
    And each time the screen is being refreshed,
    we are drawing a specific piece on the screen 
    And we're gonna remove the previous image of
    that specific image*/
  requestAnimationFrame(runGame);

  /*With that
    when I move to the "up direction"
    there are still "balls" are being drawn,
    but the difference is that
    after the "ball moves to the next frame (per second)
    the previous frame is cleared */
  canvasContext.clearRect(0, 0, canvasEl.width, canvasEl.height);

  //Calling arrowInputs
  arrowInputs();

  //Calling collisionDetection
  collisionDetection();

  //Calling DrawBall
  drawBall();
}

//Collision Detection
/* We're gonna "detect the edge" 
by using "if statements" */
function collisionDetection() {
  //bottom boundary
  if (yP + radius >= canvasEl.height) {
    yP = canvasEl.height - radius;
    /* The "height" for the "top part of the canvas"
    is 0. Because that's where the canvas originates from.*/
    /*The original point of the canvas
    is always gonna be this "top-left corner".
    So for the Y axis is gonna be 0. For the X axis is gonna be 0 as well*/
    /* And If we travel top to all the way down to bottom, then the height for the Y is gonna be "canvasEl.height" (600)*/
    /* So 0 to 600 */
    /*If the "center of the ball"
    "passes the "the height of the canvas" 
    then it's gonna "fire the event" */
    /* This is when the collision is detected*/
    /*But the "interesting part of this"
    is that
    we "don't wanna detect the collision
    at the center of the ball
    instead  we wanna determine the collision
    at the circumference of the ball
    not the center of the ball" 

    This is where the things get interesting */
    /* Collision detection means that
    whenever the ball's circumference hits 
    this bottom of the canvas */
    /* So we need to "add radius".
    "Radius distance" which is from the center of
    the circle to "any side of the circle" is gonna be the "radius" */
    /* yP + radius >= canvasEl.height */
    /* With this,
    whenever the circumference of the ball 
    touches the bottom edge of the canvas
    the event is being fired.
    This is called collision detection */
    /*Another way of "detecting collision"
    is that "yP > canvasEl.height - radius" */
    /* When "collision detection happens"
    I wanna grab "y position"
    and set it to "canvasEl.height minus radius"*/
    /*With that
    we're no longer go further down 
    from the bottom of the canvas */
  }

  //right boundary
  if (xP >= canvasEl.width - radius) {
    /* If "X position of the ball"
   is greater or equal than 
   canvas width minus radius 
   then "reposition the ball in the X direction" */
    xP = canvasEl.width - radius;
  }

  //Negative directions (top boundary/left boundary)
  //top boundary
  /* "Radius of the circle" is any lines 
  that goes from the center of the circle
  to any part of the circle */
  /* "Y position" is the distance
  from "the top part of the canvas"
  all the way to the "center of the circle".
  That's actually "equal to radius" */
  /* So "Y position of the circle"
  when "it touches the top part of the canvas"
  is always going to be equal "to the radius" */
  if (yP <= radius) {
    yP = radius;
  }

  //left boundary
  /* When the "X position" is equal "to the radius of the circle",
  it means that
  "some touching has been occurred"*/
  if (xP <= radius) {
    xP = radius;
  }

  /* With that
  our ball never move off the canvas.
  You can think of it
  as your character.
  */
}

//Moving Balls
function arrowInputs() {
  /*Whenever the direction keys is pressed,
    we wanna move the ball by its radius, by its amount */
  if (upDir) {
    /*Whenever the "up key is pressed",
      it means that
      "the ball is moving in the Y direction" */
    /* In the world of CSS
      If you're "upwards",
      it means that
      you are moving "to the negative direction"
      "It has the same concept with margins and paddings" (If you provide a margin of
    negative 10px, the element is gonna "move up")(If you provide "a margin of positive 10px,
    that element is gonna "move down" " 
    "For X axis, negative is gonna be left,
    and positive is gonna be right*/
    /* This is how CSS world works, and the same thing applies in Javascript */
    /* So whenever the ball is moving "in the up direction", we're gonna grab the "Y position of that ball"
    And "from that Y posiiton of that ball
    we're gonna subtract the speed"
    it means that
    "the ball is moving up" */
    yP = yP - speed;

    /* We have a problem here. And this is the idea behind any gaming logic;
    Any time the screen is being refreshed,
    we are redrawing the screen,
    and If we do not "clear the screen"
    "after we have drawn the frame"
    This problem is gonna "appear";
    "We are gonna get continuous line"

    To fix that
    we need to "remove all the previous ball drawings/shapes"*/

    /*In order to clear our canvas
    we have a method called "clearRect"
    clearRect(xP,yP,width,height)*/
  }

  /* To create "diagonal movement" -     top-right, bottom-left, top-left movements
    we need to use "if statements"
    we shouldn't use "if else statements" 
    because we can select "two statements"
    at the same time */
  if (downDir) {
    yP =
      yP +
      speed; /*"Down direction is positive" that's why we're adding speed. With that ball is moving down*/
  }

  if (leftDir) {
    xP =
      xP -
      speed; /*"Moving to the left means" moving to the "negative direciton in X axis". That's why we're subtracting this from the speed*/
  }
  if (rightDir) {
    xP = xP + speed; /* With this, various "independent if statements" 
    we can move "diagonally"
    because we can have various "true statements"
    at the same time */
  }
}

//Drawing the ball - We know how to draw a circle
function drawBall() {
  /*If you wanna fill that circle, you will say fillStyle. If you wanna just provide the circumference color, you just gonna say strokeStyle */
  canvasContext.fillStyle = "white";
  canvasContext.beginPath();
  canvasContext.arc(xP, yP, radius, 0, Math.PI * 2);
  canvasContext.fill();
}

//Arrow Key Functions
function keyDown(e) {
  /* For the "up arrow" the "keyCode" is 38.
For "arrow down" the "keyCode" is 40
Left is 37. Right is 39 */

  /*Create If checks for specific KeyCodes.
So whenever the keyCode is 38, grab the "up direction variable" and set it to "true". It means "we are moving in the up direction" */
  if (e.keyCode === 38) {
    upDir = true;
  }
  if (e.keyCode === 40) {
    downDir = true;
  }
  if (e.keyCode === 37) {
    leftDir = true;
  }
  if (e.keyCode === 39) {
    rightDir = true;
  }
}
/*Copy paste the "keyDown function"
and do the same thing for "keyUp function".
And "stop the event is firing
So set the variable to "false" */
function keyUp(e) {
  if (e.keyCode === 38) {
    upDir = false;
  }
  if (e.keyCode === 40) {
    downDir = false;
  }
  if (e.keyCode === 37) {
    leftDir = false;
  }
  if (e.keyCode === 39) {
    rightDir = false;
  }
}

runGame();
