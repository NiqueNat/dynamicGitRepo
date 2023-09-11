let myChart;
document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.querySelector('#submit');
  submitButton.addEventListener('click', getFormData);

  function createInitialChart() {
    const ctx = document.getElementById('mealPlanDistributionChart').getContext('2d');
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Meal Plan Counts',
          data: [], // Initialize data as an empty array
          backgroundColor: 'blue',
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

async function getFormData() {
  const fullName = document.querySelector('#full_name').value;
  const email = document.querySelector('#email').value;
  const mealPlan = document.querySelector('#meal_plan').value;

  const data = `full_name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&meal_plan=${encodeURIComponent(mealPlan)}`;

  try {
    const response = await fetch('./insert.php', {
      method: 'POST', // Change the request method to POST
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    });

    console.log('Response Status:', response.status); // Log the response status
    console.log('Response Headers:', response.headers); // Log the response headers

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType); // Log the content type

    if (contentType && contentType.indexOf('application/json') !== -1) {
      const responseData = await response.json();
      console.log('JSON Data:', responseData); // Log the JSON data

      // Check if the response indicates success
      if (responseData.success) {
        // Data was inserted successfully, you can perform any necessary actions here.
        console.log(responseData.message);

        // Update the chart with meal plan data
        updateChart(responseData.mealPlanData);
      } else {
        console.error('Error:', responseData.message);
      }
    } else {
      throw new Error('Oops, we haven\'t got JSON!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function updateChart(mealPlanData) {
  if (mealPlanData) {
    const labels = mealPlanData.map((item) => item.meal_plan);
    const counts = mealPlanData.map((item) => item.count);

    myChart.data.labels = labels;
    myChart.data.datasets[0].data = counts;
    myChart.update();
  } else {
    console.error('No mealPlanData provided in the response');
  }
}

// Rest of your code...
