// Hàm để đăng ký người dùng
function registerUser (event) {
    event.preventDefault();
    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.email === email)) {
        alert("Email đã được đăng ký!");
        return;
    }

    users.push({ name: fullName, email: email, password: password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    window.location.href = "login.html";
}

// Hàm để đăng nhập người dùng
function loginUser (event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("currentUser ", JSON.stringify(user));
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
    } else {
        alert("Email hoặc mật khẩu không đúng!");
    }
}

// Hàm để đăng xuất
function logout() {
    localStorage.removeItem("currentUser ");
    alert("Đăng xuất thành công!");
    window.location.href = "index.html";
}

// Gắn sự kiện cho form đăng ký
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", registerUser );
    }

    // Gắn sự kiện cho form đăng nhập
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", loginUser );
    }
});
