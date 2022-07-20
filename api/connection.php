<?php
    function retornarConexion() {
        $con=mysqli_connect("localhost","root","","exam");
        return $con;
    }
?>