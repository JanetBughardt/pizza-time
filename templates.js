
let totalSum = 0

function getMainDish(indexNote) {
    return `

<div class="dish_container">
<div class="food_description">
    <h3>${mainDishes[indexNote].name}</h3>
    <p>${mainDishes[indexNote].description}</p>
    <p class="orange"><b>${mainDishes[indexNote].price.toFixed(2)} €</b></p>
</div>
<button class="dish_button" onclick="addAmountMain(${indexNote})">+</button>
</div> `
};



function getSideDish(indexNote) {
    return `
    <div class="dish_container">
    <div class="food_description">
        <h3>${sideDishes[indexNote].name}</h3>
        <p>${sideDishes[indexNote].description}</p>
        <p class="orange"><b>${sideDishes[indexNote].price.toFixed(2)} €</b></p>
    </div>
    <button class="dish_button" onclick="addAmountSide(${indexNote})">+</button>
    </div> `
};

function getdesserts(indexNote) {
    return `
    <div class="dish_container">
    <div class="food_description">
        <h3>${desserts[indexNote].name}</h3>
        <p>${desserts[indexNote].description}</p>
        <p class="orange"><b>${desserts[indexNote].price.toFixed(2)} €</b></p>
    </div>
    <button class="dish_button" onclick="addAmountDessert(${indexNote})">+</button>
    </div> `
};

function getCard(indexNote) {
    if (mainDishes[indexNote].amount > 0) {
        let priceAmount = mainDishes[indexNote].price * mainDishes[indexNote].amount;
        totalSum += priceAmount;
        return `
    <div class="item_name left"><b>${mainDishes[indexNote].name}</b>
    </div>
        <div class="item_data" >  
         <button class="button_minus" onclick="minusAmountMain(${indexNote})">-</button> 
        <div class="price">${mainDishes[indexNote].amount}x</div>
        <button class="button_plus" onclick="addAmountMain(${indexNote})">+</button>
        <div class="price">${priceAmount.toFixed(2)} €</div>
        <button type="button" onclick="deleteMain(${indexNote})" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-trash"></span> 	&#128465;
          </button>            
    </div>
`
    }
    else
        return `
`
};

function getCardSides(indexNote) {
    if (sideDishes[indexNote].amount > 0) {
        let priceAmount = sideDishes[indexNote].price * sideDishes[indexNote].amount;
        totalSum += priceAmount;
        return `
        <div class="item_name left"><b>${sideDishes[indexNote].name}</b>
        </div>
            <div class="item_data" >  
             <button class="button_minus" onclick="minusAmountSide(${indexNote})">-</button> 
            <div class="price">${sideDishes[indexNote].amount}x</div>
            <button class="button_plus" onclick="addAmountSide(${indexNote})">+</button>
            <div class="price">${priceAmount.toFixed(2)} € </div>
            <button type="button" onclick="deleteSide(${indexNote})" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-trash"></span> 	&#128465;
              </button>            
        </div>`
    }
    else
        return `
    `
};

function getCarddesserts(indexNote) {
    if (desserts[indexNote].amount > 0) {
        let priceAmount = desserts[indexNote].price * desserts[indexNote].amount;
        totalSum += priceAmount;
        return `
            <div class="item_name left"><b>${desserts[indexNote].name}</b>
            </div>
                <div class="item_data" >  
                 <button class="button_minus" onclick="minusAmountDessert(${indexNote})">-</button> 
                <div class="price">${desserts[indexNote].amount}x</div>
                <button class="button_plus" onclick="addAmountDessert(${indexNote})">+</button>
                <div class="price">${priceAmount.toFixed(2)} €</div>
                <button type="button" onclick="deleteDessert(${indexNote})" class="btn btn-default btn-sm">
                    <span class="glyphicon glyphicon-trash"></span> 	&#128465;
                  </button>            
            </div>`
    }
    else
        return `
        `};

function getTotalSum() {
    return `
        <div class="summary-item">
        <span class="left">Zwischensumme</span>
        <span class="right">${totalSum.toFixed(2)} €</span>
    </div>
    <div class="summary-item">
        <span class="left">Lieferkosten</span>
        <span class="right">5,00 €</span>
    </div>
    <div class="summary-item total">
        <strong class="left">Gesamt</strong>
        <strong class="right">${(totalSum + 5).toFixed(2)} €</strong>
    </div>`}