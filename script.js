const imagenes = [
  "content/galleta-de-la-fortuna-2.png",
  "content/galleta-de-la-fortuna-3.png",
  "content/galleta-de-la-fortuna-3.png",
  "content/horno-animado.png",
];

const galleta = "content/galleta-de-la-fortuna.png";
const galleta_2 = "content/galleta-de-la-fortuna-2.png";
const galleta_3 = "content/galleta-de-la-fortuna-3.png";
const galleta_abierta = "content/galleta-de-la-fortuna-abierta.png";
const horno = "content/horno-animado.png";

const imgContainer = document.getElementById('imgContainer');
const videoContainer = document.getElementById('videoContainer');
const textContainer = document.getElementById('textContainer');
const timerContainer = document.getElementById('timerContainer');
const fortuneContainer = document.getElementById('fortuneContainer');
const blogContainer = document.getElementById('blogContainer');
const mensajeContainer = document.getElementById('mensajeEnviado');

const imgElement = document.getElementById("galleta-de-la-fortuna-animada");
const video = document.getElementById('galleta-de-la-fortuna-video');
const message = document.getElementById('message');
const timerElement = document.getElementById("timer");

const crujido = document.getElementById('crujido');
const epicidad = document.getElementById('musica-epica');
const body = document.body;
const cookieName = "imagenClickeableCookie";

function getRandomMessage() {
  return fetch('/frases')
    .then(response => response.json())
    .then(data => {
      const mensajes = data.mensajes;
      const randomIndex = Math.floor(Math.random() * mensajes.length);
      return mensajes[randomIndex];
    })
    .catch(error => {
      console.error('Error al obtener los mensajes:', error);
      return 'Error al obtener el mensaje';
    });
}

// Función para establecer la cookie con una duración de 24 horas
function setCookie() {
  const date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // Caduca en 24 horas
  const expires = "expires=" + date.toUTCString();
  document.cookie = cookieName + "=true;" + expires + ";SameSite=Strict;path=/";
}

let index = -1;

function cambiarImagen() {
  index = index + 1;
  const hasCookie = document.cookie.split(';').some((item) => item.trim().startsWith(cookieName + '='));
  const fortuner = document.cookie.split(';').some((item) => item.trim().startsWith('fortuner='));

  // Si tiene cookie, mostrar el horno
  if (hasCookie){
    index = 3
  }

  // Transicion de primer imagen a segunda
  if (index === 0){
    imgElement.src = galleta;
    textContainer.style.display = "none";
    fortuneContainer.style.display = "none";
    timerContainer.style.display = "none";
    imgContainer.style.display = "block";

    imgElement.classList.add('rotada')
      crujido.play();

      setTimeout(() => {
        imgElement.src = galleta_2;
        imgElement.classList.remove('rotada');
      }, 200);

  }
  // Transicion de segunda imagen a tercera
  else if (index == 1){
    imgElement.src = galleta_2;
    textContainer.style.display = "none";
    fortuneContainer.style.display = "none";
    timerContainer.style.display = "none";
    imgContainer.style.display = "block";

    imgElement.classList.add('rotada')
    crujido.play();

    setTimeout(() => {
      imgElement.src = galleta_3;
      imgElement.classList.remove('rotada');
    }, 200);

  }
  // Mostrar animacion de galleta abriendose + seteo de cookies
  else if (index === 2){

    imgContainer.style.display = "none";
    videoContainer.style.display = "block";

    video.autoplay = true;
    video.load();
    video.play();
    epicidad.play();
    imgElement.src = galleta_abierta;

    // Luego de que el video termine mostrar mensaje
    video.onended = function() {
      setCookie();
      iniciarTemporizador(86400);
      document.cookie = "fortuner=true;SameSite=Strict;path=/";

      videoContainer.style.display = "none";
      imgContainer.style.display = "block";

      getRandomMessage().then(mensaje => {
        message.innerText = mensaje;
        message.style.fontFamily = 'Anton';
        textContainer.style.display = 'flex';
      });
    };
  }
  // Esperar a que la galleta este lista y elegir la fortuna de otro
  else if (index === 3){
    imgElement.src = horno;
    epicidad.pause();
    epicidad.currentTime = 0;

    textContainer.style.display = "none";
    if (fortuner){
      fortuneContainer.style.display = "block";
    }else{
      fortuneContainer.style.display = "none";
    }
    timerContainer.style.display = "flex";
    imgContainer.style.display = "block";
    body.style.height = "auto";
    blogContainer.style.display = "block";
  }
}


// Cambiar imagenes al dar click a la galleta
imgElement.addEventListener("click", cambiarImagen);

// Codigo que se ejecuta al recargar la página (Es para no perder el timer)
window.addEventListener('load', function () {
  const tiempoGuardado = obtenerEstadoTemporizador();
  if (tiempoGuardado > 0) {
    iniciarTemporizador(tiempoGuardado);
    timerContainer.style.display = 'flex';
  }
});
