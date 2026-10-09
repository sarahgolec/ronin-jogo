(() => {
    const canvas = document.getElementById('sakuraCanvas');
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const petals = [];
    const petalCount = reduceMotion ? 0 : (window.innerWidth < 768 ? 16 : 32);
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frameId = null;

    const resizeCanvas = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    class Petal {
        constructor(startAtRandomHeight = true) {
            this.x = Math.random() * width;
            this.y = startAtRandomHeight ? Math.random() * height : -20;
            this.size = Math.random() * 5 + 4;
            this.fallSpeed = Math.random() * 0.8 + 0.55;
            this.drift = Math.random() * 0.55 + 0.15;
            this.angle = Math.random() * Math.PI * 2;
            this.spin = Math.random() * 0.025 - 0.0125;
            this.color = Math.random() > 0.3 ? '#ffb7c5' : '#e63946';
            this.opacity = Math.random() * 0.38 + 0.3;
        }

        update() {
            this.y += this.fallSpeed;
            this.x += Math.sin(this.angle) * this.drift;
            this.angle += this.spin;

            if (this.y > height + 16) {
                this.y = -16;
                this.x = Math.random() * width;
            }

            if (this.x < -16) this.x = width + 16;
            if (this.x > width + 16) this.x = -16;
        }

        draw() {
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.globalAlpha = this.opacity;
            context.fillStyle = this.color;
            context.beginPath();
            context.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
            context.fill();
            context.restore();
        }
    }

    const animate = () => {
        frameId = null;
        if (document.hidden || reduceMotion) return;

        context.clearRect(0, 0, width, height);
        petals.forEach((petal) => {
            petal.update();
            petal.draw();
        });

        frameId = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
        if (!document.hidden && !reduceMotion && frameId === null) {
            frameId = window.requestAnimationFrame(animate);
        }
    };

    resizeCanvas();
    for (let index = 0; index < petalCount; index += 1) petals.push(new Petal());
    window.addEventListener('resize', resizeCanvas, { passive: true });
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && frameId !== null) {
            window.cancelAnimationFrame(frameId);
            frameId = null;
        } else {
            startAnimation();
        }
    });

    startAnimation();
})();
