document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Mobile dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');

        // For mobile view
        if (window.innerWidth < 992) {
            dropdownLink.addEventListener('click', function (e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // Account menu toggle for mobile
    const accountMenu = document.querySelector('.account-menu');
    if (accountMenu && window.innerWidth < 992) {
        const accountLink = accountMenu.querySelector('a');
        accountLink.addEventListener('click', function (e) {
            e.preventDefault();
            accountMenu.classList.toggle('active');
        });
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 992) {
            navLinks.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            if (accountMenu) {
                accountMenu.classList.remove('active');
            }
        }
    });

    // Search functionality
    searchInput.addEventListener('input', function () {
        const keyword = this.value.trim().toLowerCase();
        const resultsContainer = document.querySelector('.search-results');

        if (keyword.length === 0) {
            resultsContainer.style.display = 'none';
            return;
        }

        // Giả sử bạn có danh sách sản phẩm dạng mảng
        const matchedItems = productList.filter(item =>
            item.name.toLowerCase().includes(keyword)
        );

        // Render danh sách ra dropdown
        resultsContainer.innerHTML = matchedItems.map(item => `
        <div class="search-result-item">
            <img src="${item.image}" alt="${item.name}" />
            <div class="search-result-info">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');

        resultsContainer.style.display = 'block';
    });


    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});