function sendAjaxQuery(url, data) {
console.log(data);
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            // no need to JSON parse the result, as we are using
            // dataType:json, so JQuery knows it and unpacks the
            // object for us before returning it
            var ret = dataR;
            // in order to have the object printed by alert
            // we need to JSON stringify the object
            document.getElementById('results').innerHTML= JSON.stringify(ret);
        },
        error: function (xhr, status, error) {

            alert('Error: ' + error.message);
        }
    });
}

function deleteData(buttonId) {
    var data={};
    data[1]= buttonId;
    var result = confirm("Are you sure you want to delete this character?");
    if(!result) {
       // event.preventDefault();
        return;
    }
    else {
        sendAjaxQuery('/delete', data);
    }

}

