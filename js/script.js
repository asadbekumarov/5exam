// fetch("https://fakestoreapi.com/products")
//   .then((response) => response.json())
//   .then((products) => {
//     let Elwrapper = document.querySelector(".wrapper");
//     Elwrapper.style.display = "flex";
//     Elwrapper.style.justifyContent = "space-between";
//     Elwrapper.style.flexWrap = "wrap";
//     console.log(products);

//     products.forEach((product) => {
//       let newdiv = document.createElement("div");
//       newdiv.style.backgroundColor = "#ccc";
//       newdiv.style.padding = "20px";
//       newdiv.style.borderRadius = "8px";
//       newdiv.style.margin = "10px";

//       let newh1 = document.createElement("h1");
//       newh1.textContent = product.name;

//       let newh2 = document.createElement("h2");
//       newh2.textContent = product.info;
//       newh2.style.fontSize = "16px";
//       newh2.style.fontWeight = "400";
//       newh2.style.textAlign = "center";

//       let newp = document.createElement("p");
//       newp.textContent = `$${product.price.toFixed(2)}`;
//       newp.style.textAlign = "center";
//       newp.style.fontWeight = "600";

//       let newimg = document.createElement("img");
//       newimg.classList.add("newimg");
//       newimg.src = product.image;
//       newimg.style.width = "100%";
//       newimg.style.height = "160px";

//       let newlike = document.createElement("button");
//       newlike.textContent = "Like";
//       newlike.style.marginTop = "10px";
//       newlike.style.backgroundColor = "#ff5722";
//       newlike.style.color = "#fff";
//       newlike.style.border = "none";
//       newlike.style.padding = "10px";
//       newlike.style.borderRadius = "10px";
//       newlike.addEventListener("click", () => {
//         localStorage.setItem("likedProduct", JSON.stringify(product));
//         window.location.href = "./favo.html";
//       });

//       let newdel = document.createElement("button");
//       newdel.textContent = "Delete";
//       newdel.style.marginTop = "10px";
//       newdel.style.backgroundColor = "#000";
//       newdel.style.color = "#fff";
//       newdel.style.border = "none";
//       newdel.style.padding = "10px";
//       newdel.style.borderRadius = "10px";
//       newdel.style.marginLeft = "10px";
//       newdel.addEventListener("click", () => {
//         newdiv.remove();
//       });

//       newdiv.appendChild(newimg);
//       newdiv.appendChild(newh1);
//       newdiv.appendChild(newh2);
//       newdiv.appendChild(newp);
//       newdiv.appendChild(newlike);
//       newdiv.appendChild(newdel);

//       Elwrapper.appendChild(newdiv);
//     });
//   })
//   .catch((error) => console.error("Error:", error));
/////////////////////////////////////////////////
let Elwrapper = document.querySelector(".wrapper");
let Elinput = document.querySelector("input");
let loading = document.getElementById("loading");

(async function () {
  loading.style.display = "block";
  try {
    let response = await fetch("https://fakestoreapi.com/products");

    let apiProducts = await response.json();
    console.log(apiProducts);

    let localProducts = JSON.parse(localStorage.getItem("products")) || [];

    let products = [...localProducts, ...apiProducts];
    loading.style.display = "none";

    function filterProducts() {
      let searchTerm = Elinput.value.toLowerCase();
      Elwrapper.innerHTML = "";

      products
        .filter((product) => product.title.toLowerCase().includes(searchTerm))
        .forEach((product) => {
          let newdiv = document.createElement("div");
          let newimg = document.createElement("img");
          let newh3 = document.createElement("h3");
          let newp = document.createElement("p");
          let newb = document.createElement("h3");
          let newpi = document.createElement("p");

          newpi.classList.add("newpi");
          newp.classList.add("newp");
          newb.classList.add("newb");
          newh3.classList.add("newh3");
          newimg.classList.add("newimg");
          newdiv.classList.add("product");

          newb.textContent = product.category || "Custom";
          newimg.src = product.file || product.image;
          newh3.textContent = product.title;
          newp.textContent = `$${product.price || "N/A"}`;

          newdiv.appendChild(newpi);
          newdiv.appendChild(newimg);
          newdiv.appendChild(newb);
          newdiv.appendChild(newh3);
          newdiv.appendChild(newp);

          Elwrapper.appendChild(newdiv);
        });
    }

    Elinput.addEventListener("input", filterProducts);

    filterProducts();
  } catch (error) {
    console.error("Error:", error);
    loading.style.display = "none";
  }
})();
