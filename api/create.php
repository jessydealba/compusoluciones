<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("connection.php");
  $con=retornarConexion();
  

  mysqli_query($con,"INSERT INTO empresa(nombre, fecha, tipo, comentarios) values
                  ('$params->nombre','$params->fecha',$params->tipo,'$params->comentarios')");
    
  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Empresa guardada exitosamente';

  header('Content-Type: application/json');
  echo json_encode($response);  
?>