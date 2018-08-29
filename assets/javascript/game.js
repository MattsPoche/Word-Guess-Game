var gameState = {
    guesses: 5,
    alreadyGuessed: [],
    wins: 0,
    losses: 0,
    breedList: ["labrador retriever", "yorkshire terrier", "german shepherd", "golden retriever", "beagle", "dachshund", "boxer", "poodle",	"shih tzu", "miniature schnauzer"],
    acceptedInput: "abcdefghijklmnopqrstuvwxyz",
    breed: 0,
    guessStr: [],
    chooseBreed: function(){
        this.breed = Math.floor(Math.random() * this.breedList.length);
    },
    getBreed: function(){
        return this.breedList[this.breed];
    },
    buildGuess: function(){
        var thisbreed = this.getBreed();
        for(var i = 0; i < thisbreed.length; i++){
            var letter = thisbreed.charAt(i);
            if(letter === " "){
                this.guessStr.push(" ");
            }else{
                this.guessStr.push("_");
            }
        }
    },
    checkGuess: function(g){
        var correct = false;
        for(var i = 0; i < this.getBreed().length; i++){
            if(g === this.getBreed().charAt(i)){
                this.guessStr[i] = g;
                correct = true;
            }
        }
        this.alreadyGuessed.push(g);
        if(!correct){
            this.guesses--;
        }
    },
    checkWin: function(){
        if(!this.guessStr.includes("_")){
            this.wins++;
            return true;
        }else{
            if(this.guessStr.includes("_") && this.guesses <= 0){
                this.losses++;
                return true;
            }
        }
        return false;
    },
    display: function(g){
        document.getElementById("wins-losses").innerHTML = "Wins: "+this.wins+" Losses: "+this.losses;
        document.getElementById("numberOfGuesses").innerHTML = "Remaining Guesses: "+this.guesses;
        document.getElementById("passedGuesses").innerHTML = "Already Guessed: "+this.alreadyGuessed;
        document.getElementById("wordBlank").innerHTML = this.guessStr;
        document.getElementById("input").innerHTML = "Player Guess: "+g;
    },
    reset: function(){
        this.chooseBreed();
        this.guessStr = [];
        this.alreadyGuessed = [];
        this.guesses = 5;
        this.buildGuess();
    }
}
// divs
// instructions
// wins-losses
// numberOfGuesses
// passedGuesses
// wordBlank
// input

gameState.reset();
gameState.display("");

window.onkeyup = function(event){
    var key = event.key;
    if(gameState.acceptedInput.includes(key)){
        gameState.checkGuess(key);
        if(gameState.checkWin()){
            alert(gameState.getBreed());
            gameState.reset();
        }
        gameState.display(key);
    }else{
        gameState.display("Type a letter key!");
    }
}



