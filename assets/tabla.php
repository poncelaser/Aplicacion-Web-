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

//Actualizar datos
if(isset($_GET["actualizar"])){


    $id=$_POST['id'];
    $nombre=$_POST['nombre'];
    $lote=$_POST['lote'];
    $unidadMedida=$_POST['unidadMedida'];
    $precio=$_POST['precio'];

    $sentenciaSQL=$conexion->prepare("UPDATE producto SET nombre=:nombre,lote=:lote,unidadMedida=:unidadMedida,precio=:precio WHERE id=:id");
    //prepare("UPDATE sistema SET nombre=:nombre,lote=:lote,unidadMedida=:unidadMedida,precio=:precio WHERE id=:id");
    $sentenciaSQL->bindParam(':nombre',$nombre);
    $sentenciaSQL->bindParam(':lote',$lote);
    $sentenciaSQL->bindParam(':unidadMedida',$unidadMedida);
    $sentenciaSQL->bindParam(':precio',$precio);
    $sentenciaSQL->bindParam(':id',$id);
    $sentenciaSQL->execute();

    echo json_encode(["success"=>1]);
    exit();
}

//Consultar datos
if(isset($_GET["consultar"])){

    $id=$_GET["consultar"];
    $sentenciaSQL= $conexion->prepare("SELECT * FROM producto WHERE id=".$id);
    $sentenciaSQL->execute();

    $listaMochilas=$sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($listaMochilas);
    exit();
}

//vista de los elementos ( sin function)
$sentenciaSQL=$conexion->prepare("SELECT * FROM producto");
$sentenciaSQL->execute();

$listaMochilas=$sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($listaMochilas);

?>
