
const ingresoProducto = document.getElementById("btnAgregar");
const editarProducto = document.getElementById("btnEditar");

ingresoProducto.addEventListener("click",nodos);
editarProducto.addEventListener("click",editar);

    const txtId = document.getElementById("txtId");
    const txtNombre = document.getElementById("txtNombre");
    const txtLote = document.getElementById("txtLote");
    const txtUnidadMedia = document.getElementById("txtUnidadMedida");
    const txtPrecio = document.getElementById("txtPrecio");

function nodos (){

    //console.log(txtId.value,txtNombre.value,txtLote.value,txtUnidadMedia.value,txtPrecio.value);
    const data = {id:txtId,nombre:txtNombre.value,lote:txtLote.value,unidadMedida:txtUnidadMedia.value,precio:txtPrecio.value}
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
    refrescarDatosTabla();

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
                var template='<tr onclick="seleccionar('+producto.id+')" class="btn-light">';
                template+= "<td>"+producto.id+    "</td>";
                template+= "<td>"+producto.nombre+"</td>";
                template+= "<td>"+producto.lote+"</td>";
                template+= "<td>"+producto.unidadMedida+"</td>";
                template+= "<td>"+producto.precio+"</td>";
                template+= "</tr>";
                array.push(template);
                
                '<input class="btn btn-danger" type="button" onclick="borrar('+producto.id+')" value="borrar"></input></td>'
            }
        });
        $("#registros").append(array.join(""));
        console.log(registros);
    }
    );

    

}

function seleccionar(producto){

    console.log(producto);
    const txtId = document.getElementById("txtId");
    txtId.value=producto;
    
}

function editar(){
    const data = {id:txtId,nombre:txtNombre.value,lote:txtLote.value,unidadMedida:txtUnidadMedia.value,precio:txtPrecio.value}

    if(data.id.value ===""){return window.alert(`Id incompleto`);}

    const datos = new FormData();
        
    datos.append('id', data.id);
    datos.append('nombre',data.nombre);
    datos.append('lote',data.lote);
    datos.append('unidadMedida',data.unidadMedida);
    datos.append('precio',data.precio);

    //AJAX
    $.ajax({
        type: "post",
        url: "tabla.php?actualizar=1",
        data: datos, //mandando datos a traves de la variable datos
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
        }
    });
        
    data.id.value = "";

    data.nombre.value = "";
    data.lote.value = "";
    data.unidadMedida.value = "";
    data.precio.value = "";
}
refrescarDatosTabla();
