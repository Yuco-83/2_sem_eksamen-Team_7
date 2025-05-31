const productList = document.querySelector("#product_list");

// fetch sektion
const curl = "https://wcaohfhhyehhogxyzzgj.supabase.co/rest/v1/produkter?select=*";
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjYW9oZmhoeWVoaG9neHl6emdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzgyMjk4OSwiZXhwIjoyMDYzMzk4OTg5fQ.NC92FSLpTN3UUTybOYytVrsBxFUADYt-6hednShJJKM";
const options = {
  headers: {
    apikey: apikey,
  },
};

function hentData() {
  fetch(curl, options)
    .then((response) => response.json())
    .then((productData) => {
      allProducts = productData;
      filteredProducts = allProducts;
      showProduct(allProducts);
    });
}

hentData();
// fetch sektion slut

// opretter konstant for selects
const selectMaterial = document.querySelector("#materialSelector");
const selectBrand = document.querySelector("#brandSelector");
const selectType = document.querySelector("#typeSelector");

// viser produkter når brugeren vælger et filter
function showProduct(productData, event) {
  let markup = productData
    .filter((product) => {
      // tjækker om produktet har materialet som er valgt og retunere dem hvis ja
      if (event) {
        if (event.target.id == "materiale") {
          material = event.target.value;
        } else if (event.target.id == "brand") {
          brand = event.target.value;
        } else if (event.target.id == "type") {
          type = event.target.value;
        }

        if (material == "none" && brand != "none") {
          return product.brand[0] == brand;
        } else if (brand == "none" && material != "none") {
          return product.materiale[0] == material;
        } else if (material == "none" && brand == "none") {
          return true;
        } else {
          return product.materiale == material && product.brand[0] == brand;
        }
      } else {
        return true;
      }
    })
    .map((product) => {
      return `
           
      <article id="product_card">
      <a href="single_product.html?product=${product.id}"> 
            <img src="${product.billede}" alt="billede af mad" />
            <h2>${product.navn}</h2>
            <p class="rating">Pris&#58; ${product.pris} kr</p>
            </a>
          </article>
    `;
    })
    .join("");
  productList.innerHTML = markup;
}

// lytter efter når filter skiftes
selectMaterial.addEventListener("change", filterMaterial);
selectBrand.addEventListener("change", filterBrand);
selectType.addEventListener("change", filterType);

function filterMaterial(event) {
  material = event.target.value;
  if (material == "none") {
    filteredProducts = allProducts;
  } else {
    // hvis der valgt andet end "none" filtreres data
    filteredProducts = allProducts.filter((product) => product.materiale == material);
  }

  // Det filtrerede data vises
  showProduct(filteredProducts);
}

function filterBrand(event) {
  brand = event.target.value;
  if (brand == "none") {
    showProduct(filteredProducts);
  } else {
    // hvis der valgt andet end "none" filtreres data
    const filteredBrandData = filteredProducts.filter((product) => product.brand.includes(brand));

    showProduct(filteredBrandData);
  }
}

function filterType(event) {
  type = event.target.value;
  if (type == "none") {
    showProduct(filteredProducts);
  } else {
    // hvis der valgt andet end "none" filtreres data
    const filteredTypeData = filteredProducts.filter((product) => product.type.includes(type));

    showProduct(filteredTypeData);
  }
}
