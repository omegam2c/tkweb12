
let currentProduct = null;

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const product = data.find(p => p.id === productId);
    if (!product) return;

    currentProduct = product;

    renderProductUI(product);

    document.getElementById("description-text").textContent = product.description || "Không có mô tả.";


    const addToCartBtn = document.getElementById("add-to-cart");
    addToCartBtn.onclick = () => {
      const selectedColor = document.querySelector(".color-option.active")?.getAttribute("data-color");
      const selectedSize = document.querySelector(".size-option.active")?.textContent;
      const quantity = parseInt(document.getElementById("quantity-input").value) || 1;

      if (!selectedColor || !selectedSize) {
        alert("Vui lòng chọn màu và size.");
        return;
      }

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const existingItem = cart.find(
        item => item.id === currentProduct.id &&
                item.color === selectedColor &&
                item.size === selectedSize
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          id: currentProduct.id,
          name: currentProduct.name,
          price: currentProduct.price,
          img: currentProduct.colors.find(c => c.name === selectedColor)?.img || currentProduct.colors[0].img,
          color: selectedColor,
          size: selectedSize,
          quantity
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();

      animateToCart(document.getElementById("product-image"));

      const productImage = document.getElementById("product-image");
      if (productImage) {
        animateToCart(productImage);
      }

    };

    updateCartCount();

    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      const countEl = document.querySelector(".cart-count");
      if (countEl) countEl.textContent = total;
    }

    function animateToCart(imgElement) {
    const cartIcon = document.querySelector(".cart-icon");
    const imgClone = imgElement.cloneNode(true);
    const rect = imgElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    imgClone.classList.add("fly-image");
    imgClone.style.top = rect.top + "px";
    imgClone.style.left = rect.left + "px";
    imgClone.style.width = rect.width + "px";
    imgClone.style.height = rect.height + "px";

    imgClone.style.position = "fixed";
    imgClone.style.transform = "none";
    imgClone.style.opacity = "1";

    document.body.appendChild(imgClone);

    const deltaX = cartRect.left - rect.left;
    const deltaY = cartRect.top - rect.top;

    requestAnimationFrame(() => {
      imgClone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.1) rotate(720deg)`;
      imgClone.style.opacity = "0";
    });

    setTimeout(() => {
      imgClone.remove();
    }, 800);
  }



    // Tạo ảnh dọc (thumbnail)
    const thumbnails = document.getElementById("product-thumbnails");
    const mainImage = document.getElementById("product-image");
    thumbnails.innerHTML = "";

    product.colors.forEach((color, index) => {
      const thumb = document.createElement("img");
      thumb.src = color.img;
      thumb.alt = color.name;
      thumb.style.width = "60px";
      thumb.style.borderRadius = "6px";
      thumb.style.cursor = "pointer";
      thumb.style.border = index === 0 ? "2px solid #1e88e5" : "2px solid transparent";

      thumb.onclick = () => {
        const mainImage = document.getElementById("product-image");

        // Xác định chiều trượt (giả định luôn trượt sang trái cho đơn giản)
        const direction = "left";

        // Kích hoạt hiệu ứng slide-out
        mainImage.classList.remove("slide-in");
        mainImage.classList.add(`slide-out-${direction}`);

        // Đặt thumbnail active
        document.querySelectorAll("#product-thumbnails img").forEach(i => i.style.border = "2px solid transparent");
        thumb.style.border = "2px solid #1e88e5";

        // Sau 300ms, đổi ảnh chính và slide-in
        setTimeout(() => {
          mainImage.src = color.img;
          mainImage.classList.remove(`slide-out-${direction}`);
          mainImage.classList.add("slide-in");
        }, 300);
      };


      thumbnails.appendChild(thumb);
    });

    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const section = header.parentElement;
        section.classList.toggle('active');

        const icon = header.querySelector('.toggle-icon');
        icon.textContent = section.classList.contains('active') ? '–' : '+';
      });
    });
    
 


  });
