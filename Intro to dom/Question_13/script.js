

const colorInput = document.querySelector("#colorInput");
const textInput = document.querySelector("#textInput");
const changeBgBtn = document.querySelector("#changeBgBtn");
const updateTextBtn = document.querySelector("#updateTextBtn");
const displayBox = document.querySelector("#displayBox");

function isValidColor(color){
    const temp = document.createElement("div");
    temp.style.color  = color;
    return temp.style.color !== "";                                  
}



changeBgBtn.addEventListener("click",()=>{
    const colorValue = colorInput.value.trim();
    if(isValidColor(colorValue)){
        displayBox.style.backgroundColor= colorValue;
    }else{
        alert("Invalid color name")
    }
})


updateTextBtn.addEventListener("click" ,()=>{
    const newText = textInput.value.trim();
    if(newText === ""){
        alert("Please enter some text!");
    }else{
displayBox.textContent = newText
    }
})
 