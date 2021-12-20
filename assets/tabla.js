
//Bottones
const ingresoProducto = document.getElementById("btnAgregar");
const editarProducto = document.getElementById("btnEditar");

//Eventos
ingresoProducto.addEventListener("click",agregar);
editarProducto.addEventListener("click",editar);


function agregar(){
    
    //Formulario
    const txtId = document.getElementById("txtId");
    const txtNombre = document.getElementById("txtNombre");
    const txtLote = document.getElementById("txtLote");
    const txtUnidadMedia = document.getElementById("txtUnidadMedida");
    const txtPrecio = document.getElementById("txtPrecio");

    //console.log(txtId.value,txtNombre.value,txtLote.value,txtUnidadMedia.value,txtPrecio.value);
    const data = {id:txtId.value,nombre:txtNombre.value,lote:txtLote.value,unidadMedida:txtUnidadMedia.value,precio:txtPrecio.value}
    const cuadro = {id:txtId,nombre:txtNombre,lote:txtLote,unidadMedida:txtUnidadMedia,precio:txtPrecio}
    
    //alerta
    if(data.nombre ===""){return window.alert(`Nombre incompleto`);}
    if(data.lote ===""){return window.alert(`Lote incompleto`)};
    if(data.unidadMedida ===""){return window.alert(`Unidad de Medida incompleto`)};
    if(data.precio ===""){return window.alert(`Precio incompleto`)};
    
    
    //post envio de datos

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


    refrescarDatosTabla();

    //limpiando

    cuadro.id.value ="";
    cuadro.nombre.value = "";
    cuadro.lote.value = "";
    cuadro.unidadMedida.value = "";
    cuadro.precio.value = "";

}


function editar(){

    //Formulario
    const txtId = document.getElementById("txtId");
    const txtNombre = document.getElementById("txtNombre");
    const txtLote = document.getElementById("txtLote");
    const txtUnidadMedia = document.getElementById("txtUnidadMedida");
    const txtPrecio = document.getElementById("txtPrecio");

    //encapsulando
    const data = {id:txtId,nombre:txtNombre.value,lote:txtLote.value,unidadMedida:txtUnidadMedia.value,precio:txtPrecio.value}

    
    //seleccionar  (esta en una funcion independiente)


    //alerta
    if(data.id.value ===""){return window.alert(`Id incompleto`);}
    if(data.nombre ===""){return window.alert(`Nombre incompleto`);}
    if(data.lote ===""){return window.alert(`Lote incompleto`)};
    if(data.unidadMedida ===""){return window.alert(`Unidad de Medida incompleto`)};
    if(data.precio ===""){return window.alert(`Precio incompleto`)};
    

    var datos = new FormData();
        
    datos.append('a',data.id.value);
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
            refrescarDatosTabla()
        }
    });
    
    //Limpiando    
    data.id.value = "";
    txtNombre.value=""
    txtLote.value="";
    txtUnidadMedia.value="";
    txtPrecio.value="";
}


function seleccionar(id){

    //console.log(id);
    const txtId = document.getElementById("txtId");
    const txtNombre = document.getElementById("txtNombre");
    const txtLote = document.getElementById("txtLote");
    const txtUnidadMedia = document.getElementById("txtUnidadMedida");
    const txtPrecio = document.getElementById("txtPrecio");

   // txtId.value=producto;

    $.getJSON("tabla.php?consultar="+id,function(registros){
        console.log(registros[0]["id"]);
        txtId.value=registros[0]["id"];
        txtNombre.value=registros[0]["nombre"];
        txtLote.value=registros[0]["lote"];
        txtUnidadMedia.value=registros[0]["unidadMedida"];
        txtPrecio.value=registros[0]["precio"];
    })
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
    console.log("limpiando")

    data.nombre.value = "";
    data.lote.value = "";
    data.unidadMedida.value = "";
    data.precio.value = "";

}


//Ingresar datos
function post(data){
    const nodo = nodos()

    console.log(nodo.nombre)

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





refrescarDatosTabla();
