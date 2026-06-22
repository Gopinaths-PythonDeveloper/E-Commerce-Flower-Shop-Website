// ===========================
// WISHLIST & CART
// ===========================

let wishlistButtons = document.querySelectorAll(".wishlist-btn");
let cartButtons = document.querySelectorAll(".add-cart-btn");

function getProduct(box){

    return {
        name: box.querySelector("h3").innerText,

        price: box.querySelector(".price")
        .childNodes[0].textContent.trim(),

        originalPrice:
        box.querySelector(".price span").innerText,

        image:
        box.querySelector("img").src,

        quantity: 1
    };
}

// ===========================
// WISHLIST
// ===========================

wishlistButtons.forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();

        let product =
        getProduct(this.closest(".box"));

        let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

        let exists =
        wishlist.find(item => item.name === product.name);

        if(exists){
            alert("Already in Wishlist ❤️");
            return;
        }

        wishlist.push(product);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        alert("Added To Wishlist ❤️");

    });

});

// ===========================
// CART
// ===========================

cartButtons.forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();

        let product =
        getProduct(this.closest(".box"));

        let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

        let existingProduct =
        cart.find(item => item.name === product.name);

        if(existingProduct){

            existingProduct.quantity += 1;

        }else{

            cart.push(product);

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert("Added To Cart 🛒");

    });

});

// ===========================
// SEARCH FLOWERS
// ===========================

let searchInput =
document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener("keyup", function(){

        let filter =
        this.value.toLowerCase();

        let products =
        document.querySelectorAll(".products .box");

        products.forEach(product => {

            let name =
            product.querySelector("h3")
            .innerText
            .toLowerCase();

            if(name.includes(filter)){

                product.style.display = "";

            }else{

                product.style.display = "none";

            }

        });

    });

}

// ===========================
// SORT BY PRICE
// ===========================

let sortSelect = document.getElementById("sortPrice");

if(sortSelect){

    sortSelect.addEventListener("change", function(){

        let container =
        document.querySelector(".products .box-container");

        let products =
        Array.from(document.querySelectorAll(".products .box"));

        products.sort((a,b)=>{

            let priceA = parseInt(
                a.querySelector(".price")
                .childNodes[0]
                .textContent
                .trim()
                .replace(/[^\d]/g,'')
            );

            let priceB = parseInt(
                b.querySelector(".price")
                .childNodes[0]
                .textContent
                .trim()
                .replace(/[^\d]/g,'')
            );

            if(this.value === "low"){
                return priceA - priceB;
            }

            if(this.value === "high"){
                return priceB - priceA;
            }

            return 0;

        });

        products.forEach(product => {
            container.appendChild(product);
        });

    });

}   