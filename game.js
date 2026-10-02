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

window.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);-
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
// ==========================================
// SISTEMA DE PARTÍCULAS: FOLHAS DE SAKURA A CAIR
// ==========================================

const sakuraCanvas = document.getElementById('sakuraCanvas');
const sakuraCtx = sakuraCanvas ? sakuraCanvas.getContext('2d') : null;

if (sakuraCanvas && sakuraCtx) {
    let width = (sakuraCanvas.width = window.innerWidth);
    let height = (sakuraCanvas.height = window.innerHeight);

    // Ajusta o tamanho se a janela for redimensionada
    window.addEventListener('resize', () => {
        width = sakuraCanvas.width = window.innerWidth;
        height = sakuraCanvas.height = window.innerHeight;
    });

    // Quantidade de folhas (reduz em dispositivos móveis para manter performance)
    const totalPetals = window.innerWidth < 768 ? 25 : 55;
    const petals = [];

    // Estrutura de cada folha
    class Petal {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height - height;
            this.size = Math.random() * 8 + 5; // Tamanho da pétala
            this.speedY = Math.random() * 1.5 + 0.8; // Velocidade de queda
            this.speedX = Math.random() * 1 - 0.5; // Oscilação lateral
            this.angle = Math.random() * Math.PI * 2; // Rotação
            this.spin = Math.random() * 0.03 - 0.015; // Velocidade de rotação
            this.color = Math.random() > 0.3 ? '#ffb7c5' : '#e63946'; // Tons de rosa e vermelho
            this.opacity = Math.random() * 0.6 + 0.4;
        }

        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.angle) + this.speedX;
            this.angle += this.spin;

            // Se a folha passar do fundo da tela, renasce no topo
            if (this.y > height + 20) {
                this.y = -20;
                this.x = Math.random() * width;
            }
        }

        draw() {
            sakuraCtx.save();
            sakuraCtx.translate(this.x, this.y);
            sakuraCtx.rotate(this.angle);
            sakuraCtx.globalAlpha = this.opacity;
            sakuraCtx.fillStyle = this.color;

            // Desenhar formato de pétala/folha
            sakuraCtx.beginPath();
            sakuraCtx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
            sakuraCtx.fill();

            sakuraCtx.restore();
        }
    }

    // Criar as pétalas
    for (let i = 0; i < totalPetals; i++) {
        petals.push(new Petal());
    }

    // Loop de Animação
    function animateSakura() {
        sakuraCtx.clearRect(0, 0, width, height);

        petals.forEach((petal) => {
            petal.update();
            petal.draw();
        });

        requestAnimationFrame(animateSakura);
    }

    animateSakura();
}
