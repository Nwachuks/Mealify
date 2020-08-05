const search = document.getElementById('search'),
submit = document.getElementById('submit'),
random = document.getElementById('random'),
mealsElement = document.getElementById('meals'),
resultHeading = document.getElementById('result-heading'),
singleMealElement = document.getElementById('single-meal');

// Search for meal and fetch from API
function searchMeal(e) {
    e.preventDefault();

    // Clear single meal
    singleMealElement.innerHTML = '';

    // Get search item
    const searchTerm = search.value;

    // Check if empty
    if (searchTerm.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search Results for '${searchTerm}':</h2>`

                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search results. Please try another search term</p>`;
                } else {
                    mealsElement.innerHTML = data.meals.map(meal =>
                        `<div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>`
                    ).join('');
                }

                // Clear search text
                search.value = '';
            });
    } else {
        alert('Please enter a search term');
    }
}

// Event listeners
submit.addEventListener('submit', searchMeal);
