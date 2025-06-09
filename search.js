// Tải dữ liệu sản phẩm
let products = [];

function loadProductsForSearch() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
        })
        .catch(error => console.error('Error loading products:', error));
}

// Hàm tìm kiếm
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();
        if (query === '') {
            searchResults.style.display = 'none';
            return;
        }

        // Lọc sản phẩm
        const results = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );

        displaySearchResults(results, query);
    });

    // Ẩn kết quả khi click bên ngoài
    document.addEventListener('mousedown', function (e) {
        const container = document.getElementById('search-bar-container');
        if (!container.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });


    // Xử lý phím Enter
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        }
    });
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">Không tìm thấy sản phẩm</div>';
        searchResults.style.display = 'block';
        return;
    }

    // Giới hạn 6 kết quả
    const displayResults = results.slice(0, 6);

    displayResults.forEach(product => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.dataset.id = product.id;

        // Lấy ảnh: ưu tiên colors[0].img, sau đó đến product.image, fallback ảnh mặc định
        const imageUrl = product.colors?.[0]?.img || product.image || 'images/default.jpg';

        // Cắt mô tả nếu dài
        const shortDesc = product.description?.length > 50 ?
            product.description.substring(0, 50) + '...' :
            product.description || '';

        item.innerHTML = `
            <img src="${imageUrl}" alt="${product.name}">
            <div class="search-result-info">
                <h4>${product.name}</h4>
                <p>${shortDesc}</p>
            </div>
        `;
        searchResults.appendChild(item);

        // Thêm sự kiện click để chuyển đến sản phẩm
        item.addEventListener('click', function () {
            window.location.href = `products.html#product-${product.id}`;
        });
    });

    // Nếu có nhiều hơn 6 kết quả, thêm nút "Xem tất cả"
    if (results.length > 6) {
        const seeAll = document.createElement('div');
        seeAll.className = 'see-all-results';
        seeAll.textContent = `Xem tất cả ${results.length} kết quả`;
        seeAll.addEventListener('click', function () {
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        });
        searchResults.appendChild(seeAll);
    }

    searchResults.style.display = 'block';
}

// Gọi hàm khi DOM tải xong
document.addEventListener('DOMContentLoaded', function () {
    loadProductsForSearch();
    setupSearch();
});
