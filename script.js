// Estado Global del Carrito
let cart = [];

// Elementos del DOM
const productsContainer = document.getElementById('products-container');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeModalBtn = document.getElementById('close-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total-price');
const cartCountElement = document.getElementById('cart-count');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const contactForm = document.getElementById('contact-form');

// Datos de productos para "mapear" la API genérica a nuestro tema de fútbol
const footballThemeMap = [
    { title: "Camiseta Titular Selección 2024", image: "assets/imagenes/camiseta-seleccion.jpg", category: "Camisetas" },
    { title: "Botines de Fútbol Pro-X", image: "assets/imagenes/botines.jpg", category: "Botines" },
    { title: "Pelota Oficial de la Liga", image: "assets/imagenes/pelota.jpg", category: "Pelotas" },
    { title: "Camiseta Alternativa Club United", image: "assets/imagenes/camiseta-man-united.jpg", category: "Camisetas" },
    { title: "Guantes de Arquero Elite", image: "assets/imagenes/guantes.jpeg", category: "Accesorios" },
];

// --- 1. Inicialización y Fetch API ---

document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    fetchProducts();
    updateCartUI();
});

async function fetchProducts() {
    try {
        // Consumimos una API pública para cumplir con el requisito de Fetch
        // Usamos fakestoreapi para obtener items, pero modificaremos los datos
        // para que coincidan con la temática de fútbol de la tienda.
        const response = await fetch('https://fakestoreapi.com/products?limit=6');
        
        if (!response.ok) {
            throw new Error('Error al cargar productos');
        }

        const data = await response.json();
        
        // Transformamos los datos de la API para usar nuestros textos e imágenes de fútbol
        const footballProducts = data.map((item, index) => {
            const theme = footballThemeMap[index] || footballThemeMap[0];
            return {
                id: item.id,
                title: theme.title,
                price: item.price, // Usamos el precio de la API
                image: theme.image,
                category: theme.category,
                description: item.description // Mantenemos la descripción o podríamos cambiarla
            };
        });

        renderProducts(footballProducts);

    } catch (error) {
        console.error('Fetch Error:', error);
        productsContainer.innerHTML = '<p class="error-msg">Lo sentimos, hubo un error al cargar los productos. Por favor intenta más tarde.</p>';
    }
}

// --- 2. Renderizado del DOM ---

function renderProducts(products) {
    productsContainer.innerHTML = ''; // Limpiar loading

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="card-content">
                <h3>${product.title}</h3>
                <p class="category">${product.category}</p>
                <div class="card-footer">
                    <span class="price">$${product.price}</span>
                    <button class="btn btn-secondary add-to-cart-btn" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        `;
        productsContainer.appendChild(card);
    });

    // Agregar Listeners a los botones dinámicos
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// --- 3. Lógica del Carrito ---

function addToCart(e) {
    const btn = e.target;
    const product = {
        id: btn.dataset.id,
        title: btn.dataset.title,
        price: parseFloat(btn.dataset.price),
        image: btn.dataset.image,
        quantity: 1
    };

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(product);
    }

    saveCartToStorage();
    updateCartUI();
    
    // Feedback visual simple
    const originalText = btn.innerText;
    btn.innerText = "¡Añadido!";
    btn.classList.replace('btn-secondary', 'btn-primary');
    setTimeout(() => {
        btn.innerText = originalText;
        btn.classList.replace('btn-primary', 'btn-secondary');
    }, 1000);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCartToStorage();
    updateCartUI();
    renderCartItems(); // Re-renderizar modal si está abierto
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCartToStorage();
            updateCartUI();
            renderCartItems();
        }
    }
}

function clearCart() {
    cart = [];
    saveCartToStorage();
    updateCartUI();
    renderCartItems();
}

function updateCartUI() {
    // Actualizar contador
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.innerText = totalCount;
    
    // Calcular total
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotalElement.innerText = totalPrice.toFixed(2);
}

function renderCartItems() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center;">Tu carrito está vacío.</p>';
        return;
    }

    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price}</div>
            </div>
            <div class="cart-controls">
                <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                <button class="btn btn-danger" onclick="removeFromCart('${item.id}')">X</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });
}

// Persistencia (LocalStorage)
function saveCartToStorage() {
    localStorage.setItem('futbolCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('futbolCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// --- 4. Modal Interactions ---

cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    renderCartItems();
    cartModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
    cartModal.classList.add('hidden');
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.add('hidden');
    }
});

clearCartBtn.addEventListener('click', clearCart);

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    alert("¡Gracias por tu compra! Procesando pedido...");
    clearCart();
    cartModal.classList.add('hidden');
});

// Exponer funciones globales para los botones on-click generados dinámicamente
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

// --- 5. Validación de Formulario ---

contactForm.addEventListener('submit', (e) => {
    let isValid = true;
    
    // Reset errores
    document.querySelectorAll('.error-msg').forEach(el => el.innerText = '');
    document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));

    // Validar Nombre
    const nameInput = document.getElementById('name');
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'El nombre es obligatorio.');
        isValid = false;
    }

    // Validar Email
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Ingresa un correo válido.');
        isValid = false;
    }

    // Validar Mensaje
    const messageInput = document.getElementById('message');
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'El mensaje debe tener al menos 10 caracteres.');
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault(); // Detener envío si hay errores
    }
});

function showError(input, message) {
    input.classList.add('error');
    const errorSpan = document.getElementById(`${input.id}-error`);
    if (errorSpan) {
        errorSpan.innerText = message;
    }
}