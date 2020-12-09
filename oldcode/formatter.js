function formatTelephone(text) {
    const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/;
    return text.replace(regex, '($1) $2-$3');
}

users[1].cell

function formatTelephone(text) {
    const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/;
    return text.replace(regex, '($1) $2-$3');
}



Replacement Value: $2 / $3 / $1

Value to Match On: (^\d{ 4 }) /((?<=/) \d{ 2 } (?= /))/(\d{ 2}$)