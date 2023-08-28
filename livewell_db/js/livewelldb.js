async function fetchMealPlan(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayMealPlan(data);
}

//call fetchMealPlan() with the url of the API
fetchMealPlan('app/select.php');



function displayMealPlan(data) {
    //select element from HTML to display data
    const display = document.querySelector('#display');
    display.innerHTML = '';

    //create a list to display data
    let ul = document.createElement('ul');

    data.forEach((user) => {
        // console.log(user);
        //create items, add text and append to list
        let li = document.createElement('li');
        li.innerHTML = `${user.meal_plan_id} ${user.meal_plan_name}.`;
        ul.appendChild(li);
    });

    //append list to display element
display.appendChild(ul);
}

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', getFormData); 

function getFormData(event) {
    event.preventDefault();

    //get form data & call an async function to post data to API
    const insertFormData = new FormData(document.querySelector('#insert-form'));
    let url = 'app/insert.php';
    inserter(insertFormData, url);
}

async function inserter(data, url) {
    const response = await fetch(url, {
        method: 'POST',
        body: data
    });
    const confirmation = await response.json(response);
    fetchMealPlan('app/select.php');
    console.log(confirmation);
}
   

