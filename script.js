// ===============================
// KWAJOE'S CART SYSTEM
// ===============================

// CART DATA (loaded from localStorage)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// MENU ITEMS
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

// ===============================
// SHOW CATEGORY FILTER
// ===============================
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

    // Check if item already in cart
    let existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
    }
    
    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    showPopup(itemName + " added to cart ✅");
}

// ===============================
// SHOW POPUP NOTIFICATION
// ===============================
function showPopup(message) {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.innerText = message;
        popup.classList.add("show");

        setTimeout(() => {
            popup.classList.remove("show");
        }, 2000);
    }
}

// ===============================
// CONNECT BUTTONS TO HTML
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    // Initialize category filter
    showCategory("all");

    // Add click listeners to all "Add to Order" buttons
    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {
        const text = button.parentElement.querySelector("h4");

        if (text && button.innerText === "Add to Order") {
            button.addEventListener("click", () => {
                addToCart(text.innerText);
            });
        }
    });
});