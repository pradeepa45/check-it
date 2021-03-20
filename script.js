function displayFunc(){
    var fileInput = document.getElementById("input-file");
    var l = fileInput.value;
    document.getElementById("path-display").value = l;
    // console.log("name "+ l);
    const file = fileInput.file;
    // console.log(file);

    const fileSelector = document.getElementById('input-file');
    fileSelector.addEventListener('change', (event) => {
        const fileList = event.target.files;
        // console.log(fileList[0]);
    });
}

var inputText;

function readFile(input){
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = ()=>{
        // console.log(reader.result);
        inputText = reader.result;
        document.getElementById("text-content").innerHTML = reader.result;
    };
    reader.onerror = ()=>{
        console.log(reader.error);
    };


    let url1 = "https://api.textgears.com/spelling?key=zmeWUWHyKUYTqHFy&text="+inputText+"&language=en-GB";
    let req1 = new XMLHttpRequest();
    req1.open("GET",url1);
    req1.send();
    req1.onload = ()=>{
        let parsedResponse1 = JSON.parse(req1.response);
        console.log(parsedResponse1.response.errors);
    }


    let url2 = "https://api.textgears.com/spelling?key=zmeWUWHyKUYTqHFy&text="+inputText+"&language=en-GB";
    let req2 = new XMLHttpRequest();
    req2.open("GET",url2);
    req2.send();
    req2.onload = ()=>{
        let parsedResponse2 = JSON.parse(req2.response);
        console.log(parsedResponse2);
    }
} 