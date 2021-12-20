
const ingresoProducto = document.getElementById("btnAgregar");
const actualizar = document.getElementById("btnActualizar");

ingresoProducto.addEventListener("click",nodos);

function nodos (){

    //const txtId = document.getElementById("txtId");
    const txtNombre = document.getElementById("txtNombre");
    const txtLote = document.getElementById("txtLote");
    const txtUnidadMedia = document.getElementById("txtUnidadMedida");
    const txtPrecio = document.getElementById("txtPrecio");

    //console.log(txtId.value,txtNombre.value,txtLote.value,txtUnidadMedia.value,txtPrecio.value);
    const data = {nombre:txtNombre.value,lote:txtLote.value,unidadMedida:txtUnidadMedia.value,precio:txtPrecio.value}
    const cuadro = {nombre:txtNombre,lote:txtLote,unidadMedida:txtUnidadMedia,precio:txtPrecio}
    
    
    alerta(data); //Alertara si hay espacio en blanco
    limpiar(cuadro);

}

function alerta(data){
    if(data.nombre ===""){return window.alert(`Nombre incompleto`);}
    if(data.lote ===""){return window.alert(`Lote incompleto`)};
    if(data.unidadMedida ===""){return window.alert(`Unidad de Medida incompleto`)};
    if(data.precio ===""){return window.alert(`Precio incompleto`)};
    post(data);
}



function limpiar(data){
    data.nombre.value = "";
    data.lote.value = "";
    data.unidadMedida.value = "";
    data.precio.value = "";
}


//Ingresar datos
function post(data){
    var datos = new FormData();

    datos.append('nombre',data.nombre);
    datos.append('lote',data.lote);
    datos.append('unidadMedida',data.unidadMedida);
    datos.append('precio',data.precio)

    $.ajax({
        type: "post",
        url: "tabla.php?accion=insertar",
        data: datos, //mandando datos a traves de la variable datos
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
        }
    });
}

//AJAX segunda solicitud (jqGET)
function refrescarDatosTabla(){
    //empty limpiara todo, actualizara
    $('#registros').empty();
    $.getJSON("tabla.php", function (registros) {
        var array=[];
        $.each(registros, function(key, producto){ 
            if (key>=0) {
                //Manipulacion del DOM
                var template="<tr>";
                template+= "<td>"+producto.id+    "</td>";
                template+= "<td>"+producto.nombre+"</td>";
                template+= "<td>"+producto.lote+"</td>";
                template+= "<td>"+producto.unidadMedida+"</td>";
                template+= "<td>"+producto.precio+"</td>";
                template+= "</tr>";
                array.push(template);
            }
        });
        $("#registros").append(array.join(""));
        console.log(registros);
    }
    );
}
refrescarDatosTabla();

/*function agregar (){
    fetch("tabla.php").then(res=>console.log(res))
    .then(respuesta=>console.log(respuesta))

    //creando tabla
    const tabla = document.getElementById("registros");

    //creando contenido
    const id = document.createElement("td");
    id.textContent = data.id;

    const nombre = document.createElement("td");
    nombre.textContent = data.nombre;
    
    const lote = document.createElement("td");
    lote.textContent = data.lote;

    const unidadMedida = document.createElement("td");
    unidadMedida.textContent = data.unidadMedida;

    const precio = document.createElement("td");
    precio.textContent = data.precio;
    
    //console.log(id,nombre,lote,unidadMedida,precio)

    //creando DOM
    const parte = document.createElement("tr");
    parte.append(id,nombre,lote,unidadMedida,precio);

    tabla.append(parte);

}*/