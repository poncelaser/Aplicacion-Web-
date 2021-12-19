<?php
$host="localhost";
$bd="axseniors";
$usuario="root";
$contraseña="";

try{
    $conexion=new PDO("mysql:host=$host;dbname=$bd",$usuario,$contraseña);
    echo "bien..";
}catch (Exception $ex){
    echo $ex->getMesssage();

}

//Ingresar datos
if( isset($_GET['accion'])=="insertar" ){
    $nombre=$_POST['nombre'];
    $precio=$_POST['precio'];

    $sentenciaSQL = $conexion->prepare("INSERT INTO sistema (nombre,precio) VALUES (nombre,precio);");
    $sentenciaSQL->bindParam('nombre',$nombre);
    $sentenciaSQL->bindParam('precio',$precio);
    $sentenciaSQL->execute();
    exit();
}

?>
