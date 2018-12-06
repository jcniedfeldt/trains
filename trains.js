// need train Name, Destination, First Train Time, Frequency
// Calculage when next train arrives
// 

const lsArrayKey = "trainArray";

function addTrainHTML(trainData) {
    // TODO: later will have to search for element to add new train after
    // TODO: check if train already exists (how to check for duplicates?)
    datastr=JSON.stringify(trainData);
    console.log(datastr);
    col = $(`<div class='col-md-3 train'>`);
    card = $("<div class='card'>");
    cardheader = $('<div class="card-header">');
    cardheader.append($(`<h1><span class="name">${trainData.name}</span> - <span class="destination">${trainData.destination}</span></h1>`));
    cardbody = $('<div class="card-body">');
    cardbody.append(`<p>Frequency: <span class="frequency">${trainData.frequency}</span></p><p>Arrival Time: <span class="arrivalTime">${trainData.arrivalTime}</span></p>`);
    cardbody.append(`<button class="btn btn-primary removeTrain" data-str='${datastr}'>Remove Train</button>`);

    card.append(cardheader);
    card.append(cardbody);
    col.append(card);
    col.insertAfter('#addTrainCol');

}

function add2storage(trainData) {
    strData = JSON.stringify(trainData);
    console.log(strData)
    // check if object already exists
    initStorage();
    lsArray = JSON.parse(localStorage.getItem(lsArrayKey));
    console.log(lsArray)
    if (!lsArray.includes(strData)) {
        //add
        lsArray.push(strData);
        localStorage.setItem(lsArrayKey, JSON.stringify(lsArray));
        return true;
    }
    return false;
}

function initStorage() {
    if (localStorage.getItem(lsArrayKey) === null) {
        localStorage.setItem(lsArrayKey, JSON.stringify([]));
    }
}

function addTrainButtonClick() {
    console.log("Clicked Add Train Button.");
    // TODO grab info from fields and do stuff
    newTrainData = getAddTrainFields();
    if (!hasEmptyField(newTrainData)) {

        console.log(newTrainData);

        if (add2storage(newTrainData)) {
            addTrainHTML(newTrainData);
            resetInputFields();
            setSuccessMessage("Train added successfully!");

        } else {
            // TODO display message that train already exists
            console.log("Train already exists.")
        }
    } else {
        // TODO print that all fields need to be filled.
        console.log("fields need to be filled")
        setErrorMessage("All fields need to be filled.");
    }
}

function setSuccessMessage(message){
    trainError = $("#addTrainErrorMessage");
    trainSuccess = $("#addTrainSuccessMessage");

    trainSuccess.text(message);
    trainError.attr("hidden", true);
    trainSuccess.attr("hidden", false);
}

function setErrorMessage(message){
    trainSuccess = $("#addTrainSuccessMessage");
    trainError = $("#addTrainErrorMessage");

    trainError.text(message);
    trainError.attr("hidden", true);
    trainSuccess.attr("hidden", false);
}

function hasEmptyField(train) {
    for (key in train) {
        if (train[key] === "") {
            return true;
        }
    }
    return false;
}

function getAddTrainFields() {
    form = $('#addTrainForm');

    obj2ret = {
        name: form.find("#inputTrainName").val(),
        destination: form.find("#inputTrainDestination").val(),
        arrivalTime: form.find("#inputTrainTime").val(),
        frequency: form.find("#inputTrainFrequency").val(),
    }
    return obj2ret;
}

function resetInputFields() {
    $('#addTrainForm').get(0).reset()
}

function initTrains() {
    // TODO this section is for reading from local storage upon loading the page
    initStorage();
    lsArray = JSON.parse(localStorage.getItem(lsArrayKey));
    lsArray.forEach(trainStr => {
        trainData=JSON.parse(trainStr);
        addTrainHTML(trainData);
    });
}

function removeTrain(){

    lsArray = JSON.parse(localStorage.getItem(lsArrayKey));
    let index = lsArray.indexOf($(this).attr("data-str"));
    console.log(index);
    lsArray.splice(index,1);
    localStorage.setItem(lsArrayKey,JSON.stringify(lsArray));
    
    $(this).parent().parent().parent().remove();
}

function reset(){
    localStorage.setItem(lsArrayKey,"[]");
    $(".train").remove();
    setSuccessMessage("All trains reset.");
}

initTrains();

$(document).on("click", "#addTrain", addTrainButtonClick);
$(document).on("click", ".removeTrain", removeTrain);
$(document).on("click", "#reset", reset);