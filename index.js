const API_URL = 'https://gorest.co.in/public/v2/users';

const productsContainer = document.getElementById('user-list');

let products = [];

function createUser(name) {
    const user = document.createElement('div');
    user.classList.add('user');

    // create card image
    const cardImage = document.createElement('img');
    cardImage.classList.add('card-img-top');
    cardImage.src = product.thumbnail;

    // create card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // create card title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerText = product.title;

    // create card text
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.innerText = product.description;

    // create card price
    const cardPrice = document.createElement('p');
    cardPrice.classList.add('card-price');
    cardPrice.innerText = product.price;

    // create card button
    const cardButton = document.createElement('a');
    cardButton.classList.add('btn', 'btn-primary');
    cardButton.href = `product.html?id=${product.id}`;
    cardButton.innerText = 'View Product';

    // append all elements to card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardButton);

    // append card image and body to card
    card.appendChild(cardImage);
    card.appendChild(cardBody);

    return card;
}

function createMessageBox(message, type = 'success') {
    const cl = `alert-${type}`;
    const errorMessageBox = document.createElement('div');
    errorMessageBox.classList.add('alert', cl);
    errorMessageBox.innerText = message;

    return errorMessageBox;
}


function handleLoaded() {
    const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
}


function getProducts() {
  return fetch(API_URL)
    .then(response => {
        handleLoaded();
        if (!response.ok) {
            throw new Error('Невдалось завантажити товари. Спробуйте пізніше');
        }

        return response.json()
    })
    .then(({ products: p }) => {

        products = p;

        if (!products.length) {
            const errorMessageBox = createMessageBox('Товари відсутні');
            productsContainer.appendChild(errorMessageBox, 'success');
        }

        products.forEach(product => {
            const card = createCard(product);
            productsContainer.appendChild(card);
        });

        createCategoriesList(products);
    })
    .catch(error => {
        const errorMessageBox = createMessageBox(error.message);
        productsContainer.appendChild(errorMessageBox, 'error');
    })
}

getProducts();