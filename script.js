
const search= document.getElementById('search');
const submit= document.getElementById('submit');
const random= document.getElementById('random');
const mealel= document.getElementById('meals');
const result =document.getElementById('result');
const smeal=document.getElementById('single-meal');



function searchmeal(e){
    e.preventDefault();
      
    smeal.innerHTML="";
 const val=search.value;

 if(val.trim()){
     fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`).then((res)=> res.json())
     .then((data)=> {
         console.log(data);
         result.innerHTML = `<h2 >Search Result for ${val}</h2>`;

         if(data.meal ===null){
             result.innerHTML=`<h2>No Result For${val}</h2>`;
         }
         else{
            mealel.innerHTML=data.meals.map(
                 (meal)=>`
                            <div class="meal">
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                
                                </div>
                            </div>
                            `
             )
             .join("");
         }
     });
 }

}


function getMealById(mealID){
    mealel.innerHTML="";
    result.innerHTML="";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res =>res.json())
    .then(data=>{
        const meal = data.meals[0];
        addMealToDOM(meal);
    });
}
 
function addMealToDOM(meal){
    const ingredients = [];
    for (let i=1; i<=20; i++)
    {
        if(meal[`strIngredient${i}`])
        {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${
                    meal[`strMeasure${i}`]
                }`
            );
        }else{
            break;
        }
    }


    smeal.innerHTML=`
    <div class="single-meal">
    <h1>${meal.strMeal}</h1><br>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}/>
    <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>`: ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>`:''}
    </div>
    <div class="main">
    <br><br><p>${meal.strInstructions}</p><br><br>
    <h2>! Ingredients</h2><br>
    <ul>
     ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
    </div>
    </div>
    `;

}


submit.addEventListener('submit',searchmeal);

mealel.addEventListener('click',e=>{
    
    
    const mealInfo = e.path.find(item=>{
    if(item.classList){
        return item.classList.contains("meal-info");
    }
    else{
        return false;
    }
    });
    if(mealInfo){
        const mealID = mealInfo.getAttribute("data-mealid");
        getMealById(mealID);
    }    
});
///////////////////////////////
function createMeal(meal){
    const ingredients = [];
    for (let i=1; i<=20; i++)
    {
        if(meal[`strIngredient${i}`])
        {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${
                    meal[`strMeasure${i}`]
                }`
            );
        }else{
            break;
        }
    }
    smeal.innerHTML=`
    <div class="single-meal">
    <h1>${meal.strMeal}</h1><br>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}/>
    <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>`: ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>`:''}
    </div>
    <div class="main">
    <br><br><p>${meal.strInstructions}</p><br><br>
    <h2>! Ingredients</h2><br>
    <ul>
     ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
    </div>
    </div>`
}

random.addEventListener('click',()=>{
     mealel.innerHTML="";
     result.innerHTML = "";
           fetch('https://www.themealdb.com/api/json/v1/1/random.php')
           .then(res => res.json())
           .then(res =>{
            createMeal(res.meals[0])
        })
});



