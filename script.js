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
        document.getElementById('text-content').innerHTML = reader.result;
        wrongWords=[];
        enteredWords=reader.result.split(/\W+/);
        // console.log(enteredWords);
        let url1 = `https://api.textgears.com/spelling?key=zmeWUWHyKUYTqHFy&text=${inputText}&language=en-GB`;
        let req1 = new XMLHttpRequest();
        req1.open("GET",url1);
        req1.send();
        req1.onload = ()=>{
            let parsedResponse1 = JSON.parse(req1.response);
            console.log(parsedResponse1.response.errors.length);
            for(var i =0; i< parsedResponse1.response.errors.length; i++){
                wrongWords.push(parsedResponse1.response.errors[i].bad);
                setContextMenu(parsedResponse1.response.errors[i]);
                localStorage.setItem(parsedResponse1.response.errors[i].bad,parsedResponse1.response.errors[i].better);
                // console.log(parsedResponse1.response.errors[i].bad);
            }
            // console.log(wrongWords);
            pTag = document.createElement("p");
            for(var x of enteredWords){
                // console.log(x);
                id=0;
                var span = document.createElement("span");
                var spanContent = document.createTextNode(x);
                if(wrongWords.includes(x)){
                    span.append(spanContent);
                    pTag.append(span);
                    span.classList.add("wrong-red");
                    id++;
                    span.setAttribute("id",id);
                    // span.setAttribute("class","wrong-word");
                    span.setAttribute("value",x);
                }
                else{
                    var spanContent = document.createTextNode(" "+x+" ");
                    pTag.append(spanContent);
                }
            }
            // console.log(pTag);
            document.getElementById("text-content").innerHTML="";
            document.getElementById("text-content").append(pTag);
        }        
        reader.onerror = ()=>{
            console.log(reader.error);
        };
    }
    
}

function setContextMenu(array){
    // console.log(array);
    console.log(array.description.en);
    console.log(array.better);
    // document.getElementById("")
}
