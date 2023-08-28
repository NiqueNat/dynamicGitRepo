// livewelldb.js

// Function to update the pie chart with data
function updateChartWithData(data) {
    const mealPlanCounts = {};
    
    // Count occurrences of each meal plan
    data.forEach((user) => {
        if (mealPlanCounts[user.meal_plan_name]) {
            mealPlanCounts[user.meal_plan_name]++;
        } else {
            mealPlanCounts[user.meal_plan_name] = 1;
        }
    });

    const labels = Object.keys(mealPlanCounts);
    const counts = Object.values(mealPlanCounts);

    // Update the pie chart using Chart.js
    const ctx = document.getElementById('mealPlanDistributionChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: counts,
                backgroundColor: [
                    'red', 'blue', 'green', // Add more colors as needed
                ],
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
}

// Function to fetch and display chart data
async function fetchAndDisplayChartData() {
    try {
        const response = await fetch('app/select.php');
        const data = await response.json();
        updateChartWithData(data);
    } catch (error) {
        console.error('Error fetching chart data:', error);
    }
}

// Function to handle form submission
async function getFormData(event) {
    event.preventDefault();

    const insertForm = document.querySelector('#insert-form');
    const formData = new FormData(insertForm);
    const mealPlan = insertForm.querySelector('select[name="meal_plan"]').value;

    // Append the meal plan value to the form data
    formData.append('meal_plan', mealPlan);

    let url = 'app/insert.php';
    await inserter(formData, url); // Wait for inserter to complete
    fetchMealPlan('app/select.php');

    // Display the selected meal plan
    const selectedMealPlanContainer = document.getElementById('selectedMealPlan');
    selectedMealPlanContainer.textContent = `Selected Meal Plan: ${mealPlan}`;
}

// Add event listeners
const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', getFormData);

// Call the function to fetch and display chart data
fetchAndDisplayChartData();

// The rest of your existing code...






