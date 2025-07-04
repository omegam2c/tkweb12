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


// Hàm kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');
    const usernameDisplay = document.getElementById('username-display');

    if (user) {
        // Nếu đã đăng nhập
        if (usernameDisplay) {
            usernameDisplay.textContent = user.fullname || user.name || user.email;
        }
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'block';
    } else {
        // Nếu chưa đăng nhập
        if (usernameDisplay) usernameDisplay.textContent = 'Tài khoản';
        if (loginLink) loginLink.style.display = 'block';
        if (registerLink) registerLink.style.display = 'block';
        if (logoutLink) logoutLink.style.display = 'none';
    }
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

        checkLoginStatus();

        window.location.href = "index.html";
    } else {
        alert("Email hoặc mật khẩu không đúng!");
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    updateAccountMenu();
    checkLoginStatus();
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
    checkLoginStatus();
});
