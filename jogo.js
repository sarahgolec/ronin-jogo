// Game Engine em Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameLoopId = null;

// Objeto do Jogador
const player = {
    x: 100,
    y: 200,
    size: 20,
    speed: 3,
    hp: 95,
    maxHp: 100,
    mp: 80,
    maxMp: 100,
    color: '#ffb703'
};

// Teclas Pressionadas
const keys = {};

window.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);

function updateGame() {
    // Movimentação
    if (keys['w'] || keys['arrowup']) player.y -= player.speed;
    if (keys['s'] || keys['arrowdown']) player.y += player.speed;
    if (keys['a'] || keys['arrowleft']) player.x -= player.speed;
    if (keys['d'] || keys['arrowright']) player.x += player.speed;

    // Limites da Tela
    player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));
}

function drawHUD() {
    // Barra de Vida
    ctx.fillStyle = '#333';
    ctx.fillRect(10, 10, 150, 15);
    ctx.fillStyle = '#e63946';
    ctx.fillRect(10, 10, (player.hp / player.maxHp) * 150, 15);

    // Barra de Mana
    ctx.fillStyle = '#333';
    ctx.fillRect(10, 30, 100, 10);
    ctx.fillStyle = '#4cc9f0';
    ctx.fillRect(10, 30, (player.mp / player.maxMp) * 100, 10);

    // Texto de Status
    ctx.fillStyle = '#fff';
    ctx.font = '12px sans-serif';
    ctx.fillText(`${player.hp} / ${player.maxHp}`, 60, 22);
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar Cenário Simples
    ctx.fillStyle = '#1e2530';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar Jogador (Ronin)
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // HUD
    drawHUD();
}

function loop() {
    updateGame();
    drawGame();
    gameLoopId = requestAnimationFrame(loop);
}

function iniciarJogoCanvas() {
    if (!gameLoopId) {
        loop();
    }
}

function pararJogoCanvas() {
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
        gameLoopId = null;
    }
}