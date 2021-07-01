const inputField = document.getElementById("input");
const searchResultsDiv = document.getElementById("search-results");

const getUrl = (text) =>
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`;

/*
  <article>
  <img src="https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"/>
  </article>
*/
function createArticle(drink) {
  const imageUrl = drink.strDrinkThumb;
  const instructions = drink.strInstructions;

  const article = document.createElement("article");
  const img = document.createElement("img");
  img.setAttribute("src", imageUrl);

  article.appendChild(img);

  article.addEventListener("click", function(event){
    alert(instructions);
  });

  return article;
}

let timer = null;

inputField.addEventListener("keyup", async function (event) {
  const value = event.target.value;
  const url = getUrl(value);

  searchResultsDiv.innerHTML = "";

  if (timer) {
    clearTimeout(timer);
    timer = null;
  }

  timer = setTimeout(async function () {
    const response = await fetch(url);
    const data = await response.json(); // object
    const drinks = data.drinks;         // array med object
    const articles = drinks.map(drink => createArticle(drink)); // gor om objecten till
                                                                // articles

    // loopa igenom alla artiklar vi skapat
    // och stoppa in dom i search-results diven.
    articles.forEach(function (articleElement) {
      searchResultsDiv.appendChild(articleElement);
    });
  }, 500);
});