// 获取画布和上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 游戏配置
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// 游戏状态
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let score = 0;
let highScore = 0;
let gameLoop = null;
let isRunning = false;
let isPaused = false;

// DOM 元素
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');

// 初始化游戏
function init() {
    // 设置初始蛇的位置
    snake = [
        { x: 5, y: 10 },
        { x: 4, y: 10 },
        { x: 3, y: 10 }
    ];
    
    // 重置方向
    direction = 'right';
    nextDirection = 'right';
    
    // 重置分数
    score = 0;
    updateScore();
    
    // 生成食物
    generateFood();
    
    // 重置状态
    isRunning = true;
    isPaused = false;
    
    // 开始游戏循环
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(gameUpdate, 100);
    
    // 更新按钮状态
    startBtn.textContent = '重新开始';
    pauseBtn.disabled = false;
    pauseBtn.textContent = '暂停';
}

// 游戏更新循环
function gameUpdate() {
    if (!isRunning || isPaused) return;
    
    // 更新方向
    direction = nextDirection;
    
    // 计算新的蛇头位置
    const head = { ...snake[0] };
    
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }
    
    // 检查碰撞
    if (checkCollision(head)) {
        gameOver();
        return;
    }
    
    // 添加新的蛇头
    snake.unshift(head);
    
    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScore();
        generateFood();
    } else {
        // 移除蛇尾
        snake.pop();
    }
    
    // 绘制游戏
    draw();
}

// 检查碰撞
function checkCollision(head) {
    // 检查是否撞墙
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }
    
    // 检查是否撞到自己
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            return true;
        }
    }
    
    return false;
}

// 生成食物
function generateFood() {
    let validPosition = false;
    
    while (!validPosition) {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        
        // 确保食物不会生成在蛇身上
        validPosition = !snake.some(segment => 
            segment.x === food.x && segment.y === food.y
        );
    }
}

// 绘制游戏
function draw() {
    // 清空画布
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制食物
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // 绘制蛇
    snake.forEach((segment, index) => {
        // 蛇头颜色不同
        if (index === 0) {
            ctx.fillStyle = '#2ecc71';
        } else {
            // 蛇身颜色渐变
            const greenValue = Math.max(100, 200 - index * 5);
            ctx.fillStyle = `rgb(46, ${greenValue}, 113)`;
        }
        
        ctx.fillRect(
            segment.x * gridSize + 1,
            segment.y * gridSize + 1,
            gridSize - 2,
            gridSize - 2
        );
        
        // 为蛇头添加眼睛
        if (index === 0) {
            ctx.fillStyle = 'white';
            const eyeSize = 4;
            const eyeOffset = 5;
            
            switch (direction) {
                case 'up':
                    ctx.fillRect(segment.x * gridSize + eyeOffset, segment.y * gridSize + 3, eyeSize, eyeSize);
                    ctx.fillRect(segment.x * gridSize + gridSize - eyeOffset - eyeSize, segment.y * gridSize + 3, eyeSize, eyeSize);
                    break;
                case 'down':
                    ctx.fillRect(segment.x * gridSize + eyeOffset, segment.y * gridSize + gridSize - eyeOffset - eyeSize, eyeSize, eyeSize);
                    ctx.fillRect(segment.x * gridSize + gridSize - eyeOffset - eyeSize, segment.y * gridSize + gridSize - eyeOffset - eyeSize, eyeSize, eyeSize);
                    break;
                case 'left':
                    ctx.fillRect(segment.x * gridSize + 3, segment.y * gridSize + eyeOffset, eyeSize, eyeSize);
                    ctx.fillRect(segment.x * gridSize + 3, segment.y * gridSize + gridSize - eyeOffset - eyeSize, eyeSize, eyeSize);
                    break;
                case 'right':
                    ctx.fillRect(segment.x * gridSize + gridSize - eyeOffset - eyeSize, segment.y * gridSize + eyeOffset, eyeSize, eyeSize);
                    ctx.fillRect(segment.x * gridSize + gridSize - eyeOffset - eyeSize, segment.y * gridSize + gridSize - eyeOffset - eyeSize, eyeSize, eyeSize);
                    break;
            }
        }
    });
}

// 更新分数显示
function updateScore() {
    scoreElement.textContent = score;
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        // 保存最高分到本地存储
        localStorage.setItem('snakeHighScore', highScore);
    }
}

// 游戏结束
function gameOver() {
    isRunning = false;
    clearInterval(gameLoop);
    
    // 显示游戏结束信息
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('游戏结束!', canvas.width / 2, canvas.height / 2 - 20);
    
    ctx.font = '20px Arial';
    ctx.fillText(`得分: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
    
    pauseBtn.disabled = true;
}

// 切换暂停状态
function togglePause() {
    if (!isRunning) return;
    
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? '继续' : '暂停';
    
    if (isPaused) {
        // 显示暂停信息
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('暂停', canvas.width / 2, canvas.height / 2);
    } else {
        draw();
    }
}

// 键盘事件监听
document.addEventListener('keydown', (event) => {
    // 防止方向键滚动页面
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
        event.preventDefault();
    }
    
    // 暂停/继续
    if (event.key === ' ') {
        if (isRunning) {
            togglePause();
        }
        return;
    }
    
    // 只有游戏运行且未暂停时才能改变方向
    if (!isRunning || isPaused) return;
    
    // 改变方向（防止反向移动）
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') nextDirection = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') nextDirection = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') nextDirection = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') nextDirection = 'right';
            break;
    }
});

// 按钮事件监听
startBtn.addEventListener('click', () => {
    init();
});

pauseBtn.addEventListener('click', () => {
    togglePause();
});

// 从本地存储加载最高分
const savedHighScore = localStorage.getItem('snakeHighScore');
if (savedHighScore) {
    highScore = parseInt(savedHighScore);
    highScoreElement.textContent = highScore;
}

// 初始绘制
draw();
