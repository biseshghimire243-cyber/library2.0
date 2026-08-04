document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  initCheckoutForm();
});

function renderCart() {
  const cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  const cartCountEl = document.getElementById("cartCount");
  const summaryCountEl = document.getElementById("summaryCount");
  const summaryTotalEl = document.getElementById("summaryTotal");
  const cartItemsList = document.getElementById("cartItemsList");

  if (cartCountEl) cartCountEl.textContent = cartCount;
  if (summaryCountEl) summaryCountEl.textContent = cartCount;

  if (!cartItemsList) return;

  if (cartCount === 0) {
    cartItemsList.innerHTML = `
      <div style="text-align: center; padding: 2rem 0;">
        <p style="color: #64748b; font-size: 1.1rem;">Your cart is currently empty.</p>
        <a href="store.html" style="display: inline-block; margin-top: 1rem; padding: 0.5rem 1rem; background: #0284c7; color: #fff; border-radius: 6px; text-decoration: none;">Browse Books</a>
      </div>
    `;
    if (summaryTotalEl) summaryTotalEl.textContent = "NPR 0";
    return;
  }

  const basePricePerBook = 1200;
  const deliveryFee = 100;
  const totalAmount = cartCount * basePricePerBook + deliveryFee;

  if (summaryTotalEl) summaryTotalEl.textContent = `NPR ${totalAmount}`;

  cartItemsList.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid #e2e8f0;">
      <div>
        <h3 style="font-size: 1rem; color: #0f172a;">Selected Books (${cartCount} items)</h3>
        <p style="color: #64748b; font-size: 0.85rem;">Standard Delivery (2-3 Business Days)</p>
      </div>
      <div>
        <button id="clearCartBtn" style="background: #ef4444; color: #fff; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer;">Clear Cart</button>
      </div>
    </div>
  `;

  document.getElementById("clearCartBtn")?.addEventListener("click", () => {
    localStorage.setItem("cartCount", "0");
    renderCart();
  });
}

function initCheckoutForm() {
  const checkoutForm = document.getElementById("checkoutForm");

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      // Prevents page refresh
      e.preventDefault();

      const cartCount = parseInt(localStorage.getItem("cartCount")) || 0;

      if (cartCount === 0) {
        alert("Your cart is empty! Add books from the store before placing an order.");
        return;
      }

      // Clear cart count for fresh session
      localStorage.setItem("cartCount", "0");

      // Redirect to the success page directly
      window.location.href = "order-success.html";
    });
  }
}