// Function to set up event listeners
function setup() {
    document.getElementById("add-to-cart").addEventListener("click", addToCart);
    document.getElementById("clear-cart").addEventListener("click", clearCart);
    document.getElementById("checkout").addEventListener("click", checkout);
    }

// Initialize an empty cart
let cart = [];
const prices = {
    cage: 41.32,
    food: 15.19,
    bedding: 11.69
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
    cart = extractFrom(cart);
    let dimWeights = calcDimWeights(cart);
    let shipping = calcShipping(dimWeights);  
    console.log("Grand Total = "+subtotal +" + "+ tax +" + "+shipping);
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

// Function to extract values array from cart (key:value pairs)
function extractFrom(cart){
    let values = [];
    let nextval = [];
    cart.forEach(item => {
        nextval.push(`${item.product}`);
        nextval.push(`${item.quantity}`);
        values.push(nextval);
    });
    console.log(values.toString());
    return values;
}

/* calcDimWeights(cart): Go through each item in the cart and calculate dimWeights. 
 * Loop for each, calculate the dimensional weight from user inputs. 
 * Within the loop, ask the user whether they have dimensions (length, width, height) or volume (liters or gallons)
 * Gallons are 3.7854 liters. One litre is 61.0237 cubic inches. 
 * For each value in Cubic inches, divide by 139 to get the dimensional weight (dimWeight).
 * Ask the user whether they have ounces or pounds for weight.  Convert ounces to pounds (16:1)
 * Compare dimWeight and weight. Whichever one is larger, push that to the dimWeights array and return that. 
 * @param: cart
 * @return: dimWeights array
 */
function calcDimWeights(cart){
    console.log("Cart at 80: " + cart.toString());
    let dimWeights = [];
    let dimWeight = 0;
    let volume = 0;
    let weight = 0;
    let quantity = 1;
    for (let item = 0; item < cart.length; item ++){
        weight = parseFloat(prompt("Weight of item  " + (item + 1) + " in pounds"));
        console.log("Weight of " + cart[item][0] + " given as " + weight);
        volume = parseFloat(prompt("Volume of item  " + (item + 1) + " in cubic inches"));
        console.log("Volume of " + cart[item][0] + " given as " + volume);
        dimWeight =  volume/139;
        quantity = cart[item][1];
        if (dimWeight > weight) {
            dimWeights.push(dimWeight*quantity);
        }
        else {
            dimWeights.push(weight*quantity);
        }
    }
    console.log(dimWeights.toString());
    return dimWeights;
}

/* calcShipping(cart, dimWeights): Go through each item in the cart and calculate shipping from dimWeights. Total that up.  
 * We will be shipping within Zone 1, Advantage, via USPS so rate is $1.60 per DimWeight.  
 * So: Loop over each dimWeight, multiply by $1.60 and add that to total shipping. 
 * @param: dimWeights array
 * @return: totalShipping
 */
function calcShipping(dimWeights) {
    console.log("Cart at 115: " + cart.toString());
    let totalShipping = 0;
    for (let item = 0; item < dimWeights.length; item ++){
        totalShipping+=dimWeights[item]*.80;
    }
    return totalShipping;
}

// Calculate Tax
function calcTax(subtotal) {
    return subtotal * 0.065; // MA state tax rate
}

// Calculate Grand Total
function calcGrandTotal(subtotal, tax, shipping) {
    return subtotal + tax + shipping;
}
