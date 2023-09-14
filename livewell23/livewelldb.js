//iniating the chart
let myChart;
document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.querySelector('#submit');
  submitButton.addEventListener('click', getFormData);

  // updates the chart with the data entered by the user,initializes a new Chart object using the Chart.js library and sets the chart type to 'bar'. 
  function createInitialChart() {
    const ctx = document.getElementById('mealPlanDistributionChart').getContext('2d');
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Meal Plan Counts',
          data: [], // Initialize data as an empty array
          backgroundColor: '#23d5ab',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  createInitialChart();
});

//database call, inserting data into the database
async function getFormData() {
  const fullName = document.querySelector('#full_name').value;
  const email = document.querySelector('#email').value;
  const mealPlan = document.querySelector('#meal_plan').value;

  const data = `full_name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&meal_plan=${encodeURIComponent(mealPlan)}`;

  try {
    const response = await fetch('./insert.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    });

    //chesking if the response is ok
    console.log('Response Status:', response.status); // Log the response status
    console.log('Response Headers:', response.headers); // Log the response headers

    //checking if the response is ok
    if (!response.ok) throw new Error('Network response was not ok');

    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType); // Log the content type

    const responseBody = await response.text(); // Read the response body as text
    console.log('Response Body:', responseBody); // Log the response body

    let responseData; // Variable to store the JSON response data

    // Checking if the response content type is JSON
    if (contentType && contentType.indexOf('application/json') !== -1) {
      responseData = JSON.parse(responseBody); // Parse JSON response data
      console.log('JSON Data:', responseData); // Log the JSON data
      updateChart(responseData);
    } else {
      throw new Error('Oops, we haven\'t got JSON!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

//updates the chart with the data entered by the user
function updateChart(data) {
  if (data?.success && data?.mealPlanData) {
    const labels = data.mealPlanData.map((item) => item.meal_plan);
    const counts = data.mealPlanData.map((item) => item.count);

    myChart.data.labels = labels;
    myChart.data.datasets[0].data = counts;
    myChart.update();
  } else if (!data?.success) {
    console.error('Unsuccessful response received: ', data?.error || 'No error message provided');
  } else {
    console.error('Unexpected response data format: ', data || 'No data provided');
  }
}

// Activity Calorie Counter Code
//creates the form
const openFormBtn = document.getElementById('openFormBtn');
const formModal = document.getElementById('formModal');
const closeFormBtn = document.getElementById('closeFormBtn');

const resultModal = document.getElementById('resultModal');
const closeResultBtn = document.getElementById('closeResultBtn');

// Open the form modal
openFormBtn.onclick = function () {
  formModal.style.display = 'block';
};

// Close the form modal
closeFormBtn.onclick = function () {
  formModal.style.display = 'none';
};

// Close the results modal
closeResultBtn.onclick = function () {
  resultModal.style.display = 'none';
};

//building the form, adding the event listener
const form = document.getElementById('exercise-form');
const resultsList = document.getElementById('results-list');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the form data
  try {
    const weight = document.getElementById('weight-input').value;
    const duration = document.getElementById('duration-input').value;
    const activity = document.getElementById('activity-input').value;

    const url = `https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}&weight=${weight}&duration=${duration}`;

    const response = await fetch(url, {
      headers: {
        'X-Api-Key': 'OiPSiafhj0bRTltU0NE9uA==7NujYvqQNPjCP14V', 
      },
    });

    // Checking if the response is ok
    if (!response.ok) {
      throw new Error('Error fetching calories burned data');
    }

    const data = await response.json();

    // Checking if the response is an array and has data
    if (Array.isArray(data) && data.length > 0) {
      resultsList.innerHTML = '';
      data.forEach((entry) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <p>Activity: ${entry.name}</p>
          <p>Calories Per Hour: ${entry.calories_per_hour}</p>
          <p>Duration: ${entry.duration_minutes} minutes</p>
          <p>Calories Burned: ${entry.total_calories ? entry.total_calories.toFixed(2) : 'N/A'}</p>
        `; //rounds the number to a whole number

        // Create a list item
        resultsList.appendChild(listItem);
      });
      formModal.style.display = 'none'; // Hide the form modal
      resultModal.style.display = 'block'; // Show the result modal
    } else {
      resultsList.innerHTML = 'Calories Burned data not available.';
      formModal.style.display = 'none'; // Hide the form modal
      resultModal.style.display = 'block'; // Show the result modal
    }
  } catch (error) {
    console.error('Error fetching calories burned data:', error);
    resultsList.innerHTML = 'Error fetching data. Please try again.';
    formModal.style.display = 'none'; // Hide the form modal
    resultModal.style.display = 'block'; // Show the result modal
  }
});


//a modal is created to display the results, with a button to close it. Using the modal allowed me to incorarate the code from the code snippet activity-counter-api/hold.txt.
//https:www.google.com/url?sa=i&rct=j&q=&esrc=s&source=web&cd=&ved=0CAIQw7AJahcKEwjQpp_yqamBAxUAAAAAHQAAAAAQAg&url=https%3A%2F%2Fwww.w3schools.com%2Fcss%2Fcss_boxmodel.asp&psig=AOvVaw3sUtoJMvAcK2DHfOovK2_Q&ust=1694754288071834&opi=89978449//