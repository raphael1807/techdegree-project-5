function getNext(currentItemIndex, myItemObjectArray)


currentItemIndex++;

var myItemObjectArray = [];
for (i = 0; i < 10; i++)
    myItemObjectArray.push({ itemId: i, itemName: "a" + i });
var currentItemIndex = 5;

function getPrevious() {
    currentItemIndex--; // the global variable
    show(currentItemIndex, myItemObjectArray);
}
function getNext() {
    currentItemIndex++; // the global variable
    show(currentItemIndex, myItemObjectArray);
}

function show(index, arr) {
    alert(arr[index].itemId + " " + arr[index].itemName);
}