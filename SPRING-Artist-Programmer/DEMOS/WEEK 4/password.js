
function generatePassword() {
  let password = [];
  const lengthOfPassword = 11;
  const characterSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const lengthOfCharacters = characterSet.length;
  // console.log("how many characters?", lengthOfCharacters);
  for ( let i = 0; i < lengthOfPassword; i++ ) {
    // console.log(i);
    // console.log( characterSet.charAt(44) );
    randomNum = Math.floor( Math.random() * lengthOfCharacters );
    let charAtPos = characterSet.charAt( randomNum );
    console.log("Numerical pos: ", randomNum);
    console.log("Character: ", charAtPos);
    password.push(charAtPos);
    console.log(password);
  }
  document.getElementById("password-holder").innerHTML = password.join('');
}
document.getElementById("password-generator").onclick = generatePassword;
