// Load cart from localStorage (shared across pages)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Load cart display on page load
window.addEventListener('DOMContentLoaded', function() {
    loadCart();
});

function loadCart() {
    let list = document.getElementById("cartList");
    let emptyCart = document.getElementById("emptyCart");
    
    list.innerHTML = "";
    
    if (cart.length === 0) {
        emptyCart.style.display = "block";
        document.getElementById("subtotal").innerText = "0.00";
        document.getElementById("tipAmount").innerText = "0.00";
        document.getElementById("total").innerText = "0.00";
        return;
    }
    
    emptyCart.style.display = "none";
    
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        
        list.innerHTML += `
    <li>
        ${item.name} (R${item.price}) x ${item.quantity}
        <div>
            <button class="btn-success" onclick="increaseQuantity(${index})">+</button>
            <button class="btn-warning" onclick="decreaseQuantity(${index})">-</button>
            <button class="btn-danger" onclick="removeFromCart(${index})">Remove</button>
        </div>
    </li>`;
    });
    
    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    saveCartToStorage();
    updateTotal();
}

function increaseQuantity(index) {
    if (cart[index]) {
        cart[index].quantity++;
        saveCartToStorage();
        loadCart();
    }
}

function decreaseQuantity(index) {
    if (cart[index] && cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCartToStorage();
        loadCart();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToStorage();
    loadCart();
}

function saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateTotal() {
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    let tipPercent = document.getElementById("tip").value;
    document.getElementById("tipLabel").innerText = tipPercent + "%";
    
    let tipAmount = subtotal * (tipPercent / 100);
    let total = subtotal + tipAmount;
    
    document.getElementById("tipAmount").innerText = tipAmount.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);
}

function goToPayment() {
    if (cart.length === 0) {
        alert("❌ Cart is empty! Please go back to menu and add items.");
        return;
    }

    let address = document.getElementById("address").value.trim();
    let instructions = document.getElementById("instructions").value.trim();
    let isPickup = document.getElementById("pickup").checked;
    let pickupTime = document.getElementById("pickupTime").value;

    if (!isPickup && !address) {
        alert("⚠️ Please enter a delivery address or select pickup!");
        return;
    }

    if (isPickup && !pickupTime) {
        alert("⚠️ Please select a pickup time!");
        return;
    }

    // Calculate subtotal from cart
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    let tipPercent = document.getElementById("tip").value;
    let tipAmount = subtotal * (tipPercent / 100);
    let total = subtotal + tipAmount;

    let order = {
        cart: cart,
        address: address,
        instructions: instructions,
        isPickup: isPickup,
        pickupTime: pickupTime,
        subtotal: subtotal.toFixed(2),
        tipAmount: tipAmount.toFixed(2),
        total: total.toFixed(2)
    };

    // Save order data
    localStorage.setItem("order", JSON.stringify(order));
    console.log("Order saved to localStorage:", order);

    // Redirect to Payment page
    setTimeout(() => {
        window.location.href = "../Payment/index.html";
    }, 300);
}

function goBack() {
    if (confirm("Are you sure you want to clear your cart?")) {
        cart = [];
        localStorage.removeItem("cart");
        loadCart();
        alert("✅ Cart cleared!");
    }
}

function loadOrderHistory() {
    let historyContainer = document.getElementById("historyContainer");
    let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    
    if (orderHistory.length === 0) {
        historyContainer.innerHTML = '<p style="color: #ffeb3b; text-align: center;">No previous orders found.</p>';
        return;
    }
    
    historyContainer.innerHTML = "";
    
    // Display orders in reverse order (newest first)
    orderHistory.reverse().forEach((order, index) => {
        let itemsList = order.items.map(item => `${item.name} x${item.quantity}`).join(", ");
        let deliveryDetails = order.deliveryType === "Pickup" 
            ? `Pickup at ${order.pickupTime}` 
            : `Delivery to ${order.address}`;
        
        historyContainer.innerHTML += `
            <div class="history-item">
                <div class="history-header">
                    <span class="order-number">📋 ${order.orderNumber}</span>
                    <span class="order-total">Total: R${order.total}</span>
                </div>
                <div class="history-details">
                    <p><strong>Items:</strong> ${itemsList}</p>
                    <p><strong>Delivery:</strong> ${deliveryDetails}</p>
                    <p><strong>Date:</strong> ${order.date}</p>
                </div>
            </div>
        `;
    });
}

// Load history when page loads
window.addEventListener('DOMContentLoaded', function() {
    loadOrderHistory();
});
