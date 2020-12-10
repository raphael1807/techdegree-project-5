const cbox = document.querySelectorAll(".card");
const allModalNames = document.querySelectorAll('.modal-name');

for (let i = 0; i < cbox.length; i++) {
    cbox[i].addEventListener("click", (e) => {
        console.log('Hi');
        for (let i = 0; i < allModalNames.length; i++) {
            if (cbox[1].children[1].children[0].textContent == allModalNames[i].textContent) {
                console.log(e.target.textContent);
                console.log(allModalNames[i].textContent);
                allModalNames[i].style.display = "block";
            }
        }
    });
}




for (let i = 0; i < allModalNames.length; i++) {
    if (e.target.textContent == allModalNames[i].textContent) {
        console.log(e.target.textContent);
        console.log(allModalNames[i].textContent);
        allModalNames[i].style.display = "block";
    }


    function generateCardsAddListener() {
        console.log('BYE BYE CARDS');
        const cardsContainer = document.getElementById('gallery');
        const allCards = document.querySelectorAll('div.card');
        const allModals = document.querySelectorAll('div.modal-info-container');
        const allCardNames = document.querySelectorAll('.card-name');
        const allModalNames = document.querySelectorAll('.modal-name');

        cardsContainer.addEventListener('click', (e) => {
            if ((e.target.className === "card")) {
                console.log("called2");
                for (let i = 0; i < allModalNames.length; i++) {
                    if (e.target.textContent == allModalNames[i].textContent) {
                        console.log(e.target.textContent);
                        console.log(allModalNames[i].textContent);
                        allModalNames[i].style.display = "block";
                    }
                }
            }
        });
    }