/*global chrome*/
console.log("MY EXTENSION CONSOLE LOG! CONTENT");

var divHeader = document.createElement("div")
divHeader.setAttribute("id", "mydivheader");
var div = document.createElement("div"); 
div.setAttribute("id", "mydiv");


var exitBtn = document.createElement("BUTTON");
var exitBtnText = document.createTextNode("X")
exitBtn.appendChild(exitBtnText);
exitBtn.setAttribute("id", "exitBtn");
exitBtn.addEventListener("click", closeDiv)




var divBody = document.createElement("div");
divBody.setAttribute("id", "mydivbody");


if(document.getElementById("mydiv") === null) {
  let theDiv = document.getElementById("mydiv");
  console.log(theDiv);
  document.body.appendChild(div); 
  div.append(divHeader);
  div.append(divBody);
  
  divHeader.appendChild(exitBtn)
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function closeDiv(element){
  if(element) {
    document.body.removeChild(div);
  }
}

dragElement(document.getElementById("mydiv"));
