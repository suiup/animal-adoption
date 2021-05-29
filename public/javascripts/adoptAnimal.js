function submitAdopt(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            var err_code = data.error_code;
            console.log(err_code);
            if(err_code === 1){
                //login first
                alert(data.message);
            }else{
                window.location.href = '/thanks'
            }
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}


function onSubmitAdopt(url){
    var formArray= $("#adoptForm").serializeArray();
    var data={
        animalId: ""
    };
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    data.animalId = getQueryValue('id');
    submitAdopt(url, data);
    event.preventDefault();

}

function getQueryValue(queryName) {
    var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if ( r != null ){
        return decodeURI(r[2]);
    }else{
        return null;
    }
}