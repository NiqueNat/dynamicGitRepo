//to display resluts in a chart we need to use the chart.js library.

// Get the canvas element
const ctx = document.getElementById('chartCanvas').getContext('2d');

// Create a bar chart
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Vegan', 'Vegetarian', 'Keto'],
        datasets: [{
            label: 'Meal Plans',
            data: [20, 15, 10],
            backgroundColor: ['red', 'green', 'blue']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});
