
// CLOSE/OPEN MENU FUNCTIONS
function buttonFunction () {
    var hiddenmenu = document.getElementById("hiddenmenu");
    if (hiddenmenu.style.visibility === "hidden" || hiddenmenu.style.visibility === "") {
        hiddenmenu.style.opacity = "100%"
        
        hiddenmenu.style.visibility = "visible"; 
        
    }
}

function buttonCloseFunction () {
    var hiddenmenu = document.getElementById("hiddenmenu");
    if (hiddenmenu.style.visibility === "visible") {
        hiddenmenu.style.opacity = "0%"
        setTimeout (() => {
            hiddenmenu.style.visibility = "hidden";
        }, 680
        )
    }
}

// stops screen from moving down when pressing arrow keys
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);





// SNAKE GAME JAVA SCRIPT

//define html elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('high-score');

//define game variables
const gridSize = 20;
let snake = [{x: 10, y: 10}];
let food = generateFood();
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;
let highScore = 0;


//draw game map, snake, food
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

//draw snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake')
        setPosition(snakeElement, segment)
        board.appendChild(snakeElement);
    }) 

}

//create a snake or food div
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element; 
}

//set posiion of snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

//testing draw function
// draw();

//draw food function
function drawFood() {
    if (gameStarted) {
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

//generate food
function generateFood() {
    while (true) {
        x = Math.floor(Math.random() * gridSize) + 1;
        y = Math.floor(Math.random() * gridSize) + 1;

        if (snake.every((segment) => {
            if (segment.x === x && segment.y === y) {
            
                return false;
            }
            return true;
        })) {
            return {x, y};
        }
    }
    
}

//move snake
function move() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
    }

    snake.unshift(head);

    // snake.pop();

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval); //clear past interval
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay)
    } else {
        snake.pop();
    }

}

//test moving
// setInterval(() => {
//     move(); //move first
//     draw(); //then draw again new pos.
// }, 300)

//start game function
function startGame() {
    gameStarted = true; //keep track of a running game
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    direction = 'right';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay)
} 

//keypress event listener
function handleKeyPress(event) {
    if( 
        (!gameStarted && event.code === 'Space') ||
        (!gameStarted && event.key === ' ')
        ) {
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;

            case 'ArrowDown':
                direction = 'down';
                break;

            case 'ArrowRight':
                direction = 'right';
                break;

            case 'ArrowLeft':
                direction = 'left';
                break;    
        }
    }
}

document.addEventListener('keydown', handleKeyPress)

function increaseSpeed() {
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;

    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -=3;

    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -=2;

    } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -=1;
    }
}


//collision check
function checkCollision() {
    const head = snake[0]

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame()
        }
    }
}

// reset game function
function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{x:10, y:10}];
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 200;
    updateScore
}

//update score
function updateScore() {
    const currentScore = snake.length -1;
    score.textContent = currentScore.toString().padStart(3, '0')
}

//stop game when resetting
function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
}

//highscore function
function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore){
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0')
    }

    highScoreText.style.display = 'block';
}

