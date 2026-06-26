function init() {
    loadFromLocalStorage();
    renderAllMenus();
    renderCart();
    updateTotalSum();
    updateCardCounter();
}

function renderMenu(elementId, dataArray, getFunction) {
    document.getElementById(elementId).innerHTML = dataArray.map((_, i) => getFunction(i)).join('');
}

function renderAllMenus() {
    renderMenu('mainDish', mainDishes, getMainDish);
    renderMenu('sides', sideDishes, getSideDish);
    renderMenu('desserts', desserts, getdesserts);
}

function renderCart() {
    let cardMenu = document.getElementById('cardInsert');
    cardMenu.innerHTML = [
        ...mainDishes.map((_, i) => getCard(i)),
        ...sideDishes.map((_, i) => getCardSides(i)),
        ...desserts.map((_, i) => getCarddesserts(i))
    ].join('');
}

function renderTotalsum() {
    let sumElement = document.getElementById('priceCalc');
    let totalSumValue = totalSum + 5; 

    sumElement.innerHTML = getTotalSum();
    totalSumValue <= 5 ? hideButton() : showButton();
}

function updateTotalSum() {
    totalSum = [...mainDishes, ...sideDishes, ...desserts]
        .reduce((sum, item) => sum + (item.price * item.amount), 0);
        
    renderTotalsum();
}

function hideButton() {
    let button = document.getElementsByClassName('order_Button');
    if (button.length > 0) {
        button[0].style.display = 'none';
    }
}

function showButton() {
    let button = document.getElementsByClassName('order_Button');
    if (button.length > 0) {
        button[0].style.display = ''; 
    }
}

function addAmountMain(index) {
    mainDishes[index].amount += 1;
     update();
}

function update() {
    renderCart(); 
    updateTotalSum(); 
    saveToLocalStorageAll(); 
    updateCardCounter();
}

function addAmountMain(index) {
    mainDishes[index].amount++;
    update();
}

function addAmountSide(index) {
    sideDishes[index].amount++;
    update();
}

function addAmountDessert(index) {
    desserts[index].amount++;
    update();
}

function minusAmountMain(index) {
    if (mainDishes[index].amount > 0) {
        mainDishes[index].amount--;
        update();
    }
}

function minusAmountSide(index) {
    if (sideDishes[index].amount > 0) {
        sideDishes[index].amount--;
        update();
    }
}

function minusAmountDessert(index) {
    if (desserts[index].amount > 0) {
        desserts[index].amount--;
        update();
    }
}

function deleteMain(index) {
    mainDishes[index].amount = 0;
    update();
}

function deleteSide(index) {
    sideDishes[index].amount = 0;
    update();
}

function deleteDessert(index) {
    desserts[index].amount = 0;
    update();
}

function saveToLocalStorageAll() {
    localStorage.setItem("mainDishes", JSON.stringify(mainDishes));
    localStorage.setItem("sideDishes", JSON.stringify(sideDishes))
    localStorage.setItem("desserts", JSON.stringify(desserts));
}

let isCardVisible = false;

function loadFromLocalStorage() {
    let storedMainDishes = localStorage.getItem('mainDishes');
    let storedSideDishes = localStorage.getItem('sideDishes');
    let storedDesserts = localStorage.getItem('desserts');
    if (storedMainDishes) {
        mainDishes = JSON.parse(storedMainDishes);
    }
    if (storedSideDishes) {
        sideDishes = JSON.parse(storedSideDishes);
    }
    if (storedDesserts) {
        desserts = JSON.parse(storedDesserts);
    }
    updateCardCounter(); 
}

function order() {

    const overlayDiv = document.getElementById('overlay');
    const cardDiv = document.getElementById ('cardIN');
    localStorage.clear(); 
    overlayDiv.style.display = 'flex'; 
    setTimeout(() => {
      overlayDiv.style.display = 'none';
    }, 3000);

    clearBasket();
    cardDiv.style.display = 'none';
    setTimeout(() => {
        cardDiv.style.display = 'flex';
      }, 3000);

  }

function clearBasket () {

        for (let i = 0; i < desserts.length; i++) {
            desserts[i].amount = 0;
        }
        for (let i = 0; i < sideDishes.length; i++) {
            sideDishes[i].amount = 0;
        }
        for (let i = 0; i < mainDishes.length; i++) {
            mainDishes[i].amount = 0;
        }
        loadFromLocalStorage();
        renderAllMenus();
        renderCart();
        updateTotalSum();
        updateCardCounter();
}

function toggleButtons() {
    const button1 = document.querySelector('.fixed-button');
    const button2 = document.querySelector('.closeB');
    const div1 = document.querySelector('.close');
    if (!button1 || !button2 || !div1) {
        console.error("Ein Element fehlt:", { button1, button2, div1 });
        return;
    }
    const isButton1Visible = button1.classList.contains('visible');
    if (isButton1Visible) {
        button1.classList.remove('visible');
        button1.classList.add('hidden');

        button2.classList.remove('hidden');
        button2.classList.add('visible');

        div1.classList.add('open');
        document.body.classList.add('no-scroll');
    } else {
        button1.classList.remove('hidden');
        button1.classList.add('visible');

        button2.classList.remove('visible');
        button2.classList.add('hidden');

        div1.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }
}

function toggleCartVisibility() {
    var cart = document.querySelector(".shopping_card");
    if (cart.classList.contains("open")) {
        cart.classList.remove("open"); 
    } else {
        cart.classList.add("open"); 
    }
}

function updateCardCounter() {
    let totalItems = 0;
    
    mainDishes.forEach(item => {
        if (item.amount && item.amount > 0) {
            totalItems += item.amount;
        }
    });
    sideDishes.forEach(item => {
        if (item.amount && item.amount > 0) {
            totalItems += item.amount;
        }
    });
    desserts.forEach(item => {
        if (item.amount && item.amount > 0) {
            totalItems += item.amount;
        }
    });

    let counterElement = document.getElementById('CardCounter'); 
    if (counterElement) {
        counterElement.innerText = totalItems; 
    } else {
        console.error("Element mit ID 'CardCounter' nicht gefunden!");
    }
}

function toggleClose() {
    const closeButton = document.querySelector('.close-button');
    const divToClose = document.querySelector('.close-button'); 
    if (!closeButton || !divToClose) {
        console.error("Element fehlt:", { closeButton, divToClose });
        return;
    }
    divToClose.classList.toggle('hidden'); 
    document.body.classList.remove('no-scroll'); 
}

function toggleCardVisibility() {
    const card = document.querySelector('#cart'); 
    const body = document.body;
    if (!card) {
        console.error("Das Element '#cart' wurde nicht gefunden.");
        return;
    }
    card.classList.toggle('open');
    body.classList.toggle('no-scroll'); 
}
