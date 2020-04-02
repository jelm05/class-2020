
const text = [
  "This is the text that we'll type like a typewriter.",
  "We'll call it the typewriter effect.",
  "However, we need more sentences to illustrate the maxRow variable.",
  "If I set the variable to 3, then it will show 4 rows.",
  "So this sentence will erase the first sentence."
]

const speed = 50;
let indx = 0;
let textLength = text[0].length;
let textPos = 0;
let maxRows = 3;

function typewriter() {
  // console.log("start indx", indx)
  // console.log("num of first letters", textLength);
  let row = Math.max( 0, indx-maxRows );
  // Contents is where we store previously typed sentences
  // from our array, so that they don't get overwritten
  let contents = ' ';
  let destination = document.getElementById("text");

  while ( row < indx) {
     contents += text[ row++ ] + "<br />"
  }

  destination.innerHTML = contents += text[ indx ].substring(0, textPos);

  if ( textPos++ == textLength ) {
    textPos = 0;
    indx++;
    // console.log("equal")
    // console.log("next indx", indx)
    // NOT equal
    if ( indx != text.length ) {
      textLength = text[ indx ].length;
      // console.log("num of next letters", textLength);
      setTimeout("typewriter()", speed);
    }

  } else {
    setTimeout("typewriter()", speed);
  }

}

typewriter();
