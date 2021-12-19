
const ingresoProducto = document.getElementById("btnAgregar");

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
    post(data);

}

function alerta(data){
    if(data.nombre ===""){return window.alert(`Nombre incompleto`);}
    if(data.lote ===""){return window.alert(`Lote incompleto`)};
    if(data.unidadMedida ===""){return window.alert(`Unidad de Medida incompleto`)};
    if(data.precio ===""){return window.alert(`Precio incompleto`)};
    agregar(data);
}

function agregar (data){
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

}

function limpiar(data){
    data.nombre.value = "";
    data.lote.value = "";
    data.unidadMedida.value = "";
    data.precio.value = "";
}


function post(cuadro){
    var datos = new FormData();
        
    datos.append('nombre', cuadro.nombre);
    datos.append('lote',cuadro.lote);


    let formulario = new FormData(document.getElementById("formulario"));
    fetch("tabla.php?accion=insertar",{
        method:"POST",
        body:datos,
    })
    .then((e)=>e.json())
    .then(data=>console.log(data));

}

