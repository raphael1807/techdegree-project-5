function formatTelephone(text) {
    const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/;
    return text.replace(regex, '($1) $2-$3');
}

users[1].cell

function formatDate(text) {
    const regex = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
    return text.replace(regex, '$2/$3/$1');
}





for (let i = 0; i < users.length; i++) {
    formatDate(users[i]);
}



function formatTelephone(text) {
    const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/;
    const formattedTelephone = text.replace(regex, '($1) $2-$3');
    this.cell = formattedTelephone
}

function formatDate(text) {
    const textSliced = text.slice(0, 10);
    console.log(textSliced);
    const regex = /^(\d{4})\-(\d{1,2})\-(\d{1,2})$/;
    const textModified = textSliced.replace(regex, '$2/$3/$1');
    console.log(textModified);
    this.dob.date = textModified;
}












Replacement Value: $2 / $3 / $1

Value to Match On: (^\d{ 4 }) /((?<=/) \d{ 2 } (?= /))/(\d{ 2}$)


const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

/^\d{1,2}\/\d{1,2}\/\d{4}$/;


^\d{ 4 } \/\d{1,2}\/\d{1,2}$

    /^\d{ 4 } \-\d{ 1, 2 } \-\d{ 1, 2 } $ /


