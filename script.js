//to display the path of the file selected
function displayFunc(){
    var fileInput = document.getElementById("input-file");
    var l = fileInput.value;
    document.getElementById("path-display").value = l;
}

function readFile(input){
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = ()=>{
    inputText = reader.result;
    document.getElementById("text-content").innerHTML = reader.result;
    let url1 = `https://api.textgears.com/spelling?key=zmeWUWHyKUYTqHFy&text=${inputText}&language=en-GB`;
    let req1 = new XMLHttpRequest();
    req1.open("GET",url1);
    req1.send();
    req1.onload = ()=>{
        let parsedResponse1 = JSON.parse(req1.response);
        console.log(parsedResponse1.response.errors.length);
        for(var i =0; i< parsedResponse1.response.errors.length; i++){
            console.log(parsedResponse1.response.errors[i].bad);
        }
    }
    reader.onerror = ()=>{
        console.log(reader.error);
    };
}
    
}
