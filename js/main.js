const contenedor = document.getElementById("productos");
const tablaCarrito = document.getElementById("tablaCarrito");
const carrito = [];

const getCard = (item) => {
  return `
        <div class="card" style="width: 18rem;">
            <img src="${item.foto}" class="card-img-top" alt="${item.tipo}">
            <div class="card-body">
                <h5 class="card-title text-center">${item.familia} ${
    item.tipo
  }</h5>              
                <p class="card-text text-center">Cod: ${item.id}</p>
                <p class="card-text text-center">Stock: ${item.stock}</p>
                <p class="card-text text-center">$${item.precio}</p>
                <button  onclick=agregarCarrito(${item.id}) id=" botonAgregar${
    item.id
  } "class="btn d-block mx-auto ${item.stock ? "btn-dark" : "btn-secondary"}" ${
    !item.stock ? "disabled" : ""
  } >Agregar</button></div>
                
        </div>
    `;
};

const getRow = (item) => {
  return `
    <tr>
        <th scope="row">${item.id}</th>
        <td>${item.familia}</td>
        <td>${item.tipo}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio * item.cantidad} ($${item.precio}/Unit)</td>
        <td><img style="width:10px" src="${item.foto}" alt="imagen"></td>
    </tr>
        `;
};

const cargarProductos = (datos, nodo, esTabla) => {
  let acumulador = "";
  datos.forEach((el) => {
    acumulador += esTabla ? getRow(el) : getCard(el);
  });
  nodo.innerHTML = acumulador;
};

const agregarCarrito = (id) => {
  const seleccion = listadoProductos.find((item) => item.id === id);
  const busqueda = carrito.findIndex((el) => el.id === id);

  if (busqueda === -1) {
    carrito.push({
      id: seleccion.id,
      familia: seleccion.familia,
      tipo: seleccion.tipo,
      precio: seleccion.precio,
      cantidad: 1,
      delete: seleccion.foto,
    });
  } else {
    carrito[busqueda].cantidad = carrito[busqueda].cantidad + 1;
  }
  setCarrito();
  cargarProductos(carrito, tablaCarrito, true);
};

cargarProductos(listadoProductos, contenedor, false);

function setCarrito() {
  localStorage.setItem("carritoGuardado", JSON.stringify(carrito));
}
function getCarrito() {
  let arrayStorage = JSON.parse(localStorage.getItem("carritoGuardado"));
  if (arrayStorage) {
    for (el of arrayStorage) {
      agregarCarrito(el.id);
    }
  }
}
getCarrito();