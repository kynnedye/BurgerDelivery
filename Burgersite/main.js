import data from "./data.js"
const menu = document.querySelector(".menu")
const navToggle = document.querySelector(".nav-toggle")
const navLink = document.querySelectorAll(".nav-bar")
const orderBtn = document.querySelectorAll(".order")
const overlay = document.getElementById("overlay")
const close = document.getElementById("close-btn")
const cart = document.querySelector(".cart")
const riverside = document.querySelector("#riverside")
const townCenter = document.getElementById("town-center")
const jaxBeach = document.getElementById("jax-beach")
const locationEl = document.getElementById("actual-location")
const removeBtn = document.querySelectorAll(".remove")
const submit = document.getElementById("submit")

const addBtn = document.querySelectorAll(".add-cart")
let btnContainer = document.querySelector(".btn-container")
const checkout = document.querySelector(".checkout-btn")
let purchase = document.querySelector(".purchase-items")
const cartItems = document.querySelector(".cart-items")
const idArray =[]
let count = 0


for(let i = 0; i<orderBtn.length;i++){
    let btn = orderBtn[i]
    btn.addEventListener("click", modal)
}
function modal(){
    overlay.style.display="block"
}
// close modal

if(close){
    close.addEventListener("click", function(){
        overlay.style.display = "none"
    }) 

}
// Functions to make mobile nav 
if(document.getElementById("main")){
    navToggle.addEventListener("click", function(){
        document.body.classList.toggle('nav-open');
    })
    
    navLink.forEach(link => {
        link.addEventListener("click", function(){
            document.body.classList.remove('nav-open');
        })
    })
}

// puts the location at the top of page
if(riverside || townCenter || jaxBeach){
    

    riverside.addEventListener("click", function(){
        window.location="order.html"
        localStorage.setItem("area", "Riverside")
       
    })
    townCenter.addEventListener("click", function(){
        window.location="order.html"
        localStorage.setItem("area", "Town Center")
       
    })
    jaxBeach.addEventListener("click", function(){
        window.location="order.html"
        localStorage.setItem("area", "Jax Beach")
       
    })
}
if(document.getElementById("main")){
   
    window.onload = localStorage.clear()
   
    
}

if(document.getElementById("shop")){
   
    window.onload = renderItems()
    window.onload = updateCartTotal()
    
}
if(document.getElementById("order")){
    
    
        let restaurant = localStorage.getItem("area")
        locationEl.innerHTML= restaurant
    
}

cart.addEventListener("click", function(){
        
    window.location="shoppingcart.html"
        
}) 


// renders menu from data file and adds eventlisteners to the add buttons
function displayMenu(){
    for(let i=0; i<data.length;i++){
        let menuItem =data[i]
        
        
       menu.innerHTML += `
        <div class="menu-item" id=${menuItem.id}>
            <div class="menu-container"> 
                <h2 class="menu-title">${menuItem.title}</h2>        
                <img src="${menuItem.img}" class="menu-image">
            </div>
    


        <div class="menu-container">
            <p class="menu-description">${menuItem.description}</p>
            <h3 class="add">add to cart:</h3>
             <p class="menu-price">${menuItem.price}</p>
    <button class="add-cart">Add </button>

        </div>
    
    
    </div>
        `
        const addBtn = document.querySelectorAll(".add-cart")
        addBtn.forEach(btn => {
            btn.addEventListener("click", function(event){
        
                
                count++
                btn.disabled = true
                cart.innerHTML = `<div class"cart-container"><div class ="cart-count"> ${count}</div>  <button id="shopping" class="cart"><i class="fas fa-shopping-cart"></i></button></div>`
                let current = event.target
                let currentItem = current.parentElement.parentElement
                let currentId = currentItem.id
                console.log(currentId)
                idArray.push(currentId)
                localStorage.setItem("menuIds", JSON.stringify(idArray))
                console.log(localStorage)  
            })
        })
        
    }
    

}

// items selected from the menu will be rendered to the cart
function renderItems(){
    
    let retrievedData = localStorage.getItem("menuIds")
    
    let inCartIds = JSON.parse(retrievedData)

    
   
    for(let i =0; i<inCartIds.length;i++){
        let cartId = inCartIds[i]
        let item =data[cartId - 1]
        
        let cartPrice = parseFloat(item.price.replace("$",""))
        cartItems.innerHTML += `
        <div class="cart-item">
                    <div class="item-image-container">
                        <p class="item-name">${item.title}</p>
                        <img src=${item.img}>
    
                    </div>
                    
                    <p class="item-price">${cartPrice}</p>
                    <input type="number" value = "1" class="quantity">
                    <button class="remove btn">Remove</button>
                    
                </div>
                
                
        `
             
        
    }
    let quantityInput = document.querySelectorAll(".quantity")

    for(let i = 0; i < quantityInput.length; i++){
        let quantity = quantityInput[i]
        quantity.addEventListener("change", updateCartTotal)
        

    }

   removeItem()
  


}


        
       

function updateCartTotal(){
    let cartRows = document.getElementsByClassName("cart-item")
    let total = 0
    for(let i = 0; i< cartRows.length; i++){
        let cartRow = cartRows[i]
        let priceEl = cartRow.getElementsByClassName("item-price")[0]
        let quantityEl = cartRow.getElementsByClassName("quantity")[0]
        let price = priceEl.textContent
        
        
        let quantity = quantityEl.value
        total += (price * quantity)

    
        console.log(total)
        
    }
    document.querySelector(".cart-total-price").innerHTML = Math.round(100*total)/100
   
    
    
}
// button functions

function removeItem(){
    const removeBtn = document.querySelectorAll(".remove")
    
    for(let i = 0; i<removeBtn.length;i++){
        let btn = removeBtn[i]
        btn.addEventListener("click", function(event){
            let btnClicked = event.target
        btnClicked.parentElement.remove()
        updateCartTotal()
     
        })
    }
}



if(document.getElementById("order")){
   
    window.onload = displayMenu()
   
    
}
if(document.getElementById("shop")){
   
    window.onload = renderItems()
    window.onload = updateCartTotal()
    console.log(localStorage)
   
    
}
submit.addEventListener("click",submitForm)
function submitForm(){
    alert("Thanks for your purchase!! Check your email for updates.")
}
