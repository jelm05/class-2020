
function makeCircularText(text, radius, startPos) {

  text = text.split("");
  let destination = document.getElementsByClassName("text");

  // console.log(destination);
  // console.log(destination[0]);

  let degrees = 90 / text.length;

  text.forEach(function( elem ){
    elem = `<p style='height: ${radius}px;
    transform: rotate(${startPos}deg);
    transform-origin: 0 100%;'>${elem}</p>`;

    destination[0].innerHTML += elem;
    startPos += degrees;

    console.log(elem)

  });

}

makeCircularText("Change this text", 100, 0);
