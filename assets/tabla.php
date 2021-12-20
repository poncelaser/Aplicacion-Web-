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
    $nombre=$_POST['nombre'];
    $lote=$_POST['lote'];
    $unidadMedida=$_POST['unidadMedida'];
    $precio=$_POST['precio'];

    $sentenciaSQL = $conexion->prepare("INSERT INTO producto (nombre,lote,unidadMedida,precio) VALUES (:nombre,:lote,:unidadMedida,:precio);");
    $sentenciaSQL->bindParam(':nombre',$nombre);
    $sentenciaSQL->bindParam(':lote',$lote);
    $sentenciaSQL->bindParam(':unidadMedida',$unidadMedida);
    $sentenciaSQL->bindParam(':precio',$precio);
    $sentenciaSQL->execute();
    exit();
}

//vista de los elementos ( sin function)
$sentenciaSQL=$conexion->prepare("SELECT * FROM producto");
$sentenciaSQL->execute();

$listaMochilas=$sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($listaMochilas);

?>
