const urlParams = new URLSearchParams(location.search);
const myParam = urlParams.get("id");

const fullRecipe = document.getElementById('recipe');

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${myParam}`)
  .then((response) => response.json())
  .then((result) => {
    let html="";
    if(result.meals){
        let meal = result.meals[0];
        let count = 1;
        let ingredients = [];
        for (let i in meal) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && meal[i]) {
            ingredient = meal[i];
            measure = meal[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        result.meals.forEach(meal =>{
          let ingredientList = document.createElement("ul");
          ingredients.forEach(ingredient => {
            let ingredientListItem = document.createElement("li");
            ingredientListItem.textContent = ingredient;
            ingredientList.appendChild(ingredientListItem);
          });
          html +=`<div class="recipe" result-id = "${meal.idMeal}">
            <div>
                <h4 class="meal-name">${meal.strMeal}</h4>
            </div>
            <div class="meal-pic">
                <img class="pic" src="${meal.strMealThumb}"  alt="food-picture">
            </div>
            <div id="recipe-box">
            <h5 class="ingredient-text"> Ingredients:</h5>
            ${ingredientList.outerHTML}
            <h5 class="ingredient-text"> Instructions:</h5>
                <p> ${meal.strInstructions}"</p>
            </div>
          </div>`;
        });
    }
    fullRecipe.innerHTML=html;
  })
