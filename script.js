var canvas;
var stage;
var container;
var captureContainers;
var captureIndex;
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'ZMBv_6UWq-o', 
        playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: 'ZMBv_6UWq-o'
        },
        events: {
            'onReady': function(event) {
                event.target.setVolume(50);
                event.target.playVideo();
            }
        }
    });
}

function init() {
    canvas = document.getElementById("testCanvas");
    stage = new createjs.Stage(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var w = canvas.width;
    var h = canvas.height;

    container = new createjs.Container();
    stage.addChild(container);

    captureContainers = [];
    captureIndex = 0;

    for (var i = 0; i < 100; i++) {
        var heart = new createjs.Shape();
        heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 30));
        heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
        heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);
        heart.y = -100;

        container.addChild(heart);
    }

    for (i = 0; i < 100; i++) {
        var captureContainer = new createjs.Container();
        captureContainer.cache(0, 0, w, h);
        captureContainers.push(captureContainer);
    }

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on("tick", tick);
}

function tick(event) {
    var w = canvas.width;
    var h = canvas.height;
    var l = container.numChildren;

    captureIndex = (captureIndex + 1) % captureContainers.length;
    stage.removeChildAt(0);
    var captureContainer = captureContainers[captureIndex];
    stage.addChildAt(captureContainer, 0);
    captureContainer.addChild(container);

    for (var i = 0; i < l; i++) {
        var heart = container.getChildAt(i);
        if (heart.y < -50) {
            heart._x = Math.random() * w;
            heart.y = h * (1 + Math.random()) + 50;
            heart.perX = (1 + Math.random() * 2) * h;
            heart.offX = Math.random() * h;
            heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
            heart.velY = -Math.random() * 2 - 1;
            heart.scale = Math.random() * 2 + 1;
            heart._rotation = Math.random() * 40 - 20;
            heart.alpha = Math.random() * 0.75 + 0.05;
            heart.compositeOperation = Math.random() < 0.33 ? "lighter" : "source-over";
        }
        var int = (heart.offX + heart.y) / heart.perX * Math.PI * 2;
        heart.y += heart.velY * heart.scaleX / 2;
        heart.x = heart._x + Math.cos(int) * heart.ampX;
        heart.rotation = heart._rotation + Math.sin(int) * 30;
    }

    captureContainer.updateCache("source-over");
    stage.update(event);
}

init();

// Lógica de los botones
document.getElementById("yes").addEventListener("click", function() {
    let container = document.querySelector(".container");
    container.style.display = "none"; // Ocultar mensaje anterior
    
    if (player && player.playVideo) {
        player.playVideo();
    }
    
    showInvitationDetails();
});

document.getElementById("no").addEventListener("mouseover", function() {
    let button = document.getElementById("no");
    let randomX = Math.random() * (window.innerWidth - button.clientWidth);
    let randomY = Math.random() * (window.innerHeight - button.clientHeight);
    button.style.position = "absolute";
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
});

function showInvitationDetails() {
    let card = document.createElement("div");
    card.classList.add("invitation-card");
    card.innerHTML = `
        <div class="heart-image"></div>
        <h2>¿Qué recibes al aceptar esta invitación?</h2>
        <ul>
            <li>❤️ Muchos besos.</li>
            <li>🍔 Mucha comida.</li>
            <li>🎁 Sorpresas.</li>
            <li>🎮 Juegos.</li>
            <li>🏍️ Paseo en moto por Medellín.</li>
            <li>Día y Hora: Viernes 14 de Febrero 7:30 p.m. </li>
            <li>Lugar: Déjate llevar. </li>
        </ul>
    `;
    document.body.appendChild(card);
}
