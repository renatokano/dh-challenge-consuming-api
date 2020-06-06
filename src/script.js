const BASE_URL = "https://newsapi.org/v2";
const API_KEY = "2dd0a520554a4f0ab545cf3181876aeb";
const COUNTRY = "br";

let categorySelected = 'lastNews';

let boardNews = document.getElementById('listaDeNoticias');

let lastNews = document.getElementById('ultimas');
let techNews = document.getElementById('tec');

lastNews.addEventListener('click', getLastNews);
techNews.addEventListener('click', getTechNews);

async function getNews(category=''){
  cleanScreen();

  link = category == '' 
    ? `${BASE_URL}/top-headlines?country=${COUNTRY}&apiKey=${API_KEY}`
    : `${BASE_URL}/top-headlines?country=${COUNTRY}&category=${category}&apiKey=${API_KEY}`
  
  let res = await fetch(link);
  let data = await res.json();
  
  data.articles.forEach(news => {
    let divCardContent = document.createElement("div");
    divCardContent.className = "col-4";

    let divCard = document.createElement("div");
    divCard.className = "card";

    let imgCard = document.createElement("img");
    imgCard.className = "card-img-top";
    imgCard.setAttribute('src', news.urlToImage);

    let divCardBody = document.createElement("div");
    divCardBody.className = "card-body";

    let titleCard = document.createElement("h5");
    titleCard.className = "card-title";
    titleCard.innerText = news.title;

    let textCard = document.createElement("p");
    textCard.className = "card-text";
    textCard.innerText = news.content;

    let linkCard = document.createElement("a");
    linkCard.className = "btn btn-primary";
    linkCard.setAttribute('href', news.url);
    linkCard.innerText = "Ir para notícia"

    divCardBody.appendChild(titleCard);
    divCardBody.appendChild(textCard);
    divCardBody.appendChild(linkCard);

    divCard.appendChild(imgCard);
    divCard.appendChild(divCardBody);

    divCardContent.appendChild(divCard);

    boardNews.appendChild(divCardContent);
  });
}

function getTechNews(){
  categorySelected = 'techNews';
  getNews('technology');
}

function getLastNews(){
  categorySelected = 'lastNews';
  getNews();
}

function cleanScreen(){
  boardNews.innerHTML = "";
}

window.onload = function(){
  getLastNews();
}