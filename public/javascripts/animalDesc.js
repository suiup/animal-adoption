let comments = ["Apple"];
function drawCanvas(image){
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let img = document.getElementById(image);
    ctx.drawImage(img);
};

function addComment(){
    document.getElementById("form").hidden = true;
    let comment = document.getElementById("new-comment").value;
    comments.push(comment);
    console.log(comments);
    listComments();

    return false;
}

function listComments(){
    let result ="";
    comments.forEach(function(item){
       result += "<li>"+item+"</li>";
    });
    document.getElementById("commentList").innerHTML = result;
}
