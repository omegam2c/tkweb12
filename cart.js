function addToCart(productId) {
    const products = [
        { id: 1, name: "Áo sơ mi Vintage", price: 350000 },
        { id: 2, name: "Áo khoác Vintage", price: 650000 },
        { id: 3, name: "Quần jeans Vintage", price: 450000 },
        { id: 4, name: "Áo hoodie Streetwear", price: 500000 },
        { id: 5, name: "Quần jogger Streetwear", price: 400000 },
        { id: 6, name: "Áo thun Casual", price: 250000 },
        { id: 7, name: "Quần short Casual", price: 300000 },
        { id: 8, name: "Áo sơ mi công sở", price: 400000 },
        { id: 9, name: "Quần tây", price: 450000 },
        { id: 10, name: "Áo thể thao", price: 350000 },
        { id: 11, name: "Quần thể thao", price: 300000 },
        { id: 12, name: "Áo thun tối giản", price: 200000 },
        { id: 13, name: "Quần ống suông", price: 350000 },
    ];

    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
}

function displayCart() {
    const cartList = document.getElementById("cart-list");
    if (!cartList) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = "<p>Giỏ hàng trống!</p>";
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>${(item.price * item.quantity).toLocaleString()} VNĐ</span>
        `;
        cartList.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDiv = document.createElement("div");
    totalDiv.className = "cart-item";
    totalDiv.innerHTML = `
        <span><strong>Tổng cộng</strong></span>
        <span><strong>${total.toLocaleString()} VNĐ</strong></span>
    `;
    cartList.appendChild(totalDiv);
}

document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});