//to display resluts in a chart we need to use the chart.js library.


// Function to fetch data and generate the graph
// async function fetchAndGenerateGraph(url) {
//     const response = await fetch(url);
//     const data = await response.json();

//     // Process the data to generate the graph
//     const mealPlanData = processDataForGraph(data);

//     // Generate the graph using Chart.js
//     generateGraph(mealPlanData);
// }

// // Call fetchAndGenerateGraph() with the URL of the API
// fetchAndGenerateGraph('app/select.php');

// // Process the data for generating the graph
// function processDataForGraph(data) {
//     const mealPlanCounts = {}; // Store meal plan counts

//     data.forEach(user => {
//         const mealPlan = user['meal_plan'];
//         if (mealPlanCounts[mealPlan]) {
//             mealPlanCounts[mealPlan]++;
//         } else {
//             mealPlanCounts[mealPlan] = 1;
//         }
//     });

//     // Convert data to a format suitable for Chart.js
//     const labels = Object.keys(mealPlanCounts);
//     const dataValues = Object.values(mealPlanCounts);

//     return {
//         labels: labels,
//         data: dataValues
//     };
// }

// // Generate the graph using Chart.js
// function generateGraph(data) {
//     const graphArea = document.querySelector('#graph');

//     // Create a canvas element for the graph
//     const canvas = document.createElement('canvas');
//     canvas.width = 400; // Set the desired width
//     canvas.height = 400; // Set the desired height

//     graphArea.appendChild(canvas);

//     // Create a pie chart using Chart.js
//     new Chart(canvas, {
//         type: 'pie',
//         data: {
//             labels: data.labels,
//             datasets: [{
//                 data: data.data,
//                 backgroundColor: [
//                     '#FF5733',
//                     '#33FF6B',
//                     '#339CFF',
//                     // Add more colors as needed
//                 ]
//             }]
//         }
//     });
// }




        const ctx = document.getElementById('myChart');
      
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
