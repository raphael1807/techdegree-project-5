const select = document.getElementById('breeds');
const card = document.querySelector('.card');
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

Promise.all([
    fetchData('https://dog.ceo/api/breeds/list'),
    fetchData('https://dog.ceo/api/breeds/image/random')
])
    .then(data => {
        const breedList = data[0].message;
        const randomImage = data[1].message;

        generateOptions(breedList);
        generateImage(randomImage);
    })

// Function to fetch the Data from a URL
function fetchData(url) {
    return fetch(url)
        // Calls the function to check the status of the request
        .then(checkStatus)
        // It returns a promise that resolves with the result of parsing the body text as JSON.
        .then(res => res.json())
        // If an error happens, it console.logs the error
        .catch(error => console.log('Looks like there was a problem!', error))
}

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
    // The ok read-only property of the Response interface contains a Boolean stating whether the response was successful (status in the range 200-299) or not.
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        // If an error happens, it console.logs the error
        return Promise.reject(new Error(response.statusText));
    }
}

// Function to generate the list to chose from in the dropdown
function generateOptions(data) {
    // The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
    const options = data.map(item => `
    <option value='${item}'>${item}</option>
  `).join('');
    //   The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.
    select.innerHTML = options;
}

function generateImage(data) {
    const html = `
    <img src='${data}' alt>
    <p>Click to view images of ${select.value}s</p>
  `;
    card.innerHTML = html;
}

function fetchBreedImage() {
    const breed = select.value;
    const img = card.querySelector('img');
    const p = card.querySelector('p');

    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(data => {
            img.src = data.message;
            img.alt = breed;
            p.textContent = `Click to view more ${breed}s`;
        })
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);
form.addEventListener('submit', postData);

// ------------------------------------------
//  POST DATA
// ------------------------------------------

function postData(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, comment })
    }

    fetch('https://jsonplaceholder.typicode.com/comments', config)
        .then(checkStatus)
        .then(res => res.json())
        .then(data => console.log(data))
}
