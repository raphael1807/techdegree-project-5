// ------------------------------------------
// FETCH FUNCTIONS
// ------------------------------------------
const users = [];

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

fetchData('https://randomuser.me/api/?results=12&inc=picture,dob,name,cell,email,location&nat=US')
    .then(data => {
        console.log(data);
        for (let i = 0; i < data.results.length; i++) {
            generateCard(data.results[i]);
            users.push(data.results[i]);
            // console.log(users);
            // generatedModal(data.results[i]);
        }
    });

// .then(response => response.json())

// const imageLink = data.picture;
// const firstnameLink = data[0];
// const lastnameLink = data[0];
// const emailLink = data[0];
// const cityLink = data[0];
// const stateLink = data[0];

// generateOptions(breedList);
// generateImage(randomImage);s

// element.insertAdjacentHTML('beforeend', 'HTML string')

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

function generateCard(data) {
    const galleryOfCards = document.getElementById('gallery');
    galleryOfCards.insertAdjacentHTML('beforeEnd', `<div class= "card">
        <div class= "card-img-container">
        <img class="card-img" src="${data.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="card-text">${data.email}</p>
            <p class="card-text cap">${data.location.city}</p>
        </div>
        </div>`);
}


function generatedModal(data) {
    const galleryOfCards = document.getElementById('gallery');
    galleryOfCards.insertAdjacentHTML('afterEnd', `<div class="modal-container" style="display:none">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${data.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="modal-text">${data.email}</p>
            <p class="modal-text cap">${data.location.city}</p>
            <hr>
            <p class="modal-text">${data.cell}</p>
            <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.state}, ${data.location.postcode}</p>
            <p class="modal-text">Birthday: ${data.dob.date}</p>
        </div>
    </div>
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>`);
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

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
// Event listener if a card element is clicked

// document.querySelectorAll('div.card')[0].textContent.includes('Roger');

const cardsContainer = document.getElementById('gallery');
const allCards = document.querySelectorAll('div.card');
const allModals = document.querySelectorAll('div.modal-info-container');
const allCardNames = document.querySelectorAll('.card-name');
const allModalNames = document.querySelectorAll('.modal-name');

cardsContainer.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.className === "card") {
        for (let i = 0; i < allModalNames.length; i++) {
            if (e.target.textContent == allModalNames[i].textContent) {
                allModalNames[i].style.display = "block";
            }
        }
    }
});

// document.querySelector("div.modal-container").style.display = "none";

// Event listener if a card element is cliscked
const modalContainer = document.querySelector(".modal-container");
const closedButton = document.querySelector(".modal-close-btn");
closedButton.addEventListener('click', (e) => {
    console.log('called');
    modalContainer.style.display = "none";
});
// console.log(closedButton);

// ------------------------------------------
//  SEARCH MARKUP-EXCEEDS EXPECTATION
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


// ------------------------------------------
//  MODAL TOGGLE-EXCEEDS EXPECTATION
// ------------------------------------------

//     // IMPORTANT: Below is only for exceeds tasks 
//     <div class="modal-btn-container">
//         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//         <button type="button" id="modal-next" class="modal-next btn">Next</button>
//     </div>
// </div>
