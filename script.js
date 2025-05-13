const products = [
    { id: 1, name: "Áo sơ mi Vintage", price: 350000, image: "img/vintage-shirt.jpg", style: "Vintage" },
    { id: 2, name: "Áo khoác Vintage", price: 650000, image: "img/vintage-jacket.jpg", style: "Vintage" },
    { id: 3, name: "Quần jeans Vintage", price: 450000, image: "img/vintage-jeans.jpg", style: "Vintage" },
    { id: 4, name: "Áo hoodie Streetwear", price: 500000, image: "img/hoodie.jpg", style: "Streetwear" },
    { id: 5, name: "Quần jogger Streetwear", price: 400000, image: "img/jogger.jpg", style: "Streetwear" },
    { id: 6, name: "Áo thun Casual", price: 250000, image: "img/t-shirt.jpg", style: "Casual" },
    { id: 7, name: "Quần short Casual", price: 300000, image: "img/short.jpg", style: "Casual" },
    { id: 8, name: "Áo sơ mi công sở", price: 400000, image: "img/business-shirt.jpg", style: "Business" },
    { id: 9, name: "Quần tây", price: 450000, image: "img/business-pants.jpg", style: "Business" },
    { id: 10, name: "Áo thể thao", price: 350000, image: "img/sporty-shirt.jpg", style: "Sporty" },
    { id: 11, name: "Quần thể thao", price: 300000, image: "img/sporty-pants.jpg", style: "Sporty" },
    { id: 12, name: "Áo thun tối giản", price: 200000, image: "img/minimalist-shirt.jpg", style: "Minimalist" },
    { id: 13, name: "Quần ống suông", price: 350000, image: "img/minimalist-pants.jpg", style: "Minimalist" },
];

function loadProducts(style = null) {
    const productList = document.getElementById("product-list");
    if (!productList) return;

    productList.innerHTML = "";
    const filteredProducts = style ? products.filter(p => p.style === style) : products;

    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product-item";
        productDiv.id = `product-${product.id}`;
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString()} VNĐ</p>
            <button class="btn" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
        `;
        productList.appendChild(productDiv);
    });
}

function searchProducts() {
    const searchInput = document.querySelector(".search-bar");
    const searchDropdown = document.createElement("ul");
    searchDropdown.className = "search-dropdown";
    searchInput.parentElement.appendChild(searchDropdown);

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        searchDropdown.innerHTML = "";
        searchDropdown.classList.remove("active");

        if (query) {
            const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query)).slice(0, 5);
            if (filteredProducts.length > 0) {
                filteredProducts.forEach(product => {
                    const li = document.createElement("li");
                    li.textContent = product.name;
                    li.dataset.productId = product.id;
                    li.dataset.style = product.style;
                    li.addEventListener("click", () => {
                        const productElement = document.getElementById(`product-${product.id}`);
                        if (productElement) {
                            productElement.scrollIntoView({ behavior: "smooth", block: "center" });
                            searchDropdown.classList.remove("active");
                            searchInput.value = "";
                        } else {
                            const stylePage = product.style.toLowerCase() + ".html";
                            window.location.href = stylePage + `#product-${product.id}`;
                        }
                    });
                    searchDropdown.appendChild(li);
                });
                searchDropdown.classList.add("active");
            }
        }
    });

    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.classList.remove("active");
        }
    });
}

function updateAccountMenu() {
    const accountMenu = document.querySelector(".account-menu");
    if (!accountMenu) return;

    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
        accountMenu.innerHTML = `
            <a href="#">${user.name}</a>
            <ul class="account-dropdown">
                <li><a href="#" onclick="logout()">Đăng xuất</a></li>
            </ul>
        `;
    } else {
        accountMenu.innerHTML = `
            <a href="#">Tài khoản</a>
            <ul class="account-dropdown">
                <li><a href="login.html">Đăng nhập</a></li>
                <li><a href="register.html">Đăng ký</a></li>
            </ul>
        `;
    }
}

function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.email === email)) {
        alert("Email đã được đăng ký!");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    window.location.href = "login.html";
}

function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
    } else {
        alert("Email hoặc mật khẩu không đúng!");
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    updateAccountMenu();
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const style = document.body.dataset.style || null;
    loadProducts(style);
    searchProducts();
    updateAccountMenu();

    // Cuộn đến sản phẩm nếu có hash trong URL
    if (window.location.hash) {
        const productId = window.location.hash.replace("#product-", "");
        const productElement = document.getElementById(`product-${productId}`);
        if (productElement) {
            productElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    // Gắn sự kiện cho form đăng ký
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", registerUser);
    }

    // Gắn sự kiện cho form đăng nhập
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", loginUser);
    }
});