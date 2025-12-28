document.addEventListener('DOMContentLoaded', () => {
    const giftBox = document.getElementById('giftBox');
    const contentCard = document.getElementById('contentCard');
    const instruction = document.querySelector('.instruction');
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    const restartBtn = document.getElementById('restartBtn');

    let confettiActive = false;
    let particles = [];

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function openGift() {
        giftBox.classList.add('opened');
        instruction.style.opacity = '0';
        
        // Wait for connection of box animation
        setTimeout(() => {
            contentCard.classList.remove('hidden');
            // Force reflow
            void contentCard.offsetWidth; 
            contentCard.classList.add('visible');
            startConfetti();
        }, 500);

        // Hide box completely after it fades out
        setTimeout(() => {
            giftBox.style.display = 'none';
        }, 800);
    }

    giftBox.addEventListener('click', openGift);

    restartBtn.addEventListener('click', () => {
        location.reload();
    });

    // Confetti Logic
    function startConfetti() {
        confettiActive = true;
        for (let i = 0; i < 150; i++) {
            particles.push(createParticle());
        }
        animateConfetti();
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            color: `hsl(${Math.random() * 360}, 100%, 70%)`,
            speedY: Math.random() * 3 + 2,
            speedX: (Math.random() - 0.5) * 4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        };
    }

    function animateConfetti() {
        if (!confettiActive) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();

            // Reset particle if it goes off screen
            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(animateConfetti);
    }
});
