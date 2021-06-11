function sendAjaxQuery(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (dataR) {
            window.location.href = "/"
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
    console.log("myForm", myForm);
    var formData = new FormData(myForm);
    console.log("formData", formData);
    sendAjaxQuery(url, formData);
    return false;
}