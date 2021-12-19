
const ingresoProducto = document.getElementById("btnAgregar");

ingresoProducto.addEventListener("click",agregar);



function agregar (){
    //creando tabla
    const tabla = document.getElementById("registros");

    //creando contenido
    const id = document.createElement("td");
    id.textContent = "1";

    const nombre = document.createElement("td");
    nombre.textContent = "Chuleta de res";
    
    const lote = document.createElement("td");
    lote.textContent = "02122021";

    const unidadMedida = document.createElement("td");
    unidadMedida.textContent = "medida kilos ";

    const precio = document.createElement("td");
    precio.textContent = "25$";
    
    //console.log(id,nombre,lote,unidadMedida,precio)

    //creando DOM
    const parte = document.createElement("tr");
    parte.append(id,nombre,lote,unidadMedida,precio);

    tabla.append(parte);

    /*
    //const tabla = listo
    const container = document.createElement("tr");
    
    container.append(id,nombre,lote,unidadMedida,precio);
    array.push(container);
    
    container.createElement(array);

    tabla.appendChild(container);
    document.body.append(...array);*/
}
