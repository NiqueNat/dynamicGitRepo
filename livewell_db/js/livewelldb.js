// Fetch the chart canvas element
const chartCanvas = document.getElementById('myChart');

// Initialize the chart data with zeros
const initialChartData = {
  labels: ['Vegan', 'Vegetarian', 'Keto'],
  datasets: [
    {
      label: 'Meal Plans',
      data: [0, 0, 0],
      backgroundColor: ['red', 'green', 'blue'],
    },
  ],
};

// Create a Chart instance with initial data
const myChart = new Chart(chartCanvas, {
  type: 'bar',
  data: initialChartData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});

// Function to fetch and display meal plans
async function fetchMealPlan(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMealPlan(data);
  } catch (error) {
    console.error('Error fetching meal plans:', error);
  }
}

// Call fetchMealPlan() with the url of the API
fetchMealPlan('app/select.php');

// Display meal plans in the HTML
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

// Form submission handler
async function getFormData(event) {
  event.preventDefault();

  const insertFormData = new FormData(document.querySelector('#insert-form'));
  const url = 'app/insert.php';

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: insertFormData,
    });
    const data = await response.json();

    // Update chart data based on the meal plan received
    if (data.meal_plan === 'Vegan') {
      myChart.data.datasets[0].data[0] += 1;
    } else if (data.meal_plan === 'Vegetarian') {
      myChart.data.datasets[0].data[1] += 1;
    } else if (data.meal_plan === 'Keto') {
      myChart.data.datasets[0].data[2] += 1;
    }

    // Update the chart with the new data
    myChart.update();
  } catch (error) {
    console.error('Error submitting form:', error);
  }
}

// Attach the form submission event listener
const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', getFormData);


