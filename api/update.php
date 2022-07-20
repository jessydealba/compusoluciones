<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("connection.php");
  $con=retornarConexion();
  

  mysqli_query($con,"UPDATE empresa SET nombre='$params->nombre', fecha='$params->fecha', tipo=$params->tipo, comentarios='$params->comentarios' WHERE id=$_GET[id]");
    
  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Empresa actualizada exitosamente';

  header('Content-Type: application/json');
  echo json_encode($response);  
?>