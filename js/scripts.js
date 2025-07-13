const productos = [ 
    { 
        id: "01",
        imagen: "imagenes/cartuchos/battleToads.PNG",
        alt: "Foto de BattleToads",
        nombre: "BattleToads",
        precio: 10000,
        info: "paginas/battleToads.html"
    },
    { 
        id: "02",
        imagen: "imagenes/cartuchos/volverAlFuturo.PNG",
        alt: "Foto de Volver al Futuro",
        nombre: "Volver al Futuro",
        precio: 15000,
        info: "paginas/volverAlFuturo.html"
    },
    { 
        id: "03",
        imagen: "imagenes/cartuchos/mario3.PNG",
        alt: "Foto de Mario Bros 3",
        nombre: "Mario Bros 3",
        precio: 20000,
        info: "paginas/marioBros3.html"
    },
    { 
        id: "04",
        imagen: "imagenes/cartuchos/battleToadsVsDoubleDragon.PNG",
        alt: "Foto de BattleToads vs Double Dragon",
        nombre: "BattleToads vs DoubleDragon",
        precio: 15000,
        info: "paginas/battletoadsVsDdragon.html"
    },
    { 
        id: "05",
        imagen: "imagenes/cartuchos/doubleDragon.PNG",
        alt: "Foto de Double Dragon",
        nombre: "Double Dragon",
        precio: 20000,
        info: "paginas/doubleDragon.html"
    },
    { 
        id: "06",
        imagen: "imagenes/cartuchos/giJoe.PNG",
        alt: "Foto de GiJoe",
        nombre: "Gi Joe",
        precio: 25000,
        info: "paginas/giJoe.html"
    },
    { 
        id: "07",
        imagen: "imagenes/cartuchos/goal3.PNG",
        alt: "Foto de Goal 3",
        nombre: "Goal 3",
        precio: 30000,
        info: "paginas/goal3.html"
    },
    {
        id: "08",
        imagen: "imagenes/cartuchos/gunSmoke.PNG",
        alt: "Foto de Gun Smoke",
        nombre: "Gun Smoke",
        precio: 35000,
        info: "paginas/gunSmoke.html"
    },
    { 
        id: "09",
        imagen: "imagenes/cartuchos/kunio.PNG",
        alt: "Foto de Kunio Kun",
        nombre: "Kunio Kun",
        precio: 40000,
        info: "paginas/kunioKun.html"
    },
    { 
        id: "10",
        imagen: "imagenes/cartuchos/adventureIsland.png",
        alt: "Foto de Adventure Island",
        nombre: "Adventure Island",
        precio: 45000,
        info: "paginas/adventureIsland.html"
    },
];

let carrito = [];

function mostrarProductos() {
  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = '';
  productos.forEach(({ id, nombre, precio, imagen, alt, info }) => {
    const seccion = document.createElement('section');
    seccion.classList.add('producto');

    seccion.innerHTML = `
      <h2>${nombre}</h2>
      <a href="${info}" target="_blank">
        <img src="${imagen}" alt="${alt}" />
      </a>
      <p class="precio">$${precio}</p>
      <button onclick="agregar('${id}')">Agregar al carrito</button>
    `;
    
    contenedor.appendChild(seccion);
  });
}

function agregar(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const existente = carrito.find(item => item.id === id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById('listaCarrito');
  lista.innerHTML = '';
  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach(({ nombre, precio, cantidad }, index) => {
    total += precio * cantidad;
    cantidadTotal += cantidad;

    const div = document.createElement('div');
    div.classList.add('itemCarrito');
    div.innerHTML = `
  <div class="producto-linea">
    <span>${nombre} - $${precio} x ${cantidad}</span>
    <button onclick="modificarCantidad(${index}, 1)">+</button>
    <button onclick="modificarCantidad(${index}, -1)">–</button>
    <button onclick="eliminarItem(${index})">🗑️</button>
  </div>
`;
    lista.appendChild(div);
  });

  document.getElementById('infoTotal').textContent = `Total a pagar: $${total}`;
  document.getElementById('infoCantidad').textContent = `Productos en carrito: ${cantidadTotal}`;
}



function modificarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad < 1) {
    carrito.splice(index, 1);
  }
  actualizarCarrito();
}

function eliminarItem(index) {
  carrito.splice(index, 1); // Elimina el producto en esa posición
  actualizarCarrito();      // Refresca la vista
}


function finalizarCompra() {
  alert('¡Gracias por tu compra, GALLO! 🎮 Tus cartuchos ya están en camino.');
  carrito = [];
  actualizarCarrito();
}

document.addEventListener('DOMContentLoaded', mostrarProductos);

