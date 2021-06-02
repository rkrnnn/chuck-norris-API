console.log('main.js loadd');

var displayQuote = document.querySelector("#quote");
var displayCategories = document.querySelector("#categories");
var displayCategSelect = document.querySelector(".input-group");
var btnNewQuote = document.querySelector("#new-quote-btn");
var loadingGraphic = document.querySelector(".loading-graphic");
var categorySelect;


function getQuoteCall() {
    // categorySelect = document.querySelector("#categ-select");
    var categ = categorySelect.value;
    console.log(categ);
    getData(categ);

    btnNewQuote.disabled = true;
    loadingGraphic.style.display = '';
    displayQuote.innerText = '';
    displayQuote.parentElement.style.backgroundColor = '#1982c4b3';
    displayCategories.innerText = '';
}


function displayData(json) {
    btnNewQuote.disabled = false;
    loadingGraphic.style.display = 'none';
    displayQuote.parentElement.style.backgroundColor = '#1982C4';

    console.log('Data received.');
    console.log(json);
    console.log(json.value);
    displayQuote.innerText = json.value;
    displayCategories.innerText = json.categories;
}



function displayCategoriesSelect(json) {
    console.log('Categories data received.');
    console.log(json);

    categorySelect = document.createElement("SELECT");
    categorySelect.tagName = 'categ';
    categorySelect.id = 'categ-select';
    categorySelect.className = 'form-select';

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


    displayCategSelect.appendChild(categorySelect);
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
    fetch(url)
    .then(response => response.json())
    .then(data => displayData(data))
}


getCategory();
getData('random');


console.log('Script ended.');

