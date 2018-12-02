// need train Name, Destination, First Train Time, Frequency
// Calculage when next train arrives
// 

function addTrainButtonClick() {
    console.log("Clicked Add Train Button.");

    // TODO grab info from fields and do stuff
    fieldData = getAddTrainFields();
    console.log(fieldData);

    resetInputFields();
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

$(document).on("click", "#addTrain", addTrainButtonClick);