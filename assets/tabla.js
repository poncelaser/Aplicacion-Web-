
//Bottones
const ingresoProducto = document.getElementById("btnAgregar");
const editarProducto = document.getElementById("btnEditar");
const limpiarProducto = document.getElementById("btnLimpiar");

//Eventos
ingresoProducto.addEventListener("click",agregar);
editarProducto.addEventListener("click",editar);
limpiarProducto.addEventListener("click",limpiar)


function agregar(){

    console.log("agregar")

    //Formulario
    const data = nodo();
   
    
    //alerta
    const mensaje = alerta(data) === "true"

    if(mensaje){

        //post envio de datos

        var datos = new FormData();

        datos.append('nombre',data.nombre.value);
        datos.append('lote',data.lote.value);
        datos.append('unidadMedida',data.unidadMedida.value);
        datos.append('precio',data.precio.value)

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

        //*refescar*

        refrescarDatosTabla();

        //limpiando

        limpiar(data)

    }else{

        console.log("mal")

    }
    
    
    

}


function editar(){

    //**Formulario**
    const data = nodo();
   
    
    //**seleccionar**  (esta en una funcion independiente)


    //**alerta**

    const mensaje = alerta(data) === "true"

    if(mensaje){
    
        if(data.id.value ===""){return window.alert(`Id incompleto`);}

        //*post editar de datos*

        var datos = new FormData();
        
        datos.append('a',data.id.value);
        datos.append('nombre',data.nombre.value);
        datos.append('lote',data.lote.value);
        datos.append('unidadMedida',data.unidadMedida.value);
        datos.append('precio',data.precio.value);

        //*AJAX*

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
        
        //*Limpiando*    

        limpiar(data)

        console.log("bien")
    
    }else{
    
        console.log("mal")
    
    }

    
}


function seleccionar(id){

    //*Formulario*

    const data = nodo();
   

   // txtId.value=producto;

    $.getJSON("tabla.php?consultar="+id,function(registros){
        console.log("seleccionar");
        data.id.value=registros[0]["id"];
        data.nombre.value=registros[0]["nombre"];
        data.lote.value=registros[0]["lote"];
        data.unidadMedida.value=registros[0]["unidadMedida"];
        data.precio.value=registros[0]["precio"];
    })
}

function nodo(){

     //*Formulario*

     const txtId = document.getElementById("txtId");
     const txtNombre = document.getElementById("txtNombre");
     const txtLote = document.getElementById("txtLote");
     const txtUnidadMedia = document.getElementById("txtUnidadMedida");
     const txtPrecio = document.getElementById("txtPrecio");
 
     //console.log(txtId.value,txtNombre.value,txtLote.value,txtUnidadMedia.value,txtPrecio.value);
     const data = {id:txtId.value,nombre:txtNombre.value,lote:txtLote.value,unidadMedida:txtUnidadMedia.value,precio:txtPrecio.value}
     const cuadro = {id:txtId, nombre:txtNombre, lote:txtLote, unidadMedida:txtUnidadMedia, precio:txtPrecio}
     return cuadro;
}


function alerta(data){

    //*alerta*

    if(data.nombre.value ===""){return window.alert(`1Nombre incompleto`);}
    if(data.lote.value ===""){return window.alert(`1Lote incompleto`)};
    if(data.unidadMedida.value ===""){return window.alert(`1Unidad de Medida incompleto`)};
    if(data.precio.value ===""){return window.alert(`1Precio incompleto`)};

    return "true";

}


function limpiar(data){

    //Formulario

    const txtId = document.getElementById("txtId");
    const txtNombre = document.getElementById("txtNombre");
    const txtLote = document.getElementById("txtLote");
    const txtUnidadMedia = document.getElementById("txtUnidadMedida");
    const txtPrecio = document.getElementById("txtPrecio");

    console.log("limpiando");

    //data.id.value="";
    txtId.value="";
    txtNombre.value="";
    txtLote.value="";
    txtUnidadMedia.value="";
    txtPrecio.value="";

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
                
                //'<input class="btn btn-danger" type="button" onclick="borrar('+producto.id+')" value="borrar"></input></td>'
            }
        });
        $("#registros").append(array.join(""));
        console.log(registros);
    }
    );

    

}

refrescarDatosTabla();
