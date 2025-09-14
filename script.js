function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function addToCart(id) {
  const item = products.find(p => p.id === id);
  const cart = getCart();
  cart.push(item);
  setCart(cart);
  alert('Added to cart');
}
function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  setCart(cart);
  location.reload();
}
function resetCategory() {
  document.getElementById('categoryFilter').value = "";
  document.getElementById('minPrice').value = "";
  document.getElementById('maxPrice').value = "";
  applyFilters();
}
function applyFilters() {
  let category = document.getElementById('categoryFilter').value;
  let min = parseInt(document.getElementById('minPrice').value) || 0;
  let max = parseInt(document.getElementById('maxPrice').value) || Infinity;
  const filtered = products.filter(p =>
    (!category || p.category === category) &&
    p.price >= min && p.price <= max
  );
  renderProducts(filtered);
}
function renderProducts(list) {
  const container = document.getElementById('product-list');
  if (!container) return;
  container.innerHTML = '';
  list.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: ₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}
if (document.getElementById('product-list')) {
  renderProducts(products);
}
if (document.getElementById('cart-items')) {
  const items = getCart();
  const container = document.getElementById('cart-items');
  let total = 0;
  items.forEach((item, i) => {
    total += item.price;
    const div = document.createElement('div');
    div.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeFromCart(${i})">Remove</button>`;
    container.appendChild(div);
  });
  document.getElementById('cart-total').textContent = total;
}
document.getElementById('login-form')?.addEventListener('submit', e => {
  e.preventDefault();
  alert('Logged in!');
});

// --- Search Functionality on Home Page ---
document.getElementById('searchInput')?.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );
  renderHomeProducts(filtered);
});

// Render filtered products on Home Page

function renderHomeProducts(list) {
  const section = document.getElementById('search-results');
  const container = document.getElementById('home-product-list');
  if (!section || !container) return;

  if (list.length === 0) {
    section.style.display = 'block';
    container.innerHTML = '<p>No matching products found.</p>';
    return;
  }

  section.style.display = 'block';
  container.innerHTML = '';
  list.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: ₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

// --- Newsletter Subscribe ---
document.querySelector('.newsletter button')?.addEventListener('click', () => {
  const emailInput = document.querySelector('.newsletter input[type="email"]');
  if (emailInput?.value) {
    alert(`Subscribed with ${emailInput.value}`);
    emailInput.value = '';
  } else {
    alert("Please enter a valid email.");
  }
});

// --- Top Categories Click (Home Page) ---
function filterByCategory(cat) {
  document.getElementById('searchInput').value = cat;
  const filtered = products.filter(p => p.category === cat);
  renderHomeProducts(filtered);
}