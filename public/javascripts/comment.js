function submitComment(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            console.log(data);
            console.log("comment successful...");
            $('#commentsList').append(data.userName + ": comments: " + data.comments + "<br>");
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}


function onSubmitComments(url){
    var formArray= $("#commontForm").serializeArray();
    console.log(formArray);
    var data={
        animalId: "",
    };
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    data.animalId = getAnimalId('id');
    console.log(data);
    submitComment(url, data);
    event.preventDefault();
}

function getAnimalId(queryName) {
    var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if ( r != null ){
        return decodeURI(r[2]);
    }else{
        return null;
    }
}