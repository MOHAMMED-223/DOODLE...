// إعداد القماش (Canvas)
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

// حجم الخلية وعدد الخلايا
var tileSize = 20;
var tileCount = 20;

// الثعبان
var snake = [];
snake[0] = { x: 10, y: 10 };

// الطعام
var food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
};

// الحركة الافتراضية
var dx = 0;
var dy = 0;

// النقاط
var score = 0;
var bestScore = localStorage.getItem('bestScore') || 0; // الحصول على أفضل النقاط المحفوظة

// الحركة والتحكم
document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode == 37) {
        dx = -1;
        dy = 0;
    } else if (event.keyCode == 38) {
        dx = 0;
        dy = -1;
    } else if (event.keyCode == 39) {
        dx = 1;
        dy = 0;
    } else if (event.keyCode == 40) {
        dx = 0;
        dy = 1;
    }
}

// الرسم والتحديث
function draw() {
    // رسم الخلفية
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // رسم الثعبان
    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'white';
        ctx.fillRect(snake[i].x * tileSize, snake[i].y * tileSize, tileSize, tileSize);
    }

    // رسم الطعام
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

    // عرض النقاط وأفضل النقاط
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
    ctx.fillText('Best Score: ' + bestScore, 10, 60);
}

// الحلقة الرئيسية
function main() {
    setTimeout(function onTick() {
        draw();
        move();
        // اختبار الخسارة
        if (isGameOver()) {
            alert('Game Over!');
            restartGame(); // إعادة اللعبة عند الخسارة
            return;
        }
        main();
    }, 100);
}

// الحركة
function move() {
    var head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (snake[0].x === food.x && snake[0].y === food.y) {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
        };
        score++; // زيادة النقاط عند تناول الطعام
    } else {
        snake.pop();
    }

    // تحديث أفضل النقاط
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore); // حفظ أفضل النقاط
    }
}

// إعادة اللعبة
function restartGame() {
    snake = [];
    snake[0] = { x: 10, y: 10 };
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
    };
    dx = 0;
    dy = 0;
    score = 0;
    main();
}

// اختبار الخسارة
function isGameOver() {
    for (var i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount;
}

// بدء اللعبة
main();
