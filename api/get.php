<?php 
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require("connection.php");
    $con=retornarConexion();

    $registros=mysqli_query($con,"SELECT e.id, e.nombre, e.fecha, t.nombre AS tipo from empresa AS e INNER JOIN tipo_empresa AS t ON e.tipo = t.id");
    $vec=[];  
    while ($reg=mysqli_fetch_assoc($registros))  
    {
        $vec[]=$reg;
    }

    $cad=json_encode($vec);
    echo $cad;
    header('Content-Type: application/json');
?>