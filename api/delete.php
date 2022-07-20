<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("connection.php");
  $con=retornarConexion();
  
  mysqli_query($con,"DELETE FROM empresa WHERE id=$_GET[id]");
    
  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Empresa eliminada';

  header('Content-Type: application/json');
  echo json_encode($response);  
?>