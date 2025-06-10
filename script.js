// Function to set up event listeners
function setup() {
    document.getElementById("add-to-cart").addEventListener("click", addToCart);
    document.getElementById("clear-cart").addEventListener("click", clearCart);
    document.getElementById("checkout").addEventListener("click", checkout);
    }

// Initialize an empty cart
let cart = [];
const prices = {
    cage: 50,
    food: 10,
    bedding: 5
};

// Function to add items to the cart
function addToCart() {
    const quantity = parseInt(document.getElementById("quantity").value);
    const product = document.getElementById("product").value;
    if (quantity > 0 && product) {
        cart.push({ product, quantity });
        updateCart();
    } else {
        alert("Please enter a valid quantity and select a product.");
    }
}

// Function to clear the cart
function clearCart() {
    cart = [];
    updateCart();
}
      
// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    const subtotal = cart.reduce(function(sum, item) { return sum + prices[item.product] * item.quantity; }, 0);
    document.getElementById("order-summary").style.display = "block";
    document.getElementById("summary").textContent = "Your subtotal is $" + subtotal.toFixed(2) + ".";
    let tax = calcTax(subtotal);
    let shipping = calcShipping(subtotal);  
    let grand = calcGrandTotal(subtotal, tax, shipping);
    document.getElementById("tax").textContent = "Tax: $" + tax.toFixed(2);
    document.getElementById("shipping").textContent = "Shipping: $" + shipping.toFixed(2);
    document.getElementById("grand-total").textContent = "Grand Total: $" + grand.toFixed(2);
    document.getElementById("cart-items").innerHTML = "";
    cart = [];
    document.getElementById("total-price").textContent = "Total: $0.00";
    clearCart();
}

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let totalPrice = 0;
    cart.forEach(function(item) {
        const li = document.createElement("li");
        li.textContent = item.quantity + " x " + item.product + " - $" + (prices[item.product] * item.quantity).toFixed(2);
        cartItems.appendChild(li);
        totalPrice += prices[item.product] * item.quantity;
    });
    document.getElementById("total-price").textContent = "Total: $" + totalPrice.toFixed(2);
}

// Calculate UPS Shipping
function calcShipping(total) {
    if (total > 100) {
        return 0; // Free shipping for orders over $100
    }
    return 10; // Standard shipping fee
}

// Calculate Tax
function calcTax(total) {
    return total * 0.065;
}

// Calculate Grand Total

function calcGrandTotal(subtotal, tax, shipping) {
    return subtotal + tax + shipping;
}