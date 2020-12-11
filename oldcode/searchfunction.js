/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


// Global Variables
let ulStudent = document.querySelector('.student-list');
let ulLink = document.querySelector('.link-list');
let header = document.querySelector('.header');

/* Numbers of items displayed per page */
const itemsPerPage = 9;

// This function will create and insert/append the elements needed to display a "page" of nine students
function showPage(list, page) {
    // Variables to store the start index and the end index of the list items to be displayed on the given page.
    const startIndex = (page * itemsPerPage) - itemsPerPage;
    const endIndex = page * itemsPerPage;

    ulStudent.innerHTML = "";
    // Loop over the list parameter
    for (let i = 0; i < list.length; i += 1) {
        // Conditional statement that checks if the current index (i) is greater than or equal to the start index variable and less than the end index variable.
        if (i >= startIndex && i < endIndex) {
            ulStudent.insertAdjacentHTML("beforeend",
                `<li class="student-item cf">
                    <div class="student-details">
                        <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                        <h3> ${list[i].name.first} ${list[i].name.last} </h3>
                        <span class="email"> ${list[i].email}</span>
                    </div>
                    <div class="joined-details">
                        <span class="date">${list[i].registered.date}</span>
                    </div>
                </li> `);
        }
    }
}

// This function will create and insert/append the elements needed for the pagination buttons
function paginationButtons(list) {

    // Create a variable to store the value of the number of pagination buttons needed.
    const numberOfPagination = (Math.ceil(list.length / itemsPerPage));

    ulLink.innerHTML = "";

    // Loop over the variable for the number of pages needed that you created earlier
    for (let i = 0; i < numberOfPagination; i += 1) {

        // First pagination button with a class name of active.
        if (i == 0) {
            ulLink.insertAdjacentHTML("beforeend",
                `<li>
          <button class='active' type="button">${i + 1}</button>
        </li >`);
        }
        else {
            ulLink.insertAdjacentHTML("beforeend",
                `<li>
              <button type="button">${i + 1}</button>
            </li >`);
        }
    }
    // Event listener to listen for clicks on the link-list variable 
    ulLink.addEventListener('click', (e) => {
        let eventTarget = e.target;
        // Click event only fire when the buttons are clicked. 
        if (eventTarget.tagName === 'BUTTON') {
            // Active class from any other pagination button.
            document.querySelector('.active').className = '';
            // Active class added to the pagination button that was just clicked.
            e.target.className = 'active';
            // Call the showPage function passing the list parameter and the page number to display as arguments.
            showPage(list, eventTarget.textContent);
        }
    });
}


// Call functions
// Call the first function you created to display a “page”, passing in the data variable and 1 as arguments.
showPage(data, 1);

// Call the second function you created to add pagination buttons, passing the data variable as an argument.
paginationButtons(data);



// 
// 
// 
// Extra
header.insertAdjacentHTML("beforeend",
    `<label for="search" class="student-search">
        <input id="search" placeholder="Search by name...">
        <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>`);

const search = document.querySelector('#search');
const searchLabel = document.querySelector('.student-search');
const searchButton = searchLabel.querySelector('[type="button"]');


function searchStudents(searchInput, students) {
    ulStudent.innerHTML = "";
    ulLink.innerHTML = "";
    // Creates a new empty array of objects 
    let data2 = [];

    // Loops every objects of the array students
    students.forEach(function (person) {

        // If searchInput = Empty, calls the initial functions
        if (searchInput.value.length == 0) {
            showPage(data, 1);
            paginationButtons(data);
        }

        // If searchInput is not empty and objects of the array includes values of the searchInput:
        else if (searchInput.value.length != 0 && ((person.name.first.toLowerCase().includes(searchInput.value.toLowerCase())) || (person.name.last.toLowerCase().includes(searchInput.value.toLowerCase())))) {
            // objects are added to the array
            data2.push(person);
            // objects of the arrays who meet the search input are displayed
            showPage(data2, 1)
            // number of pagination of button are added 
            paginationButtons(data2);
        }
    });
    // If the new array of objects is empty, it throws an error
    if (searchInput.value.length != 0 && data2.length === 0) {
        ulStudent.innerHTML = "";
        ulStudent.insertAdjacentHTML("beforeend", '<p>No results found</p>');
    }
}

/**
 * Event listeners for buttons - Invoke your search function in the body of the callbacks in the event listeners below
 */
/* submit listener */
searchButton.addEventListener('click', (event) => {
    // Invoke your search function here - Arguments: search, tableCells
    searchStudents(search, data);
});


/* submit listener */
search.addEventListener('keyup', () => {
    event.preventDefault();
    // Invoke your search function here - Arguments: search, tableCells
    searchStudents(search, data);
});