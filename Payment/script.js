let order = JSON.parse(localStorage.getItem("order"));

function loadReceipt() {
    try {
        if (!order || !order.cart || order.cart.length === 0) {
            console.error("Order data is missing or cart is empty");
            alert("⚠️ No order found! Redirecting to Order Placement...");
            setTimeout(() => {
                window.location.href = "../Order-Placement/index.html";
            }, 500);
            return;
        }

        let list = document.getElementById("receiptList");
        if (!list) {
            console.error("receiptList element not found");
            return;
        }

        list.innerHTML = ""; // Clear first
        order.cart.forEach(item => {
            list.innerHTML += `<li>${item.name} x ${item.quantity} = R${(item.price * item.quantity).toFixed(2)}</li>`;
        });

        document.getElementById("subtotal").innerText = parseFloat(order.subtotal).toFixed(2);
        document.getElementById("tipAmount").innerText = parseFloat(order.tipAmount).toFixed(2);
        document.getElementById("total").innerText = parseFloat(order.total).toFixed(2);

        // Display delivery/pickup info
        let deliveryInfo = document.getElementById("deliveryDetails");
        if (deliveryInfo) {
            if (order.isPickup) {
                deliveryInfo.innerHTML = `<strong>Pickup:</strong><br>Time: ${order.pickupTime}`;
            } else {
                deliveryInfo.innerHTML = `<strong>Delivery:</strong><br>Address: ${order.address}<br>Instructions: ${order.instructions || "None"}`;
            }
        }
        
        console.log("Receipt loaded successfully", order);
    } catch (error) {
        console.error("Error loading receipt:", error);
        alert("❌ Error loading order details. Please try again.");
    }
}

function toggleCard() {
    try {
        let method = document.querySelector('input[name="payment"]:checked').value;
        let cardDetails = document.getElementById("cardDetails");
        if (cardDetails) {
            cardDetails.style.display = method === "card" ? "block" : "none";
            console.log("Card details display toggled to:", method);
        }
    } catch (error) {
        console.error("Error toggling card details:", error);
    }
}

function validateCardNumber(number) {
    return /^\d{16}$/.test(number);
}

function validateExpiry(expiry) {
    return /^\d{2}\/\d{2}$/.test(expiry);
}

function validateCVV(cvv) {
    return /^\d{3}$/.test(cvv);
}

function confirmOrder() {
    try {
        let method = document.querySelector('input[name="payment"]:checked').value;
        console.log("Payment method selected:", method);

        if (method === "card") {
            let name = document.getElementById("cardName").value.trim();
            let number = document.getElementById("cardNumber").value.trim();
            let expiry = document.getElementById("expiry").value.trim();
            let cvv = document.getElementById("cvv").value.trim();

            if (!name) {
                alert("⚠️ Please enter the name on your card!");
                return;
            }

            if (!validateCardNumber(number)) {
                alert("⚠️ Please enter a valid 16-digit card number!");
                return;
            }

            if (!validateExpiry(expiry)) {
                alert("⚠️ Please enter expiry date in MM/YY format!");
                return;
            }

            if (!validateCVV(cvv)) {
                alert("⚠️ Please enter a valid 3-digit CVV!");
                return;
            }
        }

        // Generate unique order number
        const orderNumber = "KJ" + Date.now();
        
        // Save to order history
        let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
        orderHistory.push({
            orderNumber: orderNumber,
            items: order.cart,
            total: order.total,
            deliveryType: order.isPickup ? "Pickup" : "Delivery",
            pickupTime: order.pickupTime || "",
            address: order.address || "",
            date: new Date().toLocaleString()
        });
        localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
        
        // Clear localStorage and show success message
        localStorage.removeItem("order");
        alert("✅ Payment Successful! Your order has been placed.\n\n📋 Order Number: " + orderNumber + "\n\nThank you for ordering from KWA JOE'S FAST FOOD AND SHISANYAMA!");
        
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 500);
    } catch (error) {
        console.error("Error processing payment:", error);
        alert("❌ An error occurred. Please try again.");
    }
}

function goBack() {
    if (confirm("Are you sure you want to cancel this order?")) {
        try {
            localStorage.removeItem("order");
            console.log("Order cancelled");
            setTimeout(() => {
                window.location.href = "../Order-Placement/index.html";
            }, 300);
        } catch (error) {
            console.error("Error cancelling order:", error);
            window.location.href = "../Order-Placement/index.html";
        }
    }
}

// Load receipt when page loads
window.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Loading receipt");
    loadReceipt();
});

// Fallback for older browsers
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM Content Loaded Event - Loading receipt");
        loadReceipt();
    });
} else {
    console.log("Document already loaded - Loading receipt");
    loadReceipt();
}
