function sendAjaxQuery(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (dataR) {
            // no need to JSON parse the result, as we are using
            // dataType:json, so JQuery knows it and unpacks the
            // object for us before returning it
            let ret = dataR;
            // in order to have the object printed by alert
            // we need to JSON stringify the object
            document.getElementById('results').innerHTML= JSON.stringify(ret);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

function onSubmit(url){
    event.preventDefault();
    event.stopImmediatePropagation();
    var myForm = document.getElementById('xForm');
    var formData = new FormData(myForm);
    console.log(formData);
    sendAjaxQuery(url, formData);
    return false;
}


function onSubmitAd() {
    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    console.log(data);
    // const data = JSON.stringify($(this).serializeArray());
    sendAjaxQuery('/index', data);
    event.preventDefault();
}