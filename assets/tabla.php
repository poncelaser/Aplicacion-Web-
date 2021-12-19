<?php
$host="localhost";
$bd="axseniors";
$usuario="root";
$contraseña="";

try{
    $conexion=new PDO("mysql:host=$host;dbname=$bd",$usuario,$contraseña);
    //echo "bien..";
}catch (Exception $ex){
    echo $ex->getMesssage();
}

//Ingresar datos
if( isset($_GET['accion'])=="insertar" ){
    $nombre=$_POST["nombre"];
    $precio=$_POST['lote'];

    $sentenciaSQL = $conexion->prepare("INSERT INTO producto (id,nombre) VALUES (:nombre,:lote)");
    $sentenciaSQL->bindParam(':nombre',$nombre);
    $sentenciaSQL->bindParam(':lote',$precio);
    $sentenciaSQL->execute();
    exit();
}


//vista de los elementos ( sin function)
$sentenciaSQL=$conexion->prepare("SELECT * FROM producto");
$sentenciaSQL->execute();

$listaMochilas=$sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($listaMochilas);
?>