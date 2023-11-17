//TODO: 6 product pages shown from json, onclick show a single product page that you can add to cart, once added the product stock should go down by 1
async function fetchData(url) {
    return new Promise(async(resolve,reject) => {
        try{
            const response = await fetch(url);
            if(!response.ok){
                throw new Error(`Blad pobierania danych: ${response.statusText}`);
            }
            const data = await response.json();
            resolve(data);
        }catch(error){
            console.error(`Wystapil blad: ${error.message}`);
            reject(error);
        }

});
}

const apiUrl = "http://localhost/Balawender/17.11.23/products.json";
fetchData(apiUrl)
.then((jsonData)=>{
console.log("Pobrane dane: ",jsonData);
console.log("[0]: ",jsonData.shirts[0]);
for (let i = 0; i < jsonData.shirts.length; i++) {
    ProductBuilder(jsonData.shirts[i]);
}
}).catch((error)=>{
    console.error("Wystapil blad pobierania danych: ", error);
})

//Product Builder
function ProductBuilder(product) {
    const imgSrc = product.data.images[0];
    const productPrice = product.data.price;
    const productTitle = product.data.name;
    const productCategory = product.data.category;

    var productDiv = document.createElement("div");
    productDiv.className = "product";

    var imgElement = document.createElement("img");
    imgElement.src = imgSrc;
    imgElement.alt = "Product Image";

    var ptrowDiv = document.createElement("div");
    ptrowDiv.className = "ptrow";

    var priceParagraph = document.createElement("p");
    priceParagraph.className = "product-price";
    priceParagraph.textContent = productPrice;

    var titleParagraph = document.createElement("p");
    titleParagraph.className = "product-title";
    titleParagraph.textContent = productTitle;

    var categoryParagraph = document.createElement("p");
    categoryParagraph.className = "product-category";
    categoryParagraph.textContent = productCategory;

    productDiv.appendChild(imgElement);

    ptrowDiv.appendChild(priceParagraph);
    ptrowDiv.appendChild(titleParagraph);
    ptrowDiv.appendChild(categoryParagraph);

    productDiv.appendChild(ptrowDiv);

    const Main = document.getElementById("Main");
    Main.appendChild(productDiv);
}