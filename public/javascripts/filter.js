function sendAjaxQuery(data) {
    $.ajax({
        url: '/filter',
        data: data,
        type: 'Get',
        success: function (dataR) {
            // no need to JSON parse the result, as we are using
            // dataType:json, so JQuery knows it and unpacks the
            // object for us before returning it
            let ret = dataR;
            console.log(ret);
            // in order to have the object printed by alert
            // we need to JSON stringify the object
            $('#animalData').html(ret);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

$(function () {
    $('.form-check-input').change(function () {
        var hrefVar =window.location.search;
        var search = hrefVar.substring(hrefVar.indexOf('=') + 1);
        var data = {
            breed: [],
            location: [],
            search: search
        };
        $('.breed').each(function () {
            if (this.checked) {
                data.breed.push($(this).val())
            }
        });
        $('.location').each(function () {
            if (this.checked) {
                data.location.push($(this).val())
            }
        });
        sendAjaxQuery(data);
    });
});