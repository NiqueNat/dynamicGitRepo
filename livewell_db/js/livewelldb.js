

async function fetchMealPlan(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayMealPlan(data);
}

//call fetchMealPlan() with the url of the API
fetchMealPlan('app/select.php');



function displayMealPlan(data) {};