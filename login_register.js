// Toggle password visibility
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
if (togglePassword && password) {
    togglePassword.addEventListener('click', function () {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
}

// Toggle confirm password visibility
const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
const confirmPassword = document.querySelector('#confirm-password');
if (toggleConfirmPassword && confirmPassword) {
    toggleConfirmPassword.addEventListener('click', function () {
        const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPassword.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
}

// Password requirements check
if (password) {
    password.addEventListener('input', function(e) {
        const password = e.target.value;
        document.getElementById('req-length').className = password.length >= 8 ? 'valid' : 'invalid';
        document.getElementById('req-upper').className = /[A-Z]/.test(password) ? 'valid' : 'invalid';
        document.getElementById('req-lower').className = /[a-z]/.test(password) ? 'valid' : 'invalid';
        document.getElementById('req-number').className = /\d/.test(password) ? 'valid' : 'invalid';
        document.getElementById('req-special').className = /[@$!%*?&]/.test(password) ? 'valid' : 'invalid';
    });
}

// Login form validation
const loginBtn = document.querySelector('.login-button');
if (loginBtn) {
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const usernameOrEmail = document.querySelector('.user-input').value.trim();
        const password = document.querySelector('.pass-input').value.trim();
        
        if (!usernameOrEmail) {
            alert('Vui lòng nhập email hoặc tên đăng nhập');
            return;
        }
        if (!password) {
            alert('Vui lòng nhập mật khẩu');
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(user =>
            (user.username === usernameOrEmail || user.email === usernameOrEmail) &&
            user.password === btoa(password)
        );

        if (user) {
            alert('Đăng nhập thành công!');
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "index.html";
        } else {
            alert('Thông tin đăng nhập không đúng. Vui lòng kiểm tra lại!');
        }
    });
}

// Register form validation
const registerBtn = document.getElementById('register-button');
if (registerBtn) {
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        // Reset error messages
        document.getElementById('fullname-error').style.display = 'none';
        document.getElementById('email-error').style.display = 'none';
        document.getElementById('password-error').style.display = 'none';
        document.getElementById('confirm-password-error').style.display = 'none';

        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!fullname) {
            document.getElementById('fullname-error').style.display = 'block';
            isValid = false;
        }

        if (!email) {
            document.getElementById('email-error').textContent = 'Vui lòng nhập email';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById('email-error').textContent = 'Vui lòng nhập email hợp lệ';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        }

        if (!password) {
            document.getElementById('password-error').textContent = 'Vui lòng nhập mật khẩu';
            document.getElementById('password-error').style.display = 'block';
            isValid = false;
        } else if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[@$!%*?&]/.test(password)) {
            document.getElementById('password-error').textContent = 'Mật khẩu không đáp ứng yêu cầu';
            document.getElementById('password-error').style.display = 'block';
            isValid = false;
        }

        if (password !== confirmPassword) {
            document.getElementById('confirm-password-error').style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const emailExists = users.some(user => user.email === email);

            if (emailExists) {
                document.getElementById('email-error').textContent = 'Email này đã được đăng ký';
                document.getElementById('email-error').style.display = 'block';
                return;
            }

            const newUser = {
                fullname: fullname,
                email: email,
                password: btoa(password)
            };

            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            window.location.href = "login.html";
        }
    });
}

// Adjust layout on load
window.addEventListener('load', function() {
    const main = document.querySelector('main');
    const loginDiv = document.querySelector('.login-div');
    const registerDiv = document.querySelector('.register-div');
    const activeDiv = loginDiv || registerDiv;

    if (activeDiv && main) {
        if (activeDiv.offsetHeight > window.innerHeight * 0.7) {
            main.style.alignItems = 'flex-start';
            main.style.paddingTop = '20px';
            activeDiv.style.marginTop = '20px';
            activeDiv.style.marginBottom = '20px';
        } else {
            main.style.alignItems = 'center';
        }
    }
});

// Adjust layout on resize
window.addEventListener('resize', function() {
    const main = document.querySelector('main');
    const loginDiv = document.querySelector('.login-div');
    const registerDiv = document.querySelector('.register-div');
    const activeDiv = loginDiv || registerDiv;

    if (activeDiv && main) {
        if (activeDiv.offsetHeight > window.innerHeight * 0.7) {
            main.style.alignItems = 'flex-start';
            main.style.paddingTop = '20px';
        } else {
            main.style.alignItems = 'center';
            main.style.paddingTop = '40px';
        }
    }
});
