document.getElementById("searchBtn").addEventListener("click", async () => {
  const category = document.getElementById("category").value;
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;

  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const results = document.getElementById("results");

  results.innerHTML = "";
  error.style.display = "none";
  loading.style.display = "block";

  // Validate inputs
  if (!category || !minPrice || !maxPrice) {
    error.textContent = "Please fill in all fields.";
    error.style.display = "block";
    loading.style.display = "none";
    return;
  }

  const apiUrl = `https://fakestoreapi.com/products`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();

    if (data.length === 0) {
      results.innerHTML = "<p>No products found.</p>";
    } else {
      data.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
        `;
        results.appendChild(div);
      });
    }
  } catch (err) {
    error.textContent = "Error fetching products.";
    error.style.display = "block";
  } finally {
    loading.style.display = "none";
  }
});
