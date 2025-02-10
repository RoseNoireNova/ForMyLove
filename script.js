document.getElementById("yes").addEventListener("click", function() {
    document.getElementById("response").innerText = "¡Sabía que dirías que sí! ❤️ Nos vemos el 14.";
});

document.getElementById("no").addEventListener("mouseover", function() {
    let button = document.getElementById("no");
    let randomX = Math.random() * (window.innerWidth - button.clientWidth);
    let randomY = Math.random() * (window.innerHeight - button.clientHeight);
    button.style.position = "absolute";
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
});
