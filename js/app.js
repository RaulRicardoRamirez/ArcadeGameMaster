let scorePlayer = 0;
const possitionInitialPlayerX = 200;
const possitionInitialPlayerY = 400;
let scoreGemBlue = 0;


// Enemies our player must avoid
var Enemy = function(axisXMove, axisYMove, enemySpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = axisXMove;
    this.y = axisYMove;
    this.speed = enemySpeed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    // validates if the enemy reaches the canvas limit
    if (this.x > 505) 
    {
        this.x = 0;
        this.speed = Math.floor(Math.random() * 500);
    }

    // Validate if there is a collision between the enemy and the player
    if (player.x < this.x + 40 &&  player.x + 40 > this.x && player.y < this.y + 40 && 40 + player.y > this.y) 
    {
        scorePlayer--;
        document.getElementById('scorePlayer').innerText = scorePlayer;

        countGemBlue = Math.trunc(scorePlayer / 5);
        if (countGemBlue >= 0)
        {
            const ulBoardGemBlue = document.getElementById('boardGemBlue');
            const fisrtChild = ulBoardGemBlue.firstElementChild;
            const childerCount = ulBoardGemBlue.childElementCount;
            const diferenceChild = childerCount - countGemBlue;
            for (let index = 0; index < diferenceChild; index++) {
              ulBoardGemBlue.firstChild.remove();
            }
        }

        player.y = possitionInitialPlayerY;
    } 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
let OwnPlayer = function (possitionPlayerX, possitionPlayerY, playerSpeed) {
    this.x = possitionPlayerX;
    this.y = possitionPlayerY;
    this.speed = playerSpeed
    this.sprite = 'images/char-boy.png'
  }

// This class requires an update(), render() and
// a handleInput() method.
OwnPlayer.prototype.update = function () {
    // validates if the player reaches the canvas limit
    if (this.y < 0) 
    {
        scorePlayer++;
        document.getElementById('scorePlayer').innerText = scorePlayer;
        const liGemBlue = document.createDocumentFragment(); 
        countGemBlue = Math.trunc(scorePlayer / 5);
        if (countGemBlue > 0)
        {
            
            const ulBoardGemBlue = document.querySelector('#boardGemBlue');
            const childerCount = ulBoardGemBlue.childElementCount;
            const diferenceChild = countGemBlue - childerCount;
            for (let index = 0; index < diferenceChild; index++) {
                const newElement = document.createElement('li');   
                newElement.innerHTML = '<li><img src="images/Gem Blue.png"></li>';
                liGemBlue.appendChild(newElement);
            }

            ulBoardGemBlue.appendChild(liGemBlue);
        }

        this.x = possitionInitialPlayerX;
        this.y = possitionInitialPlayerY;
    }

    if (this.x > 400) 
    {
      this.x = 400;
    }

    if (this.x < 0) 
    {
      this.x = 0;
    }

    if (this.y > 400) 
    {
      this.y = 400;
    }
  }

  OwnPlayer.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }


  OwnPlayer.prototype.handleInput = function (key) {
    switch (key) 
    {
        case 'left':
            this.x -= this.speed + 80;
            break;
        case 'right':
            this.x += this.speed + 80;
            break;
        case 'up':
            this.y -= this.speed + 60;
            break;  
        case 'down':
            this.y += this.speed + 60;
            break;
    }
  }


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
const player = new OwnPlayer(200, 400, 20);
///var positionEnemy = [first_road, second_road, third_road];
var positionEnemy = [55, 150, 220];
positionEnemy.forEach(function (y) 
{
    let speedEnemy = Math.floor(Math.random() * 500);
    allEnemies.push(new Enemy(0, y, speedEnemy));
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
