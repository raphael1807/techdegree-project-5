// ------------------------------------------
// FETCH FUNCTIONS
// ------------------------------------------

// element.insertAdjacentHTML('beforeend', 'HTML string')

// You can use the commented out markup below as a template
// for each of your Gallery items, but you must use JS to
// create and append them to the`gallery` div.

//     IMPORTANT: Altering the arrangement of the markup and the
// attributes used may break the styles or functionality.

// < div class="card" >
//     <div class="card-img-container">
//         <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
//     </div>
//         <div class="card-info-container">
//             <h3 id="name" class="card-name cap">first last</h3>
//             <p class="card-text">email</p>
//             <p class="card-text cap">city, state</p>
//         </div>
//     </div>

https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob


// Promise.all(
//     fetchData('https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob));


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

fetchData('https://randomuser.me/api/?results=12&inc=picture,name,email,location')
    .then(response => response.json())
    .then(data => console.log(data))

//     const imageLink = data.picture;
//     const firstnameLink = data[0];
//     const lastnameLink = data[0];
//     const emailLink = data[0];
//     const cityLink = data[0];
//     const stateLink = data[0];

//     // generateOptions(breedList);
//     // generateImage(randomImage);
// });


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateOptions(data) {
    const options = data.map(item => `
      <option value='${item}'>${item}</option>
    `).join('');
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
//  Create a modal window
// ------------------------------------------
// When any part of an employee item in the directory is clicked, a modal window should pop up with the following details displayed:
// Image
// Name
// Email
// City or location
// Cell Number--The formatting of the Cell Number should be (XXX) XXX-XXXX
// Detailed Address, including street name and number, state or country, and post code.
// Birthday--MM/DD/YYYY.
// Make sure there’s a way to close the modal window
// Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and 
// how it should be styled.
// NOTE: The formatting of the Cell Number should be (XXX) XXX-XXXX and the formatting of the Birthday should be MM/DD/YYYY.

// document.querySelector("div.modal-container").style.display = "none";

// function fetchData(url) {
//     return fetch(url)
//         .then(checkStatus)
//         .then(res => res.json())
//         .catch(error => console.log('Looks like there was a problem!', error))
// }


// Modal markup:

// You can use the commented out markup below as a template
// for your modal, but you must use JS to create and append 
// it to `body`.

// IMPORTANT: Altering the arrangement of the markup and the 
// attributes used may break the styles or functionality.

// <div class="modal-container">
//     <div class="modal">
//         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//         <div class="modal-info-container">
//             <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
//             <h3 id="name" class="modal-name cap">name</h3>
//             <p class="modal-text">email</p>
//             <p class="modal-text cap">city</p>
//             <hr>
//             <p class="modal-text">(555) 555-5555</p>
//             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//             <p class="modal-text">Birthday: 10/21/2015</p>
//         </div>
//     </div>

//     // IMPORTANT: Below is only for exceeds tasks 
//     <div class="modal-btn-container">
//         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//         <button type="button" id="modal-next" class="modal-next btn">Next</button>
//     </div>
// </div>

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateOptions(data) {
    const options = data.map(item => `
    <option value='${item}'>${item}</option>
  `).join('');
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
            img.src = data;
            img.alt = breed;
            p.textContent = `Click to view more ${breed}s`;
        })
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
// Event listener if a card element is clicked
const card = document.querySelector('div.card');
card.addEventListener('click', fetchBreedImage);

// document.querySelector("div.modal-container").style.display = "none";

// Event listener if a card element is cliscked
const closedButton = document.querySelector(".modal-container");
closedButton.addEventListener('click', (e) => closedButton.style.display = "none");
// console.log(closedButton);

// ------------------------------------------
//  Search container
// ------------------------------------------

// Search markup: 

// You can use the commented out markup below as a template
// for your search feature, but you must use JS to create and 
// append it to `search-container` div.

// IMPORTANT: Altering the arrangement of the markup and the 
// attributes used may break the styles or functionality.

// <form action="#" method="get">
//     <input type="search" id="search-input" class="search-input" placeholder="Search...">
//     <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
// </form>

