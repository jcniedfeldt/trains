// need train Name, Destination, First Train Time, Frequency
// Calculage when next train arrives
// 

const lsArrayKey = "trainArray";

function addTrainHTML(trainData) {
    trainshtml = $('#trains');
    // TODO: later will have to search for element to add new train after
    // TODO: check if train already exists (how to check for duplicates?)
    col = $("<div class='col-md-4'>");
    card = $("<div class='card'>");
    cardheader = $('<div class="card-header>"');
    cardheader.append($(`<h1><span class="name">${trainData.name}</span> - <span class="destination">${trainData.destination}</span></h1>`));
    cardbody = $('<div class="card-body>"');
    cardbody.append($(`<p>Frequency: <span class="frequency">${trainData.frequency}</span></p><p>Arrival Time: <span class="arrivalTime">${trainData.arrivalTime}</span></p>`))
    cardbody.append('<button class="button" class="btn btn-primary">Remove Train</button>');

    card.append(cardheader);
    card.append(cardbody);
    col.append(card);
    trainshtml.prepend(col);

}

function add2storage(trainData) {
    strData = JSON.stringify(trainData);
    console.log(strData)
    // check if object already exists
    if (localStorage.getItem(lsArrayKey) === null) {
        localStorage.setItem(lsArrayKey, JSON.stringify([]));
    }
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

function addTrainButtonClick() {
    console.log("Clicked Add Train Button.");
    trainError=$("#addTrainErrorMessage");
    trainSuccess=$("#addTrainSuccessMessage");
    // TODO grab info from fields and do stuff
    newTrainData = getAddTrainFields();
    if (!hasEmptyField(newTrainData)) {

        console.log(newTrainData);

        if (add2storage(newTrainData)) {
            addTrainHTML(newTrainData);
            resetInputFields();
            trainSuccess.text("Train added successfully!");
            trainError.attr("hidden",true);
            trainSuccess.attr("hidden",false);

        } else {
            // TODO display message that train already exists
            console.log("Train already exists.")
        }
    } else {
        // TODO print that all fields need to be filled.
        console.log("fields need to be filled")
        trainError.text("All fields need to be filled.");
        trainSuccess.attr("hidden",true);
        trainError.attr("hidden",false);
    }
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
}



$(document).on("click", "#addTrain", addTrainButtonClick);