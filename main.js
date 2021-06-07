console.log('main.js loadd');

var displayQuote = document.querySelector("#quote");
var displayCategories = document.querySelector("#categories");
var displayCategSelect = document.querySelector(".input-group");
var categorySelect = document.querySelector("#categ-select");
var btnNewQuote = document.querySelector("#new-quote-btn");
var loadingGraphic = document.querySelector(".loading-graphic");
var categorySelect;


function quoteLoading(val) {
    if (val) {
        btnNewQuote.disabled = true;
        loadingGraphic.style.display = '';
        displayQuote.innerText = '';
        displayCategories.innerText = '';
    }
    else {
        btnNewQuote.disabled = false;
        loadingGraphic.style.display = 'none';
    }
}


function getQuoteCall() {
    // categorySelect = document.querySelector("#categ-select");
    var categ = categorySelect.value;
    console.log(categ);
    getData(categ);

    quoteLoading(true);
}


function displayData(json) {
    quoteLoading(false);

    console.log('Data received.');
    console.log(json);
    console.log(json.value);
    displayQuote.innerText = json.value;
    displayCategories.innerText = json.categories;
}



function displayCategoriesSelect(json) {
    console.log('Categories data received.');
    console.log(json);

    var option = document.createElement("OPTION");
    option.value = 'random';
    option.innerText = 'random';

    categorySelect.appendChild(option);

    var i = 0;
    while (i < json.length) {
        console.log(json[i]);

        var option = document.createElement("OPTION");
        option.value = json[i];
        option.innerText = json[i];

        categorySelect.appendChild(option);

        i++;
    }
}


function getCategory() {
    fetch('https://api.chucknorris.io/jokes/categories')
    .then(response => response.json())
    .then(data => displayCategoriesSelect(data))
}



function getData(categ) {
    var url = '';
    if (categ == 'random') {
        url = 'https://api.chucknorris.io/jokes/random';
    }
    else {
        url = 'https://api.chucknorris.io/jokes/random?category=' + categ;
    }
    quoteLoading(false);
    fetch(url)
    .then(response => response.json())
    .then(data => displayData(data))
}

quoteLoading(true);
getCategory();
getData('random');


console.log('Script ended.');

