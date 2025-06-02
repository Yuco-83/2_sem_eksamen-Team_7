const productContainer = document.getElementById("product");

let productId = new URLSearchParams(window.location.search).get("product");

// fetch sektion
const curl = "https://wcaohfhhyehhogxyzzgj.supabase.co/rest/v1/produkter?select=*";
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjYW9oZmhoeWVoaG9neHl6emdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzgyMjk4OSwiZXhwIjoyMDYzMzk4OTg5fQ.NC92FSLpTN3UUTybOYytVrsBxFUADYt-6hednShJJKM";
const options = {
  headers: {
    apikey: apikey,
  },
};

fetch(curl, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    productContainer.innerHTML = `
               <article id="img_container">
            <img src="https://www.guldsmedpade-shop.dk/cdn/shop/products/8147318_500x.jpg?v=1678794347" alt="" />
            <span class="leftarrow"><img src="assets/arrowicon.svg" alt="arrow" /></span>
            <span class="rightarrow"><img src="assets/arrowicon.svg" alt="arrow" /></span>
          </article>
          <article id="product_info">
            <aside class="titel_pris">
              <h1>Studio Z More ring i sølv</h1>
              <p id="price">4325kr</p>
            </aside>
          `;
  });
