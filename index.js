//carousell with desserts
const gap=1

 const slides = document.getElementById('dessert-slides')
 let previous = document.getElementById('previous')
 let next = document.getElementById('next')

 previous.addEventListener('click', e => {
     slides.scrollBy(-(width + gap), 0)
 } )

 next.addEventListener('click', e => {
     slides.scrollBy(width + gap, 0)
 } )

 let width = slides.offsetWidth;
 window.addEventListener("resize", e => (width = slides.offsetWidth));
 const slide = document.getElementById('dessert-slides');
//Getting Recepies in the carousel
 fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
   .then((response) => response.json())
   .then((result) => {
     let html="";
     if(result.meals){
         result.meals.forEach(meal =>{
             html +=`<div class="dessert-meal"  result-id = "${meal.idMeal}">
             <div class="dessert-meal-picture">
                 <img src="${meal.strMealThumb}" class="food-picture" alt="food-picture">
             </div>
             <div class="dessert-meal-name">
                 <h4>${meal.strMeal}</h4>
                 <a href="recipe.html?id=${meal.idMeal}" class="recipe-button" class="a">Get Recipe</a>
             </div>
         </div>`;

         });



     }
     slide.innerHTML=html;

   })

 const button = document.getElementById('button')
 const mealList = document.getElementById('meal');
 const carousel = document.getElementById('carousel')
 const recipeButton = document.getElementsByClassName('recipe-button')

 // Searchresults
 button.addEventListener('click', getMealList);
 function getMealList (){
  let searchText = document.getElementById('recipe-search').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
  .then((response) => response.json())
  .then((result) => {
    let html= "";
    if(result.meals){
      result.meals.forEach(meal =>{
        html +=`
         <div class = "meal" result-id = "${meal.idMeal}">
                <div class="meal-picture">
                    <img src="${meal.strMealThumb}" alt = "food-picture">
                </div>
                <div class="meal-name">
                    <h2>${meal.strMeal}</h2>
                    <a href="recipe.html?id=${meal.idMeal}" class="recipe-button">Get Recipe</a>
                </div>
            </div>
            `;
          });
          carousel.parentNode.removeChild(carousel);//Removing the carousell when making a search
          document.getElementById('search-result-text').style='display:block'

    } else {
      html ="No meals found";
      mealList.classList.add('notFound');
    }
    mealList.innerHTML=html;
 });

 }
