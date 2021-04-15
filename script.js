//to display the path of the file selected
function displayFunc(){
    var fileInput = document.getElementById("input-file");
    var l = fileInput.value;
    document.getElementById("path-display").value = l;
    localStorage.clear();
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
        let url1 = `https://api.textgears.com/spelling?key=zmeWUWHyKUYTqHFy&text=${inputText}&language=en-GB`;
        let req1 = new XMLHttpRequest();
        req1.open("GET",url1);
        req1.send();
        // valueArray=[];
        req1.onload = ()=>{
            let parsedResponse1 = JSON.parse(req1.response);
                for(var i =0; i< parsedResponse1.response.errors.length; i++){ 
                    valueArray=[];
                    wrongWords.push(parsedResponse1.response.errors[i].bad);
                    valueArray.push(parsedResponse1.response.errors[i].description.en);
                    valueArray.push(parsedResponse1.response.errors[i].better);
                    localStorage.setItem(parsedResponse1.response.errors[i].bad,valueArray);
                }
                pTag = document.createElement("p");
                for(var x of enteredWords){
                    id="this-one";
                    if(wrongWords.includes(x)){
                        var span = document.createElement("span");
                        var spanContent = document.createTextNode(" "+x+" ");
                        span.append(spanContent);
                        pTag.append(span);
                        span.classList.add("wrong-red");
                        // id++;
                        span.setAttribute("id",id);
                        span.setAttribute("value",x);
                    }
                    else{
                        var spanContent = document.createTextNode(" "+x+" ");
                        pTag.append(spanContent);
                    }
                    document.getElementById("text-content").innerHTML="";
                    document.getElementById("text-content").append(pTag);
                }
                var invalidSpans = document.querySelectorAll('.wrong-red');
                console.log(invalidSpans)
                console.log(invalidSpans.length);
                for( let i=0;i<invalidSpans.length;i++){
                    $(invalidSpans[i]).contextmenu((event)=>{
                        console.log(invalidSpans[i].innerHTML);
                    })
                }
        } 
        reader.onerror = ()=>{
            console.log(reader.error);
        };
    }    
}

