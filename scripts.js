// --- CONFIGURACIÓN DE WHATSAPP ---
// Reemplaza con tu número de teléfono real con código de país (ejemplo: 50212345678 para Guatemala)
const NUMERO_WHATSAPP = "50212345678"; 

// Base de datos de productos (Donas y Bebidas)
const productos = [
  {
    id: 1,
    nombre: "Dona simples dulce",
    categoria: "clasicas",
    precio: 5.00,
    descripcion: "disfruta de una dona simple dulce",
    imagen: "img/donas clasicas.jpg"
  },
  {
    id: 2,
    nombre: "Dona de Chocolate",
    categoria: "especiales",
    precio: 6.00,
    descripcion: "Cubierta con una capa de chocolate oscuro.",
    imagen: "img/donas con cholate.jpg"
  },
  {
    id: 3,
    nombre: "Dona con Anicillos",
    categoria: "especiales",
    precio: 5.00,
    descripcion: "Donas con Glaseado decorado con alegres chispas de colores.",
    imagen: "img/donas con anicillos.jpg"
  },
  {
    id: 4,
    nombre: "Dona Rellena de Manjar",
    categoria: "especiales",
    precio: 5.00,
    descripcion: "Rellena con un delicioso manjar.",
    imagen: "img/donas glaseadas.jpg"
  },
    {
    id: 5,
    nombre: "Dona con caramelo",
    categoria: "clasicas",
    precio: 6.00,
    descripcion: "Disfruta de una dona clasica cubierta con caramelo.",
    imagen: "img/doas con caramelo.jpg"
  },
  {
    id: 6,
    nombre: "Donas con azúcar",
    categoria: "clasicas",
    precio: 5.00,
    descripcion: "dona simple glaseada con azucar.",
    imagen: "img/donas con azucar.jpg"
  },
  {
    id: 7,
    nombre: "donas con azucar Glas",
    categoria: "especiales",
    precio: 8.00,
    descripcion: "disfruta de una dona dulce con azurcar glas",
    imagen: "img/donas con azucar glas.jpg"
  },
  {
    id: 8,
    nombre: "donas glaseadas",
    categoria: "clasicas",
    precio: 8.00,
    descripcion: "donas con glaseado simple.",
    imagen: "img/donas glaseadas.jpg"
  },
  {
    id: 9,
    nombre: "Café",
    categoria: "bebidas",
    precio: 5.00,
    descripcion: "Diisfruta junto a tus donas un cafe 100% guatemalteco artesanal.",
    imagen: "img/cafe.jpg"
  },
  {
    id: 10,
    nombre: "Jamaica",
    categoria: "bebidas",
    precio: 5.00,
    descripcion: "referescate con una bebida dulce.",
    imagen: "img/jamaica.jpg"
  },
  {
    id: 11,
    nombre: "Té",
    categoria: "bebidas",
    precio: 5.00,
    descripcion: "¿Prefieres algo más relajante? Tambien te ofrecemos té.",
    imagen: "img/te.jpg"
  }
];

let carrito = [];
let productoSeleccionadoActual = null;

// Referencias al DOM
const productsList = document.getElementById("products-list");
const cartCount = document.getElementById("cart-count");
const cartTotalPrice = document.getElementById("cart-total-price");
const navButtons = document.querySelectorAll(".nav-btn");

// Modales
const productModal = document.getElementById("product-modal");
const cartModal = document.getElementById("cart-modal");

// Renderizar Productos
function cargarProductos(categoria = "todas") {
  productsList.innerHTML = "";
  
  const productosFiltrados = categoria === "todas" 
    ? productos 
    : productos.filter(p => p.categoria === categoria);

  productosFiltrados.forEach(prod => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" onclick="abrirModalProducto(${prod.id})">
      <div class="product-info">
        <h3 class="product-title">${prod.nombre}</h3>
        <p class="product-desc">${prod.descripcion}</p>
        <div class="product-bottom">
          <span class="product-price">Q${prod.precio.toFixed(2)}</span>
          <div class="btn-actions">
            <button class="btn-secondary" onclick="abrirModalProducto(${prod.id})"><i class="fa-solid fa-eye"></i></button>
            <button class="btn-primary" onclick="agregarAlCarrito(${prod.id})"><i class="fa-solid fa-plus"></i> Agregar</button>
          </div>
        </div>
      </div>
    `;
    productsList.appendChild(card);
  });
}

// Filtrar por Categoría
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.getAttribute("data-category");
    cargarProductos(cat);
  });
});

// Agregar al Carrito
function agregarAlCarrito(id) {
  const prod = productos.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...prod, cantidad: 1 });
  }

  actualizarCarrito();
}

// Actualizar Resumen del Carrito
function actualizarCarrito() {
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  cartCount.textContent = `${totalItems} producto(s)`;
  cartTotalPrice.textContent = totalPrecio.toFixed(2);
  document.getElementById("cart-modal-total").textContent = totalPrecio.toFixed(2);
}

// Abrir Modal de Producto
function abrirModalProducto(id) {
  const prod = productos.find(p => p.id === id);
  productoSeleccionadoActual = prod;

  document.getElementById("modal-img").src = prod.imagen;
  document.getElementById("modal-title").textContent = prod.nombre;
  document.getElementById("modal-category").textContent = prod.categoria.toUpperCase();
  document.getElementById("modal-description").textContent = prod.descripcion;
  document.getElementById("modal-price").textContent = prod.precio.toFixed(2);

  productModal.style.display = "flex";
}

// Abrir Modal de Carrito
document.getElementById("view-cart-btn").addEventListener("click", () => {
  const container = document.getElementById("cart-items-container");
  container.innerHTML = "";

  if (carrito.length === 0) {
    container.innerHTML = "<p>Tu carrito está vacío.</p>";
  } else {
    carrito.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <div>
          <strong>${item.nombre}</strong><br>
          <small>Q${item.precio.toFixed(2)} x ${item.cantidad}</small>
        </div>
        <strong>Q${(item.precio * item.cantidad).toFixed(2)}</strong>
      `;
      container.appendChild(itemDiv);
    });
  }

  cartModal.style.display = "flex";
});

// Evento para agregar desde el modal
document.getElementById("modal-add-btn").addEventListener("click", () => {
  if (productoSeleccionadoActual) {
    agregarAlCarrito(productoSeleccionadoActual.id);
    productModal.style.display = "none";
  }
});

// Cerrar Modales
document.getElementById("close-product-modal").onclick = () => productModal.style.display = "none";
document.getElementById("close-cart-modal").onclick = () => cartModal.style.display = "none";

window.onclick = (event) => {
  if (event.target === productModal) productModal.style.display = "none";
  if (event.target === cartModal) cartModal.style.display = "none";
};

// Enviar Pedido a WhatsApp
document.getElementById("whatsapp-btn").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Agrega al menos un producto a tu carrito antes de pedir.");
    return;
  }

  let mensaje = "¡Hola! Quisiera realizar el siguiente pedido de donas:\n\n";
  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    mensaje += `• ${item.nombre} (x${item.cantidad}) - Q${subtotal.toFixed(2)}\n`;
    total += subtotal;
  });

  mensaje += `\n*Total a pagar:* Q${total.toFixed(2)}`;

  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
});

// Cargar la lista inicial de productos al abrir la página
cargarProductos();