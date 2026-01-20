// Cart functionality
let cart = [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    if (!cartItems || !cartTotal) return;

    let total = 0;

    cartItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        total += product.price * item.quantity;
        return `
            <tr>
                <td>${product.name}</td>
                <td>₹${product.price}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </td>
                <td>₹${product.price * item.quantity}</td>
                <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Remove</button></td>
            </tr>
        `;
    }).join('');

    cartTotal.textContent = total;
}

function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    updateCartCount();
    updateCartModal();
    Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: 'Product added to cart successfully!',
        background: '#ffffff',
        confirmButtonColor: '#e91e63'
    });
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartModal();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartModal();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
        updateCartModal();
    }
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
}); 