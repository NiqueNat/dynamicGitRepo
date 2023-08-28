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
    const ctx = document.getElementById('myChart').getContext('2d'); // Use 'myChart' instead of 'chartCanvas'
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



