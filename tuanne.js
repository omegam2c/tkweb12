    fetch('products.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(p => {
    if (!p.image && Array.isArray(p.colors) && p.colors[0]?.img) {
        p.image = p.colors[0].img;
    }
    });
    const featuredIds = ["sp2", "sp11", "sp14", "sp22","sp30","sp41"];
    const featured = data.filter(p => featuredIds.includes(p.id));
    renderCards(featured, "featured-products");
    setupSlider("featured-products");
  });

function renderCards(products, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img">
        <img src="${p.image}" alt="${p.name}">
        ${p.isHot ? '<div class="product-badge">HOT</div>' : ''}
      </div>
      <div class="product-info">
        <div>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-style">${p.style || ''}</p>
          <p class="product-price">${p.price} VNĐ</p>
        </div>
        <div class="product-actions">
          <a href="#" class="btn-view full-width" onclick='showProductModal(${JSON.stringify(p)})'>Xem nhanh</a>
        </div>
      </div>`;
    container.appendChild(card);
  });
}
function showProductModal(product) {
  // Tùy chỉnh modal của bạn ở đây
  alert(`Xem nhanh: ${product.name}\nGiá: ${product.price} VNĐ`);
}

function setupSlider(containerId) {
  const container = document.querySelector(`#${containerId}`);
  const prevBtn = container.parentElement.querySelector(".prev");
  const nextBtn = container.parentElement.querySelector(".next");

  const scrollStep = 320;

  prevBtn.addEventListener("click", () => {
    container.scrollBy({ left: -scrollStep, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    container.scrollBy({ left: scrollStep, behavior: "smooth" });
  });

  let autoScroll = setInterval(() => {
    container.scrollBy({ left: scrollStep, behavior: "smooth" });
  }, 1500);

  container.addEventListener("mouseenter", () => clearInterval(autoScroll));
  container.addEventListener("mouseleave", () => {
    autoScroll = setInterval(() => {
      container.scrollBy({ left: scrollStep, behavior: "smooth" });
    }, 1500);
  });
}

document.querySelectorAll('.product-slider-container').forEach(container => {
    const row = container.querySelector('.products-row');
    const nextBtn = container.querySelector('.next');
    const prevBtn = container.querySelector('.prev');

    const scrollAmount = 240 + 20;

    nextBtn.addEventListener('click', () => {
    row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
    row.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
}); 
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countEl = document.querySelector(".cart-count");
    if (countEl) countEl.textContent = totalQty;
}

document.addEventListener("DOMContentLoaded", updateCartCount);
