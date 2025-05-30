

   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartList = document.getElementById("cart-list");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");

    function updateTotals() {
      let subtotal = 0;
      cart.forEach(p => subtotal += p.price * p.quantity);
      subtotalEl.textContent = subtotal.toLocaleString() + "₫";
      totalEl.textContent = subtotal.toLocaleString() + "₫";
    }

    function renderCart() {
      cartList.innerHTML = "";
      cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
        <div class="item-main">
        <img src="${item.img}" alt="${item.name}" />
        <div class="item-info">
            <h3>${item.name}</h3>
            <p>Màu: ${item.color}</p>
            <p>Size: ${item.size}</p>
            <button class="remove-btn" data-index="${index}"><i class="fas fa-trash-alt"></i> Xoá</button>
        </div>
        </div>
        <div class="item-controls">
            <button class="qty-btn" data-action="dec" data-index="${index}">−</button>
            <input type="number" value="${item.quantity}" class="qty-input" readonly>
            <button class="qty-btn" data-action="inc" data-index="${index}">+</button>
            <span class="item-price">${item.price.toLocaleString()}₫</span>
        </div>
        `;
        cartList.appendChild(div);
      });
      updateTotals();
    }

    document.addEventListener("click", e => {
      if (e.target.classList.contains("qty-btn")) {
        const idx = +e.target.dataset.index;
        if (e.target.dataset.action === "inc") cart[idx].quantity++;
        else if (cart[idx].quantity > 1) cart[idx].quantity--;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
      }
      if (e.target.classList.contains("remove-btn")) {
        const idx = +e.target.dataset.index;
        cart.splice(idx, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
      }
    });

    renderCart();
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const el = document.querySelector(".cart-count");
        if (el) el.textContent = count;
    }  
    updateCartCount(); 
        // Gọi khi trang load
    document.addEventListener("DOMContentLoaded", updateCartCount);
