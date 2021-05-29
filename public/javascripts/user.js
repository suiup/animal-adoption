function userRegistory(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            var err_code = data.error_code;
            console.log(err_code);
            console.log(data);
            if(err_code === 0){
                //register successful
                window.location.href = '/'
            }else if(err_code === 1){
                $('#registerAlert').text('');
                $('#registerAlert').append('username has already exist');
            }else if(err_code === 500){
                $('#registerAlert').text('');
                $('#registerAlert').append('server is busy, have a try later');
            }
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

function userLogin(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            var err_code = data.error_code;
            console.log(data);
            console.log(err_code);
            if(err_code === 0){
                window.location.href = '/'
            }else if(err_code === 1){
                $('#loginAlert').text('');
                $('#loginAlert').append('username or password is wrong');
            }else if(err_code === 500){
                $('#loginAlert').text('');
                $('#loginAlert').append('server is busy, have a try later');
            }
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

function register(url){
    var formArray= $("#registerForm").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    userRegistory(url, data);
    event.preventDefault();
}

function login(url){
    var formArray= $("#loginForm").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    userLogin(url, data);
    event.preventDefault();
}