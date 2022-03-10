import './index.css';


let lengthInput = document.getElementById('length');
lengthInput.onkeyup = (e) => {
  let word = document.getElementById('word');
  word.innerHTML = "";

  for (let i = 0; i < e.target.value; i++) {
    let input = document.createElement('input');
    input.type = 'text';
    input.className = "word-textbox";
    input.id = "word-textbox-" + i;
    input.maxLength = 1;
    input.onkeydown = (e) => (e.key === "Backspace" || e.key === "Delete") || /[a-z ğüşiöçĞÜŞİÖÇ]/gi.test(e.key);
    word.appendChild(input);
  }
}


var myHeaders = new Headers();
// console.log({process.env.REACT_APP_AUTHORIZATION})
myHeaders.append("Authorization", process.env.REACT_APP_API_KEY);
myHeaders.append("Content-Type", "application/json");

let submit = document.getElementById('submit');
submit.onclick = function () {

  let length = document.getElementById('length').value;
  let exclude = document.getElementById('exclude').value.toLowerCase();
  let include = document.getElementById('include').value.toLowerCase();
  const excludeArray = Array.from(new Set(exclude.replace(/[^A-Za-z ]/g, '').split('')));
  const includeArray = Array.from(new Set(include.replace(/[^A-Za-z ]/g, '').split('')));
  

  const wordArray = document.getElementsByClassName('word-textbox');

  let wordResult = ""
  for (var i = 0; i < wordArray.length; i++) {
    wordResult += wordArray[i].value == "" ? ' ' : wordArray[i].value;
  }
  
  if(length == 0 || ""){
    length = 0
  }

  var raw = JSON.stringify({
    "include": includeArray,
    "exclude": excludeArray,
    "length": length,
    "word": wordResult,
    "language": "tr"
  });
  console.log(raw)
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://word-finder-get-words.herokuapp.com/word_finder/get_words", requestOptions)
    .then(response => response.text())
    .then(data => {
      const result = JSON.parse(data).result;
      const resultList = document.getElementById('resultList');
      resultList.innerHTML = '';

      result.forEach((value) => {
        const resultItem = document.createElement('label');
        resultItem.innerHTML = value;
        resultList.appendChild(resultItem);
        resultList.append(', ')
      }) 
    })
    .catch(error => console.log('error', error));
}
