function enviarInput() {
  const inputUsuario = document.getElementById('fortuneText').value;


  document.cookie = "fortuner=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  fortuneContainer.style.display = "none";
  mensajeContainer.style.display = "block";
  setTimeout(function() {
    mensajeContainer.style.display = "none";
}, 5000);

  fetch('guardar-input.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'inputUsuario=' + encodeURIComponent(inputUsuario)
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error al enviar el input:', error);
  });
}
