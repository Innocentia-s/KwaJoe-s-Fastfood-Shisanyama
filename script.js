// ===============================
// KWAJOE'S CART SYSTEM
// ===============================

// CART DATA
let cart = [];

// MENU ITEMS (must match your HTML items logically)
const menuItems = {
    "Full Chicken": 83,
    "Chicken Breast": 65,
    "5 Grilled Drumsticks": 130,
    "Fried Wings": 60,

    "Beef Stew": 70,
    "Beef Strips": 85,
    "Steak": 90,
    "Beef Combo 1": 110,
    "Beef Combo 2": 130,
    "Beef Combo 3": 120,

    "Side Chips": 25,
    "Amagwinya": 5,
    "Cheesy Fries": 50,
    "Chicken Wrap": 50,
    "10 Wings": 95,

    "Cold Drinks": 20,
    "Drink dumps": 45,

    "Burger and Fries / Wraps and Fries": 55,
    "Dunked wings, fries & rolls": 100,
    "Chicken Wraps,wings,fries & salad": 155,

    "Mocktails": 70,
    "Pineapple Mocktail": 70,
    "Jar Cocktails": 135,
    "Cocktails": 85
};
function showCategory(category) {
    const items = document.querySelectorAll(".item");

    items.forEach(item => {
        if (category === "all") {
            item.style.display = "flex";
        } else {
            item.style.display = item.dataset.category === category
                ? "flex"
                : "none";
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
    showCategory("all"); // 👈 THIS makes "All" the default

    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {
        const text = button.parentElement.querySelector("h4");

        if (text && button.innerText === "Add to Order") {
            button.addEventListener("click", () => {
                addToCart(text.innerText);
            });
        }
    });

    document.getElementById("place-order").addEventListener("click", placeOrder);
});
}

// ===============================
// ADD TO CART FUNCTION
// ===============================
function addToCart(itemName) {
    const price = menuItems[itemName];

    if (!price) {
        alert("Item not found!");
        return;
    }

    cart.push({ name: itemName, price: price });
    updateCartUI();

    showPopup(itemName + " added to cart 🛒");
}
// ===============================
// REMOVE ITEM FROM CART
// ===============================
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// ===============================
// UPDATE CART UI
// ===============================
function updateCartUI() {
    const orderList = document.getElementById("order-list");
    const totalDisplay = document.getElementById("total");

    orderList.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalItems++;
        totalPrice += item.price;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - R${item.price}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;

        orderList.appendChild(li);
    });

    totalDisplay.innerHTML = `Total Items: ${totalItems} | Total Price: R${totalPrice}`;
}

// ===============================
// PLACE ORDER
// ===============================
function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully! Please pay at KwaJoe's counter.");

    // clear cart after order
    cart = [];
    updateCartUI();
}

// ===============================
// CONNECT BUTTONS TO HTML
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {
        const text = button.parentElement.querySelector("h4");

        if (text && button.innerText === "Add to Order") {
            button.addEventListener("click", () => {
                addToCart(text.innerText);
            });
        }
    });

    // Place order button
    document.getElementById("place-order").addEventListener("click", placeOrder);
});
document.getElementById("cart-count").innerText = cart.length;
function showPopup(message) {
    const popup = document.getElementById("popup");
    popup.innerText = message;
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2000);
}