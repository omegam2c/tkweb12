
function showProductModal(product) {
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = product.price.toLocaleString() + '₫';

  const image = document.getElementById("product-image");
  image.src = product.colors[0].img;

const colorOptions = document.getElementById("color-options");
colorOptions.innerHTML = "";

product.colors.forEach((colorObj, index) => {
  const btn = document.createElement("button");
  btn.className = "color-option";
  btn.title = colorObj.name;
  btn.dataset.color = colorObj.name;

  // Map tên màu sang CSS
  let cssColor = colorObj.name.toLowerCase();
  if (cssColor === "trắng") cssColor = "white";
  else if (cssColor === "đen") cssColor = "black";
  else if (cssColor === "xanh") cssColor = "blue";
  else if (cssColor === "tím") cssColor = "purple";
  else if (cssColor === "hồng") cssColor = "pink";
  else if (cssColor === "xanh lá") cssColor = "green";
  else if (cssColor === "xanh dương") cssColor = "blue";
  else if (cssColor === "xanh navy") cssColor = "#003366";
  else if (cssColor === "cam") cssColor = "#FF6600";
  else if (cssColor === "xanh dương nhạt") cssColor = "#6699FF";
  else if (cssColor === "be") cssColor = "#FFFFCC";
  else if (cssColor === "xám đậm") cssColor = "#333333";
  else if (cssColor === "nâu sữa") cssColor = "#996666";
  else if (cssColor === "đỏ") cssColor = "#990000";
  else if (cssColor === "nâu") cssColor = "#996600";
  else if (cssColor === "vàng") cssColor = "yellow";
  else if (cssColor === "xanh rêu") cssColor = "#669966";
  else if (cssColor === "xanh retro") cssColor = "#99CCCC";
  else cssColor = "#ccc"; // fallback

  // Hình chữ nhật viền tròn
  btn.style.backgroundColor = cssColor;
  btn.style.width = "50px";
  btn.style.height = "28px";
  btn.style.borderRadius = "12px"; // Bo tròn
  btn.style.border = "2px solid #ccc";
  btn.style.marginRight = "10px";
  btn.style.cursor = "pointer";

  // Tự động chọn ảnh đầu tiên
  if (index === 0) {
    btn.classList.add("active");
    document.getElementById("product-image").src = colorObj.img;
  }

  btn.onclick = () => {
    document.querySelectorAll(".color-option").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("product-image").src = colorObj.img;
  };

  colorOptions.appendChild(btn);
});



const sizeOptions = document.getElementById("size-options");
sizeOptions.innerHTML = "";

let selectedSize = product.sizes[0];

product.sizes.forEach(size => {
  const btn = document.createElement("button");
  btn.className = "size-option";
  btn.textContent = size;

  // Style giống nút màu
  btn.style.width = "50px";
  btn.style.height = "28px";
  btn.style.borderRadius = "12px";
  btn.style.border = "2px solid #ccc";
  btn.style.marginRight = "10px";
  btn.style.cursor = "pointer";
  btn.style.fontWeight = "bold";
  btn.style.backgroundColor = "white";
  btn.style.transition = "0.2s";

  // Nếu là size đầu tiên, đánh dấu active
  if (size === selectedSize) {
    btn.classList.add("active");
    btn.style.borderColor = "#1e88e5";
    btn.style.backgroundColor = "#e3f2fd";
    btn.style.color = "#1e88e5";
  }

  btn.onclick = () => {
    selectedSize = size;
    document.querySelectorAll(".size-option").forEach(b => {
      b.classList.remove("active");
      b.style.borderColor = "#ccc";
      b.style.backgroundColor = "white";
      b.style.color = "black";
    });
    btn.classList.add("active");
    btn.style.borderColor = "#1e88e5";
    btn.style.backgroundColor = "#e3f2fd";
    btn.style.color = "#1e88e5";
  };

  sizeOptions.appendChild(btn);
});

document.getElementById("decrease-qty").onclick = () => {
  const input = document.getElementById("quantity-input");
  let value = parseInt(input.value);
  if (value > 1) input.value = value - 1;
};

document.getElementById("increase-qty").onclick = () => {
  const input = document.getElementById("quantity-input");
  let value = parseInt(input.value);
  input.value = value + 1;
};


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

  // Tính toán khoảng cách cần bay
  const deltaX = cartRect.left - rect.left;
  const deltaY = cartRect.top - rect.top;

  // Kích hoạt animation
  requestAnimationFrame(() => {
    imgClone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.1) rotate(720deg)`;
    imgClone.style.opacity = "0";
  });

  // Xóa clone sau khi bay
  setTimeout(() => {
    imgClone.remove();
  }, 800);
}


function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.querySelector(".cart-count");
  if (cartCountEl) cartCountEl.textContent = totalItems;
}

document.getElementById("add-to-cart").onclick = () => {
  const loggedInUser = localStorage.getItem("currentUser");
  if (!loggedInUser) {
    localStorage.setItem("redirectAfterLogin", window.location.href);
    window.location.href = "login.html";
    return;
  }

  const selectedColor = document.querySelector(".color-option.active").dataset.color;
  const selectedSize = document.querySelector(".size-option.active").textContent;
  const quantity = parseInt(document.getElementById("quantity-input").value);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existing = cart.find(item =>
    item.id === product.id &&
    item.color === selectedColor &&
    item.size === selectedSize
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      img: product.colors.find(c => c.name === selectedColor)?.img || product.colors[0].img
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  animateToCart(document.getElementById("product-image"));
  updateCartCount();
};
  const detailLink = document.getElementById("product-detail-link");
  if (detailLink && product.id) {
    detailLink.onclick = (e) => {
      e.preventDefault(); // Ngăn hành vi mặc định nếu popup chặn click
      document.getElementById("productModal").style.display = "none"; // Đóng popup
      window.location.href = `product-detail.html?id=${product.id}`; // Điều hướng
    };
  }

  document.getElementById("productModal").style.display = 'flex';


}




function renderProductUI(product) {
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = product.price.toLocaleString() + '₫';


  const image = document.getElementById("product-image");
  image.src = product.colors[0].img;

  const colorOptions = document.getElementById("color-options");
  colorOptions.innerHTML = "";

  product.colors.forEach((colorObj, index) => {
    const btn = document.createElement("button");
    btn.className = "color-option";
    btn.title = colorObj.name;
    btn.dataset.color = colorObj.name;

    let cssColor = colorObj.name.toLowerCase();
    if (cssColor === "trắng") cssColor = "white";
    else if (cssColor === "đen") cssColor = "black";
    else if (cssColor === "xanh") cssColor = "blue";
    else if (cssColor === "tím") cssColor = "purple";
    else if (cssColor === "hồng") cssColor = "pink";
    else if (cssColor === "xanh lá") cssColor = "green";
    else if (cssColor === "xanh dương") cssColor = "blue";
    else if (cssColor === "xanh navy") cssColor = "#003366";
    else if (cssColor === "cam") cssColor = "#FF6600";
    else if (cssColor === "xanh dương nhạt") cssColor = "#6699FF";
    else if (cssColor === "be") cssColor = "#FFFFCC";
    else if (cssColor === "xám đậm") cssColor = "#333333";
    else if (cssColor === "nâu sữa") cssColor = "#996666";
    else if (cssColor === "đỏ") cssColor = "#990000";
    else if (cssColor === "nâu") cssColor = "#996600";
    else if (cssColor === "vàng") cssColor = "yellow";
    else if (cssColor === "xanh rêu") cssColor = "#669966";
    else if (cssColor === "xanh retro") cssColor = "#99CCCC";
    else cssColor = "#ccc";

    btn.style.backgroundColor = cssColor;
    btn.style.width = "50px";
    btn.style.height = "28px";
    btn.style.borderRadius = "12px";
    btn.style.border = "2px solid #ccc";
    btn.style.marginRight = "10px";
    btn.style.cursor = "pointer";

    if (index === 0) {
      btn.classList.add("active");
      image.src = colorObj.img;
    }

    btn.onclick = () => {
      document.querySelectorAll(".color-option").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      image.src = colorObj.img;
    };

    colorOptions.appendChild(btn);
  });

  const sizeOptions = document.getElementById("size-options");
  sizeOptions.innerHTML = "";

  let selectedSize = product.sizes[0];

  product.sizes.forEach(size => {
    const btn = document.createElement("button");
    btn.className = "size-option";
    btn.textContent = size;

    btn.style.width = "50px";
    btn.style.height = "28px";
    btn.style.borderRadius = "12px";
    btn.style.border = "2px solid #ccc";
    btn.style.marginRight = "10px";
    btn.style.cursor = "pointer";
    btn.style.fontWeight = "bold";
    btn.style.backgroundColor = "white";
    btn.style.transition = "0.2s";

    if (size === selectedSize) {
      btn.classList.add("active");
      btn.style.borderColor = "#1e88e5";
      btn.style.backgroundColor = "#e3f2fd";
      btn.style.color = "#1e88e5";
    }

    btn.onclick = () => {
      selectedSize = size;
      document.querySelectorAll(".size-option").forEach(b => {
        b.classList.remove("active");
        b.style.borderColor = "#ccc";
        b.style.backgroundColor = "white";
        b.style.color = "black";
      });
      btn.classList.add("active");
      btn.style.borderColor = "#1e88e5";
      btn.style.backgroundColor = "#e3f2fd";
      btn.style.color = "#1e88e5";
    };

    sizeOptions.appendChild(btn);
  });

  document.getElementById("decrease-qty").onclick = () => {
    const input = document.getElementById("quantity-input");
    let value = parseInt(input.value);
    if (value > 1) input.value = value - 1;
  };

  document.getElementById("increase-qty").onclick = () => {
    const input = document.getElementById("quantity-input");
    let value = parseInt(input.value);
    input.value = value + 1;
  };

  document.getElementById("add-to-cart").onclick = () => {
    const loggedInUser = localStorage.getItem("currentUser");
    if (!loggedInUser) {
      localStorage.setItem("redirectAfterLogin", window.location.href);
      window.location.href = "login.html";
      return;
    }

    const selectedColor = document.querySelector(".color-option.active").dataset.color;
    const selectedSize = document.querySelector(".size-option.active").textContent;
    const quantity = parseInt(document.getElementById("quantity-input").value);

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find(item =>
      item.id === product.id &&
      item.color === selectedColor &&
      item.size === selectedSize
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
        img: product.colors.find(c => c.name === selectedColor)?.img || product.colors[0].img
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  };
}
