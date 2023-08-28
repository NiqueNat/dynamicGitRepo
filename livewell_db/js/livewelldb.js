async function fetchMealPlan(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayMealPlan(data);
    updateChart(data); // Call the function to update the chart
}

// Call fetchMealPlan() with the url of the API
fetchMealPlan('app/select.php');

function displayMealPlan(data) {
    const display = document.querySelector('#display');
    display.innerHTML = '';

    let ul = document.createElement('ul');

    data.forEach((user) => {
        let li = document.createElement('li');
        li.innerHTML = `${user.meal_plan_id} ${user.meal_plan_name}.`;
        ul.appendChild(li);
    });

    display.appendChild(ul);
}

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', getFormData);

async function getFormData(event) {
    event.preventDefault();

    const insertFormData = new FormData(document.querySelector('#insert-form'));
    let url = 'app/insert.php';
    await inserter(insertFormData, url); // Wait for inserter to complete
    fetchMealPlan('app/select.php');
}

async function inserter(data, url) {
    const response = await fetch(url, {
        method: 'POST',
        body: data
    });
    const confirmation = await response.text();
    console.log(confirmation);
}

// This function updates the chart
function updateChart(data) {
    const mealPlanCounts = {}; // Count occurrences of each meal plan

    data.forEach((user) => {
        if (mealPlanCounts[user.meal_plan_name]) {
            mealPlanCounts[user.meal_plan_name]++;
        } else {
            mealPlanCounts[user.meal_plan_name] = 1;
        }
    });

    const labels = Object.keys(mealPlanCounts);
    const counts = Object.values(mealPlanCounts);

    // Update the chart using Chart.js
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Meal Plan Counts',
                data: counts,
                backgroundColor: 'blue'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}




