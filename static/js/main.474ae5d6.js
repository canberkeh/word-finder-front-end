!function(){"use strict";document.getElementById("length").onkeyup=function(e){var t=document.getElementById("word");t.innerHTML="";for(var n=0;n<e.target.value;n++){var o=document.createElement("input");o.type="text",o.className="word-textbox",o.id="word-textbox-"+n,o.maxLength=1,o.onkeydown=function(e){return"Backspace"===e.key||"Delete"===e.key||/[a-z \u011f\xfc\u015fi\xf6\xe7\u011e\xdc\u015e\u0130\xd6\xc7]/gi.test(e.key)},t.appendChild(o)}};var e=new Headers;e.append("Authorization","Basic d29yZF9maW5kZXI6d29yZGllMTk5M0A="),e.append("Content-Type","application/json"),document.getElementById("submit").onclick=function(){for(var t=document.getElementById("length").value,n=document.getElementById("exclude").value.toUpperCase(),o=document.getElementById("include").value.toUpperCase(),r=Array.from(new Set(n.replace(/[^A-Za-z ]/g,"").split(""))),a=Array.from(new Set(o.replace(/[^A-Za-z ]/g,"").split(""))),d=document.getElementsByClassName("word-textbox"),l="",c=0;c<d.length;c++)l+=""==d[c].value?" ":d[c].value;console.log(l);var u=JSON.stringify({exclude:r,include:a,length:t,word:l,language:"tr"});fetch("http://word-finder-get-words.herokuapp.com/word_finder/get_words",{method:"POST",headers:e,body:u,redirect:"follow"}).then((function(e){return e.text()})).then((function(e){var t=JSON.parse(e).result,n=document.getElementById("resultList");n.innerHTML="",t.forEach((function(e){var t=document.createElement("label");t.innerHTML=e,n.appendChild(t),n.append(", ")}))})).catch((function(e){return console.log("error",e)}))}}();
//# sourceMappingURL=main.474ae5d6.js.map