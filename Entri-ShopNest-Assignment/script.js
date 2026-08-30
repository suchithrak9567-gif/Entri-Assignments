let products = [];
let cart = JSON.parse(localStorage.getItem("shopnestCart")) || [];

let selectedCategory = "All";
let searchText = "";

/* =========================
   DOM ELEMENTS
========================= */

const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const noProducts = document.getElementById("noProducts");

const cartSidebar = document.getElementById("cartSidebar");
const cartToggle = document.getElementById("cartToggle");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");


/* =========================
   LOAD PRODUCTS
========================= */

async function loadProducts() {
    try {
        const response = await fetch("products.json");

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        products = await response.json();

        renderProducts(products);
        renderCart();

    } catch (error) {
        console.error("Error loading products:", error);

        productsContainer.innerHTML = `
            <p style="text-align:center; grid-column:1/-1;">
                Failed to load products.
            </p>
        `;
    }
}


/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts(productList) {

    productsContainer.innerHTML = "";

    if (productList.length === 0) {
        noProducts.style.display = "block";
        return;
    }

    noProducts.style.display = "none";

    productList.forEach(product => {

        const productCard = document.createElement("div");

        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img
                src="${product.imageUrl}"
                alt="${product.name}"
                class="product-image"
            >

            <div class="product-info">

                <p class="category">${product.category}</p>

                <h3 class="product-name">${product.name}</h3>

                <p class="rating">
                    ⭐ ${product.rating}
                </p>

                <div>
                    <span class="price">₹${product.price}</span>

                    <span class="original-price">
                        ₹${product.originalPrice}
                    </span>
                </div>

                <button
                    class="add-cart-btn"
                    data-id="${product.id}"
                >
                    Add to Cart
                </button>

            </div>
        `;

        productsContainer.appendChild(productCard);
    });


    /* Add button events */

    document.querySelectorAll(".add-cart-btn").forEach(button => {

        button.addEventListener("click", () => {

            const productId = Number(button.dataset.id);

            addToCart(productId);

        });

    });
}


/* =========================
   FILTER PRODUCTS
========================= */

function filterProducts() {

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchText.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    renderProducts(filteredProducts);
}


/* =========================
   LIVE SEARCH
========================= */

searchInput.addEventListener("input", event => {

    searchText = event.target.value.trim();

    filterProducts();

});


/* =========================
   CATEGORY FILTER
========================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedCategory = button.dataset.category;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterProducts();

    });

});


/* =========================
   ADD TO CART
========================= */

function addToCart(productId) {

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        const product = products.find(
            product => product.id === productId
        );

        if (!product) return;

        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
}


/* =========================
   RENDER CART
========================= */

function renderCart() {

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty 🛒</h3>
                <p>Add some amazing products!</p>
            </div>
        `;

    } else {

        cart.forEach(item => {

            const cartItem = document.createElement("div");

            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img
                    src="${item.imageUrl}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p class="cart-item-price">
                        ₹${item.price}
                    </p>

                    <div class="quantity-controls">

                        <button
                            class="quantity-btn decrease-btn"
                            data-id="${item.id}"
                        >
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            class="quantity-btn increase-btn"
                            data-id="${item.id}"
                        >
                            +
                        </button>

                    </div>

                    <button
                        class="remove-btn"
                        data-id="${item.id}"
                    >
                        Remove
                    </button>

                </div>
            `;

            cartItemsContainer.appendChild(cartItem);

        });
    }

    updateCartSummary();
    addCartEventListeners();
}


/* =========================
   CART BUTTON EVENTS
========================= */

function addCartEventListeners() {

    document.querySelectorAll(".increase-btn").forEach(button => {

        button.addEventListener("click", () => {

            updateQuantity(
                Number(button.dataset.id),
                1
            );

        });

    });


    document.querySelectorAll(".decrease-btn").forEach(button => {

        button.addEventListener("click", () => {

            updateQuantity(
                Number(button.dataset.id),
                -1
            );

        });

    });


    document.querySelectorAll(".remove-btn").forEach(button => {

        button.addEventListener("click", () => {

            removeFromCart(
                Number(button.dataset.id)
            );

        });

    });

}


/* =========================
   UPDATE QUANTITY
========================= */

function updateQuantity(productId, change) {

    const item = cart.find(
        item => item.id === productId
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;
    }

    saveCart();
    renderCart();
}


/* =========================
   REMOVE FROM CART
========================= */

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();
    renderCart();
}


/* =========================
   UPDATE CART SUMMARY
========================= */

function updateCartSummary() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => {
            return total + item.price * item.quantity;
        },
        0
    );

    cartCount.textContent = totalItems;

    cartTotal.textContent =
        `₹${totalPrice.toLocaleString("en-IN")}`;
}


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "shopnestCart",
        JSON.stringify(cart)
    );

}


/* =========================
   OPEN CART
========================= */

cartToggle.addEventListener("click", () => {

    cartSidebar.classList.add("open");

    overlay.classList.add("show");

});


/* =========================
   CLOSE CART
========================= */

closeCart.addEventListener(
    "click",
    closeCartSidebar
);

overlay.addEventListener(
    "click",
    closeCartSidebar
);


function closeCartSidebar() {

    cartSidebar.classList.remove("open");

    overlay.classList.remove("show");

}


/* =========================
   INITIALIZE APPLICATION
========================= */

loadProducts();