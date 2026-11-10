// Datos de los 6 Productos de Ejemplo
const productos = [
    {
        id: 1,
        nombre: "Auriculares Wireless",
        precio: 45,
        imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        descripcion: "Cancelación de ruido activa y hasta 30 horas de batería."
    },
    {
        id: 2,
        nombre: "Teclado Mecánico RGB",
        precio: 75,
        imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
        descripcion: "Switches red silenciosos e iluminación personalizable."
    },
    {
        id: 3,
        nombre: "Mouse Gamer Ergonómico",
        precio: 35,
        imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80",
        descripcion: "Sensor óptico de alta precisión con 16000 DPI."
    },
    {
        id: 4,
        nombre: "Monitor 4K 27 pulgadas",
        precio: 299,
        imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
        descripcion: "Panel IPS con excelente resolución y colores reales."
    },
    {
        id: 5,
        nombre: "Silla Gamer Pro",
        precio: 180,
        imagen: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&q=80",
        descripcion: "Soporte lumbar ajustable y reclinable hasta 180°."
    },
    {
        id: 6,
        nombre: "Webcam Full HD 1080p",
        precio: 50,
        imagen: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&q=80",
        descripcion: "Micrófono integrado estéreo ideal para streaming y llamadas."
    }
];

let carrito = [];

// Elementos del DOM
const productList = document.getElementById("product-list");
const cartToggle = document.getElementById("cart-toggle");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotalPrice = document.getElementById("cart-total-price");
const btnCheckout = document.getElementById("btn-checkout");

// Cargar Productos en la Grilla
function renderProducts() {
    productList.innerHTML = "";
    productos.forEach(prod => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <div class="card-body">
                <h3 class="card-title">${prod.nombre}</h3>
                <p class="card-desc">${prod.descripcion}</p>
                <div class="card-footer">
                    <span class="price">$${prod.precio}</span>
                    <button class="btn-add" onclick="agregarAlCarrito(${prod.id})">
                        <i class="fa-solid fa-cart-plus"></i> Agregar
                    </button>
                </div>
            </div>
        `;
        productList.appendChild(card);
    });
}

// Agregar al Carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const itemEnCarrito = carrito.find(item => item.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarritoUI();
}

// Eliminar del Carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarritoUI();
}

// Actualizar UI del Carrito
function actualizarCarritoUI() {
    // Contar total de productos
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cartCount.innerText = totalCantidad;

    // Renderizar lista en modal
    cartItemsContainer.innerHTML = "";
    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">El carrito está vacío</p>';
    } else {
        carrito.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "cart-item";
            itemDiv.innerHTML = `
                <div>
                    <div class="cart-item-title">${item.nombre} (x${item.cantidad})</div>
                    <div class="cart-item-price">$${item.precio * item.cantidad}</div>
                </div>
                <button class="btn-remove" onclick="eliminarDelCarrito(${item.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    }

    // Calcular Total
    const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    cartTotalPrice.innerText = `$${totalPrecio}`;
}

// Abrir / Cerrar Modal Carrito
cartToggle.addEventListener("click", () => cartModal.classList.add("active"));
closeCart.addEventListener("click", () => cartModal.classList.remove("active"));

// Finalizar Compra
btnCheckout.addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
    } else {
        alert("¡Gracias por tu compra de prueba para el taller!");
        carrito = [];
        actualizarCarritoUI();
        cartModal.classList.remove("active");
    }
});

// Inicializar
renderProducts();
