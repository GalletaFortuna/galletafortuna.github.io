function mostrarTemporizador(tiempo) {
    var timerElement = document.getElementById("timer");
    timerElement.textContent = tiempo;
}

function iniciarTemporizador(tiempoRestante) {
    mostrarTemporizador(convertirTiempoAMinutos(tiempoRestante));

    var interval = setInterval(function() {
        tiempoRestante--;
        localStorage.setItem('tiempoRestante', tiempoRestante);

        if (tiempoRestante >= 0) {

            mostrarTemporizador(convertirTiempoAMinutos(tiempoRestante));
        } else {
            clearInterval(interval);
            imgElement.src = galleta;
            timerElement.textContent = "Tu galleta ya está recién horneada!";
            index = -1
            blogContainer.style.display = "none";
            textContainer.style.display = "none";
            body.style.height = "100vh";
        }
    }, 1000);
}

function convertirTiempoAMinutos(segundos) {
    var minutos = Math.floor(segundos / 60);
    var segundosRestantes = segundos % 60;
    return minutos + ":" + (segundosRestantes < 10 ? "0" : "") + segundosRestantes;
}

function obtenerEstadoTemporizador() {
    return localStorage.getItem('tiempoRestante');
}
