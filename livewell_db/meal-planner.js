const app_id = 'e3c5f034';
const app_key = 'd6a00af55b45f4e237917ee74e84d19e';
const apiUrl = `https://api.edamam.com/api/meal-planner/v1/${app_id}/select`;

const planDescriptor = {
  size: 2,
  plan: {
    accept: {
      all: [
        {
          health: ['VEGAN'],
        },
      ],
    },
    fit: {
      ENERC_KCAL: {
        min: 1800,
        max: 2200,
      },
      PROCNT: {
        min: 50,
        max: 300,
      },
    },
    sections: {
      Breakfast: {},
      Lunch: {
        sections: {
          Starter: {},
          Main: {},
          Dessert: {},
        },
      },
      Dinner: {
        sections: {
          Main: {},
          Dessert: {},
        },
      },
    },
  },
};

async function createDietaryPlan() {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Edamam-Account-User': 'YOUR_ACCOUNT_USER_ID', // If applicable
        Authorization: `Basic ${btoa(`${app_id}:${app_key}`)}`,
      },
      body: JSON.stringify(planDescriptor),
    });

    if (!response.ok) {
      throw new Error('Failed to create dietary plan');
    }

    const data = await response.json();
    console.log('Dietary Plan Created:', data);
    // Handle and display the dietary plan data in your app
  } catch (error) {
    console.error('Error creating dietary plan:', error);
    // Display error message to the user
  }
}

createDietaryPlan();
