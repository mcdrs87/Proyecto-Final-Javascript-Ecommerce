const contenedor = document.getElementById("productos");
const tablaCarrito = document.getElementById("tablaCarrito");
let carrito = [];
const subtotal = document.getElementById("subtotal");
const btnFinalizar = document.getElementById("botonFinalizar");

//CREAR TARJETAS

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
                <button  onclick=agregarCarrito(${item.id}) id="botonAgregar${
    item.id
  }" class="btnAdd btn d-block mx-auto ${
    item.stock ? "btn-dark" : "btn-secondary"
  }" ${!item.stock ? "disabled" : ""} botonAgregar >Agregar </button></div>
                </div>
    `;
};
// MODAL
const getRow = (item) => {
  return `
    <tr>
        <th scope="row">${item.id}</th>
        <td>${item.familia}</td>
        <td>${item.tipo}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio * item.cantidad} ($${item.precio}/Unit)</td>
        <td><button class="bi bi-trash3" id="btnEliminar"></button></td>
    </tr>
        `;
};

//PINTAR TARJETAS EN EL HTML

const cargarProductos = (datos, nodo, esTabla) => {
  let acumulador = "";
  datos.forEach((el) => {
    acumulador += esTabla ? getRow(el) : getCard(el);
  });
  nodo.innerHTML = acumulador;
};
//AGREGAR PRODUCTOS AL CARRITO
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

// LOCAL STORAGE

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

//BOTON VACIAR CARRITO

const btnVaciarCarrito = document.getElementById("botonVaciar");

const vaciarCarrito = () => {
  localStorage.clear();
  carrito = [];
  cargarProductos(carrito, tablaCarrito, false);
};

btnVaciarCarrito.addEventListener("click", () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Estas a punto de vaciar el carrito!",
      text: "¿Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar carrito!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "Carrito Vacio!",
          "Sus productos fueron eliminados exitosamente.",
          "success"
        );
        vaciarCarrito();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          "Cancelado",
          "Sus productos no se han borrado :)",
          "error"
        );
      }
    });
});

//BOTON BORRAR PRODUCTO
const btnEliminar = document.getElementById("btnEliminar");

// SWEETT ALERT PRODUCTO AGREGADO
const botonAgregar = document.querySelectorAll(".btnAdd");
botonAgregar.forEach((item) => {
  item.addEventListener("click", () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Producto agregado!",
      showConfirmButton: false,
      timer: 1500,
    });
  });
});
