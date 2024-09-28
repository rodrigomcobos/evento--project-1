// reverse array without using reverse method
const reverseArray = (arr) => {
  let reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
};

//write a function that checks if a string is a pangram and the string contains letters and numbers
//This function will check if a given string is a pangram. A pangram is a string that contains all the letters in the alphabet at least once.
//The function will return true if the string is a pangram and false if it is not.
const isPangram = (str) => {
  //Create a string of all the letters in the alphabet. This will be the reference for the check.
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  //Split the string into an array of individual letters.
  const lettersArr = letters.split('');
  //Loop through each of the letters in the alphabet.
  for (let i = 0; i < lettersArr.length; i++) {
    //Check if the given string contains the current letter. If it does not, return false.
    if (str.indexOf(lettersArr[i]) === -1) {
      return false;
    }
  }
  //If the loop completes without returning false, then the string contains all the letters in the alphabet and is a pangram.
  return true;
};
