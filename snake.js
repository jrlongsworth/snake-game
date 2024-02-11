// This function will run when the window loads
window.onload = function() {
    // Initialize the score
    let score = 0;

    // Get the score element
    let scoreElement = document.getElementById('score');

    // Get the canvas and context
    let canvas = document.getElementById('game');
    let context = canvas.getContext('2d');

    // Change the colors
    let snakeColor = "lime";
    let foodColor = "red";
    let obstacleColor = "blue";

    // Define the size of each square (box)
    let box = 32;

    // Initialize the snake as an array of objects
    let snake = [];
    snake[0] = { x: 8 * box, y: 8 * box };

    // Set the initial direction of the snake
    let direction = "right";

    // Create the food object at a random position
    let food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }

    // Function to draw the background
    function createBG() {
        context.fillStyle = "lightgreen";
        context.fillRect(0, 0, 16 * box, 16 * box);
    }

    // Function to draw the snake
    function createSnake() {
        for(let i = 0; i < snake.length; i++){
            context.fillStyle = (i == 0)? snakeColor : "white";
            context.fillRect(snake[i].x, snake[i].y, box, box);

            context.strokeStyle = "red";
            context.strokeRect(snake[i].x, snake[i].y, box, box);
        }
    }

    // Function to draw the food
    function drawFood() {
        context.fillStyle = foodColor;
        context.fillRect(food.x, food.y, box, box);
    }

    // Event listener for the arrow keys to change the direction of the snake
    document.addEventListener('keydown', update);

    function update(event) {
        if (event.keyCode == 37 && direction != 'right') direction = 'left';
        if (event.keyCode == 38 && direction != 'down') direction = 'up';
        if (event.keyCode == 39 && direction != 'left') direction = 'right';
        if (event.keyCode == 40 && direction != 'up') direction = 'down';
    }

    // Define the obstacles
    let obstacles = [
        { x: 3 * box, y: 3 * box },
        { x: 6 * box, y: 7 * box },
        { x: 9 * box, y: 12 * box },
        // Add more obstacles as needed
    ];

    // Function to draw the obstacles
    function createObstacles() {
        context.fillStyle = obstacleColor;
        for (let i = 0; i < obstacles.length; i++) {
            context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
        }
    }

    // Function to start the game and implement the game logic
    function startGame() {
        // If the snake hits the border, it appears on the other side
        if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
        if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
        if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
        if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

        // Check if the snake has hit itself
        for (i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                clearInterval(game);
                alert('Game Over :(');
            }
        }

        // Check if the snake hits an obstacle
        for (let i = 0; i < obstacles.length; i++) {
            if (snake[0].x == obstacles[i].x && snake[0].y == obstacles[i].y) {
                clearInterval(game);
                alert('Game Over :(');
            }
        }

        // Draw the background, snake, and food
        createBG();
        createSnake();
        drawFood();

        // Draw the obstacles
        createObstacles();

        // Get the current head position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        // Change the direction of the snake
        if (direction == "right") snakeX += box;
        if (direction == "left") snakeX -= box;
        if (direction == "up") snakeY -= box;
        if (direction == "down") snakeY += box;

        // If the snake eats the food, increase the score
        if (snakeX != food.x || snakeY != food.y) {
            // Remove the tail of the snake
            snake.pop();
        } else {
            // Increase the score
            score++;
            // Update the score display
            scoreElement.innerText = "Score: " + score;
            // Create new food
            food.x = Math.floor(Math.random() * 15 + 1) * box;
            food.y = Math.floor(Math.random() * 15 + 1) * box;
        }

        // Create a new head and add it to the beginning of the snake
        let newHead = {
            x: snakeX,
            y: snakeY
        }

        snake.unshift(newHead);
    }

    // Call the drawScore function every 100ms
    let game = setInterval(function() {
        startGame();
    }, 100);
}