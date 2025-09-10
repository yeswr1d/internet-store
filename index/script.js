document.addEventListener('DOMContentLoaded', () => {
    // Select all elements needed
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartButton = document.getElementById('close-cart-button');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total-price');
    const cartItemCountElement = document.getElementById('cart-item-count');

    let cart = []; // Array to store cart items

    // Function to update the cart display
    function updateCart() {
        cartItemsList.innerHTML = ''; // Clear previous items
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name} (${item.quantity})</span>
                <span>${item.price * item.quantity} руб.</span>
            `;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = `${total} руб.`;
        cartItemCountElement.textContent = cart.length;
    }

    // Add item to cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            const productId = productCard.dataset.id;
            const productName = productCard.dataset.name;
            const productPrice = parseFloat(productCard.dataset.price);

            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            updateCart();
            cartSidebar.classList.add('visible');
        });
    });

    // Toggle cart visibility
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.toggle('visible');
    });

    closeCartButton.addEventListener('click', () => {
        cartSidebar.classList.remove('visible');
    });

    // Prevent closing when clicking inside the cart
    cartSidebar.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});
