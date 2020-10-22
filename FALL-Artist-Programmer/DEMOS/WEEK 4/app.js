
// console.log("Hello World!")

// What do we need?
// We need a way to execute code every time we click a button
// We need a place to store/remember whatever our generated password is
// We need a list of characters to choose from, to generate our password
// We somehow need to grab random characters and string them together
// And, we somehow need to get that password onto our HTML page

// DRY = Don't Repeat Yourself

// declare a function, the name can be whatever you want:
function generatePassword() {
  // Any code within this function, only executes when we invoke that function name
  console.log("Hello, from inside the generatePassword() function!");

  // This is an array
  let password = [];
  // This is a string, but we can treat strings like arrays
  let characterSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let lengthOfCharacters = characterSet.length;
  let lengthOfPassword = 10;

  // console.log("what is password: ", typeof(password));
  // console.log("what is characterSet: ", typeof(characterSet));

  // I need to loop through my characterSet variable
  for ( var counter = 0; counter < lengthOfPassword; counter++ ) {
    // console.log(characterSet[counter] )
    // console.log(`The index of ${characterSet[counter]} is ${counter}`);
    let randomNum = Math.floor( Math.random() * lengthOfCharacters )
    let currentCharacter = characterSet.charAt(randomNum);
    // console.log( characterSet.charAt(randomNum) + " is at: " + randomNum )
    // console.log(currentCharacter)
    password.push(currentCharacter)
    console.log(password)
  }

  // Okay JS, look at my entire document, find an element that has an ID of 'password-holder'
  // When you find it, replace the inner content of that html element
  // with the contents of my password array, and join all of those characters with no space
  document.getElementById("password-holder").innerHTML = password.join('');

}


document.getElementById("password-generator").onclick = generatePassword;


// A function is not invoked, without parantheses
// generatePassword();





function replaceImage() {

  let imageURLs = [
    'https://placekitten.com/200/200',
    'https://placekitten.com/200/300',
    'https://placebear.com/200/300',
    'https://placebear.com/300/300'
  ];

  let randomNumberForIndex = Math.floor( Math.random() * imageURLs.length )

  let newImageURL = imageURLs[randomNumberForIndex];
  console.log(newImageURL)

  document.getElementById("replace").src = newImageURL;


}

document.getElementById("new-image").onclick = replaceImage;
