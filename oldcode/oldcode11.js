// ------------------------------------------
// ARRAY OF OBJECTS
// ------------------------------------------
const users = [];

// ------------------------------------------
// FETCH FUNCTIONS
// ------------------------------------------

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

// API called
fetchData('https://randomuser.me/api/?results=12&inc=picture,dob,name,cell,email,location&nat=US')
    .then(data => {
        console.log(data);
        for (let i = 0; i < data.results.length; i++) {
            data.results[i].cell = formatTelephone(data.results[i].cell);
            data.results[i].dob.date = formatDate(data.results[i].dob.date);
            users.push(data.results[i]);
            generateCard(data.results[i]);
            generateModal(data.results[i]);
        }
        generateCardsAddListener();
    });

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

// Taken from the exercice Fetch API
// Check Promise status
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

// ------------------------------------------
//  FORMATTER FUNCTIONS
// ------------------------------------------

// Taken from the exercice Regular expressions in JavaScript, course: Reformatting a Telephone Number
function formatTelephone(text) {
    const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/;
    return text.replace(regex, '($1) $2-$3');
}

// Date formatter
function formatDate(text) {
    const textSliced = text.slice(0, 10);
    const regex = /^(\d{4})\-(\d{1,2})\-(\d{1,2})$/;
    return textSliced.replace(regex, '$2/$3/$1');
}

// ------------------------------------------
//  GENRATOR FUNCTIONS
// ------------------------------------------

// Generate cards from datas
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

// Generate modals function
function generateModal(data) {
    const galleryOfCards = document.getElementById('modal');
    galleryOfCards.insertAdjacentHTML('beforeEnd', `<div id="${[data.picture.large]}" class="modal-container" style="display:none">
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
//  EVENT LISTENER GENERATOR
// ------------------------------------------

// Generate cards event listener
function generateCardsAddListener() {
    const allCards = document.querySelectorAll(".card");
    const allModalNames = document.querySelectorAll('.modal-name');
    const allModals = document.querySelectorAll('div.modal-container');

    for (let i = 0; i < allCards.length; i++) {
        allCards[i].addEventListener("click", (e) => {
            for (let i = 0; i < allModals.length; i++) {
                if (e.currentTarget.children[1].children[0].textContent == allModalNames[i].textContent) {
                    allModals[i].style.display = "block";
                    generateModalAddListener();
                }
            }
        });
    }
}

// Generate modals close box event listener
function generateModalAddListener() {
    const allClosedModalButtons = document.querySelectorAll(".modal-close-btn");
    for (let i = 0; i < allClosedModalButtons.length; i++) {
        allClosedModalButtons[i].addEventListener("click", (e) => {
            e.currentTarget.parentNode.parentNode.style.display = "none";
        });
    }
}

// ------------------------------------------
//  SEARCH MARKUP-EXCEEDS EXPECTATION
// ------------------------------------------

// Creates the search box
const searchDiv = document.querySelector('div.search-container');
searchDiv.insertAdjacentHTML('beforeEnd', `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`);

// ------------------------------------------
//  SEARCH EVENT LISTENERS-EXCEEDS EXPECTATION
// ------------------------------------------

const searchInput = document.querySelector('#search-input');
const searchSubmit = document.querySelector('#search-submit');


// Keyup searchInput listener
searchInput.addEventListener('keyup', (event) => {
    searchUsers(searchInput, users);
});


// Search submit click listener
searchSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    searchUsers(searchInput, users);
});

// ------------------------------------------
//  SEARCH FUNCTION-EXCEEDS EXPECTATION
// ------------------------------------------

function searchUsers(searchInput, users) {
    const galleryDiv = document.querySelector('#gallery');
    galleryDiv.innerHTML = "";
    const modalDiv = document.querySelector('#modal');
    modalDiv.innerHTML = "";

    // Creates a new empty array of search results
    let usersSearchResults = [];

    // Loops every objects of the array students
    for (let i = 0; i < users.length; i++) {

        // If searchInput = Empty, calls the initial functions
        if (searchInput.value.length == 0) {
            generateCard(users[i]);
            generateModal(users[i]);
        }

        // If searchInput is not empty and objects of the array includes values of the searchInput:
        else if (searchInput.value.length != 0 && ((users[i].name.first.toLowerCase().includes(searchInput.value.toLowerCase())) || (users[i].name.last.toLowerCase().includes(searchInput.value.toLowerCase())))) {
            // objects are added to the array
            usersSearchResults.push(users[i]);
            // objects of the arrays who meet the search input are displayed
            generateCard(users[i]);
            generateModal(users[i]);
            generateCardsAddListener();
        }
    }
    // If the new array of objects is empty, it throws an error
    if (searchInput.value.length != 0 && usersSearchResults.length === 0) {
        galleryDiv.innerHTML = "";
        galleryDiv.insertAdjacentHTML("beforeend", '<p>No results found</p>');
    }
}

// ------------------------------------------
//  Previous/Next Event listener
// ------------------------------------------

function generatePrevNextEventListener() {
    const allPreviousModal = document.querySelectorAll('button.modal-prev');
    const allNextModal = document.querySelectorAll('button.modal-next');

    allPreviousModal.addEventListener('click', (e) => {
        alert("Previous!");
    });
    allNextModal.addEventListener('click', (e) => {
        alert("Next!");
    }); s
    // // Generate modals close box event listener
    // function generateModalAddListener() {
    //     const allModals = document.querySelectorAll('div.modal-container');
    //     for (let i = 0; i < allClosedModalButtons.length; i++) {
    //         allClosedModalButtons[i].addEventListener("click", (e) => {
    //             e.currentTarget.parentNode.parentNode.style.display = "none";
    //         });
    //     }
    // }

    // // Generate modals close box event listener
    // function generateModalAddListener() {
    //     const allModals = document.querySelectorAll('div.modal-container');
    //     for (let i = 0; i < allClosedModalButtons.length; i++) {
    //         allClosedModalButtons[i].addEventListener("click", (e) => {
    //             e.currentTarget.parentNode.parentNode.style.display = "none";
    //         });
    //     }
    // }
}

// // Generate cards event listener
// function generateCardsAddListener() {
//     const allPreviousButtons = document.querySelectorAll('button.modal-prev');
//     const allPreviousModal = document.querySelectorAll(".card");
//     const allModalNames = document.querySelectorAll('.modal-name');
//     const allModals = document.querySelectorAll('div.modal-container');

//     for (let i = 0; i < allPreviousButtons.length; i++) {
//         allPreviousButtons[i].addEventListener("click", (e) => {
//             for (let i = 0; i < allModals.length; i++) {
//                 if (e.currentTarget.children[1].children[0].textContent == allModalNames[i].textContent) {
//                     e.currentTarget.parentElement.style.display = "none";
//                     e.currentTarget.parentElement.style.display = "block";
//                     generateModalAddListener();
//                 }
//             }
//         });
//     }
// }