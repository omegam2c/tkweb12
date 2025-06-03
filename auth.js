// Hàm kiểm tra email đã tồn tại
function isEmailExist(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.email === email);
}

function registerUser(event) {
    event.preventDefault();
    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    // Lấy các phần tử hiển thị lỗi
    const fullNameError = document.getElementById("full-name-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById("confirm-password-error");

    // Reset tất cả thông báo lỗi
    fullNameError.style.display = 'none';
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    confirmPasswordError.style.display = 'none';

    let isValid = true;

    // Kiểm tra họ tên (ít nhất 2 từ, mỗi từ ít nhất 2 ký tự)
    if (!fullName || fullName.split(/\s+/).filter(s => s.length >= 2).length < 2) {
        fullNameError.textContent = 'Vui lòng nhập đầy đủ họ và tên.';
        fullNameError.style.display = 'block';
        isValid = false;
    }

    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        emailError.textContent = 'Vui lòng nhập email.';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Vui lòng nhập email hợp lệ.';
        emailError.style.display = 'block';
        isValid = false;
    } else if (isEmailExist(email)) {
        emailError.textContent = 'Email này đã được đăng ký.';
        emailError.style.display = 'block';
        isValid = false;
    }

    // Kiểm tra mật khẩu
    if (!password) {
        passwordError.textContent = 'Vui lòng nhập mật khẩu.';
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        const errors = [];
        if (password.length < 8) errors.push('Ít nhất 8 ký tự');
        if (!/[A-Z]/.test(password)) errors.push('Ít nhất 1 chữ cái viết hoa');
        if (!/[a-z]/.test(password)) errors.push('Ít nhất 1 chữ cái thường');
        if (!/\d/.test(password)) errors.push('Ít nhất 1 chữ số');
        if (!/[@$!%*?&]/.test(password)) errors.push('Ít nhất 1 ký tự đặc biệt (@$!%*?&)');

        if (errors.length > 0) {
            passwordError.textContent = 'Mật khẩu chưa đáp ứng các yêu cầu: ' + errors.join(', ');
            passwordError.style.display = 'block';
            isValid = false;
        }
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Mật khẩu xác nhận không khớp.';
        confirmPasswordError.style.display = 'block';
        isValid = false;
    }

    if (!isValid) return;

    // Mã hóa password trước khi lưu
    const encodedPassword = btoa(password);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({
        name: fullName,
        email: email,
        password: encodedPassword,
        createdAt: new Date().toISOString() // Thêm thời gian tạo tài khoản
    });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.");
    window.location.href = "login.html";
}

function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    // Reset error messages
    emailError.style.display = 'none';
    passwordError.style.display = 'none';

    // Basic validation
    if (!email || !password) {
        if (!email) {
            emailError.textContent = 'Vui lòng nhập email.';
            emailError.style.display = 'block';
        }
        if (!password) {
            passwordError.textContent = 'Vui lòng nhập mật khẩu.';
            passwordError.style.display = 'block';
        }
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const encodedPassword = btoa(password);
    const user = users.find(user => user.email === email && user.password === encodedPassword);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
    } else {
        passwordError.textContent = 'Email hoặc mật khẩu không đúng.';
        passwordError.style.display = 'block';
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    alert("Đăng xuất thành công!");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    // Auto-focus vào trường đầu tiên của form
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.querySelector('input').focus();
        registerForm.addEventListener("submit", registerUser);

        // Real-time email validation
        const emailInput = document.getElementById("email");
        emailInput.addEventListener('blur', function () {
            const email = this.value.trim();
            const emailError = document.getElementById("email-error");
            emailError.style.display = 'none';

            if (!email) return;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailError.textContent = 'Vui lòng nhập email hợp lệ.';
                emailError.style.display = 'block';
                return;
            }

            if (isEmailExist(email)) {
                emailError.textContent = 'Email này đã được đăng ký.';
                emailError.style.display = 'block';
            }
        });
    }

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.querySelector('input').focus();
        loginForm.addEventListener("submit", loginUser);
    }

    // Kiểm tra nếu đã đăng nhập thì redirect
    if (localStorage.getItem("currentUser") && window.location.pathname.includes('login.html')) {
        window.location.href = "index.html";
    }
});