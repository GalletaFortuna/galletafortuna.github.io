<?php
// Obtener el input del usuario desde la solicitud POST
$inputUsuario = $_POST['inputUsuario'];

// Nombre del archivo que se creará
$nombreArchivo = 'archivo.txt';

// Abrir el archivo en modo de escritura y agregar el contenido
$file = fopen($nombreArchivo, 'a');
if ($file) {
  fwrite($file, $inputUsuario . PHP_EOL);
  fclose($file);
  echo '¡Gracias por tu input! Se ha guardado en el servidor.';
} else {
  echo 'Error al guardar el input en el servidor.';
}
?>
