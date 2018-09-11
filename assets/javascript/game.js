// variables
var ascii = [
".============================================.",
"||                                          ||",
"||                                          ||",
"||                ___                       ||",
"||              .'   '.                     ||",
"||             /       \\           oOoOo    ||",
"||            |         |       ,==|||||    ||",
"||             \\       /       _|| |||||    ||",
"||              '.___.'    _.-'^|| |||||    ||",
"||            __/_______.-'     '==HHHHH    ||",
"||       _.-'` /                   \"\"\"\"\"    ||",
"||    .-'     /   oOoOo                     ||",
"||    `-._   / ,==|||||                     ||",
"||        '-/._|| |||||                     ||",
"||         /  ^|| |||||                     ||",
"||        /    '==HHHHH                     ||",
"||       /________\"\"\"\"\"                     ||",
"||       `\\       `\\                        ||",
"||         \\        `\\   /                  ||",
"||          \\         `\\/                   ||",
"||          /                               ||",
"||         /                                ||",
"||        /_____                            ||",
"||                                          ||",
"||                                          ||",
"'============================================'"
];
var asciiString = '';
var words = ["INDIA PALE ALE", "HEFEWEIZEN", "AMBER ALE", "PORTER", "STOUT", "PILSNER", "TRIPEL", "SOUR ALE", "DOPPELBOCK","WITBEIR", "BARLEY WINE", "SCOTTISH ALE", "SAISON", "BROWN ALE", "DUNKEL", "BITTER ALE", "BELGIAN STONG ALE", "IRISH RED ALE", "BLONDE ALE"];
var incorrectGuesses;
var currentWord;
var blankedWordGuesses;
var numOfGuesses = 13;
var score = 0;

// document vars
var button = document.querySelector('.start-game');
var guessesLeftBox = document.querySelector('.guesses-left');
var scoreBox = document.querySelector('.score');
var hangedMan = document.querySelector('.hanged-man');

// functions
var startGame = function(e){
  lettersGuessedIncorrectly = [];
  word = randomWord();
  blankedWordGuesses = replaceWordWithBlanks(word.length);
  updateCorrectGuess(blankedWordGuesses);
  updateIncorrectGuess('');
  listenForKeyPress();
  guessesLeftBox.innerHTML = numOfGuesses;
  button.innerHTML = "Restart"
  hangedMan.innerHTML = "";
  currentWord = word;
  if(currentWord.indexOf(' ') > -1){
    handleCorrectGuess(' ');
  }
};
var randomWord = function(){
  return words[Math.floor(Math.random() * words.length)];
};
var listenForKeyPress = function(){
  document.onkeypress = handleKeyPress;
};
var checkGuess = function(letter,word){
  return word.indexOf(letter) > -1 && lettersGuessedIncorrectly.indexOf(letter) < 0 && blankedWordGuesses.indexOf(letter) < 0;
};
var replaceWordWithBlanks = function(length){
  var blank = '';
  for (var i = 0; i < length; i++) {
    blank = blank + '_';
  }
  return blank;
};
var fillInBlanks = function(letter,word,blankedWordGuesses){
  var wordCopy = word;
  var pos;
  var str = blankedWordGuesses;
  while(wordCopy.indexOf(letter) > -1){
    pos = wordCopy.indexOf(letter);
    str = str.slice(0,pos)+letter+str.slice(pos+1);
    wordCopy = wordCopy.slice(0,pos)+"0"+wordCopy.slice(pos+1);
  };
  return str;
};
var isWordComplete = function(string){
  return string.indexOf('_') < 0;
};
var outOfGuesses = function(){
  return lettersGuessedIncorrectly.length > numOfGuesses;
};
var handleKeyPress = function(event){
  console.log(event.key.toUpperCase());
  var guess = event.key.toUpperCase();
  if(checkGuess(guess, word)){
    handleCorrectGuess(guess);
  } else{
    handleIncorrectGuess(guess);
  }
};
var handleCorrectGuess = function(guess){
  blankedWordGuesses = fillInBlanks(guess, word, blankedWordGuesses);
  updateCorrectGuess(blankedWordGuesses);
  if(isWordComplete(blankedWordGuesses)){
    setTimeout(handleWins, 300);
  }
};
var handleIncorrectGuess = function(guess){
  if(! lettersGuessedIncorrectly.includes(guess)){
    lettersGuessedIncorrectly.push(guess);
    updateIncorrectGuess(lettersGuessedIncorrectly.join(', '));
    guessesLeftBox.innerHTML = numOfGuesses - lettersGuessedIncorrectly.length;
    updateAscii();
  }
  
  if(outOfGuesses()){
    handleLosses();
  }
};
var updateAscii = function(){
  var art = '';
  var counter = [];  
  var j = [];

  for (var i = 0; i < lettersGuessedIncorrectly.length; i++) {    
    counter.push(i);
    counter.push(i+1);
  }

  for (var i = 0; i < counter.length; i++) {
    j.push(i);  
  }
  
  for (var i = 0; i < j.length; i++) {
    if(i < 26){
      art = art + ascii[i] + "\n";
    }
  }

  hangedMan.innerHTML = art;
};
var updateIncorrectGuess = function(string){
  var element = document.querySelector('.incorrect-guesses');
  element.innerHTML = string;
};
var updateCorrectGuess = function(string){
  var element = document.querySelector('.blank-word');
  element.innerHTML = string;
};
var handleWins = function(){
  score++;
  scoreBox.innerHTML = score;
  var playAgain = confirm("You Win! Play again?");
  if(playAgain){
    startGame();
  }
};
var handleLosses = function(){
  var playAgain = confirm("Oh no! You had too much beer! Try again?");
  if(playAgain){
    startGame();
  }
};

button.onclick = startGame;
