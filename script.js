//to display the path of the file selected
function displayFunc() {
  var fileInput = document.getElementById("input-file");
  var l = fileInput.value;
  document.getElementById("path-display").value = l;
  localStorage.clear();
}

var invalidSpans;
var wrongWords=[];


//read the input text file
//
function readFile(input) {
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    inputText = reader.result;
    //displaying the text content of the file uploaded
    document.getElementById("text-content").innerHTML = reader.result; 
    // wrongWords = [];
    //entered words is an array consisting of each words as an element of the array
    enteredWords = reader.result.split(/\W+/); 
    //api
    let url1 = `https://api.textgears.com/spelling?key=zmeWUWHyKUYTqHFy&text=${inputText}&language=en-GB`;
    //declare a new XMLHttpRequest and send it out
    let req1 = new XMLHttpRequest();
    req1.open("GET", url1);
    req1.send();
    req1.onload = () => {
      //response object of the request's response
      let parsedResponse1 = JSON.parse(req1.response);
      for (var i = 0; i < parsedResponse1.response.errors.length; i++) {
        valueArray = [];
        //wrongWords has all the wrongly spelled words from the input document, essentially, all the wrongly spelled words in parsedResponse
        wrongWords.push(parsedResponse1.response.errors[i].bad);
        //valueArray has the description of the possible error and the suggestions for the same
        valueArray.push(parsedResponse1.response.errors[i].description.en);
        valueArray.push(parsedResponse1.response.errors[i].better);
        // store these in the local storage for better access
        localStorage.setItem(
          parsedResponse1.response.errors[i].bad,
          valueArray
        );
        // console.log(wrongWords,)
      }

      pTag = document.createElement("p");
      for (var x of enteredWords) {
        id = 0;
        if (wrongWords.includes(x)) {
          var span = document.createElement("span");
          var spanContent = document.createTextNode(" " + x + " ");
          span.append(spanContent);
          pTag.append(span);
          span.classList.add("wrong-red");
          // id++;
          span.setAttribute("id", id);
          id++;
          span.setAttribute("value", x);
        } else {
          var spanContent = document.createTextNode(" " + x + " ");
          pTag.append(spanContent);
        }
        document.getElementById("text-content").innerHTML = "";
        document.getElementById("text-content").append(pTag);
      }
      invalidSpans = document.querySelectorAll(".wrong-red");

      for (let i = 0; i < invalidSpans.length; i++) {

        let arr = localStorage.getItem(invalidSpans[i].innerText.trim()).split(",");
        // $("invalidSpans")
        invalidSpans[i].addEventListener("contextmenu", event => { customeRightClick(arr, i); });
      }
    };
    reader.onerror = () => {
      console.log(reader.error);
    };
  };
}


const customeRightClick = (arr, j) => {
  event.preventDefault();
  console.log(event.target);
  $("div.ui.list").empty();
  for (let i = 0; i < arr.length; i++) {
    if(i==0){
      $("div.ui.list").append(`<div  class="header" style="background-color:plum; padding: 5px">${arr[i]}</div>`)
    }
    else{
      $("div.ui.list").append(`<div class="item suggestion-list" style="padding: 5px;" wordtoRepl="${invalidSpans[j].innerHTML}">${arr[i]}</div>`)
    }
  }
  $(".suggestion-list").hover(
    (event) => {
      event.target.style.backgroundColor = "lavender";
    }
  )
  $(".suggestion-list").mouseout(
    (event) => {
      event.target.style.backgroundColor = "";
    }
  )
  $(".suggestion-list").click(
    (event) => {
      let wWords = document.getElementsByClassName("wrong-red");
      for (let p = 0; p < wWords.length; p++) {
        if (wWords[p].innerHTML == $(event.target).attr("wordtoRepl")) {
          wWords[p].innerHTML = event.target.innerHTML;
          wWords[p].classList.remove('wrong-red');
          $("#my-tool-tip").css("display", "none");
          break;
        }
      }
    }
  )
  // var bounding = $("#main-body").getBoundingClientRect();
  $("#my-tool-tip").css("display", "block");
  $("#my-tool-tip").css({
    // position: "relative",
    top: event.screenY,
    left: event.screenX ,
    cursor: "pointer"
  })

};
