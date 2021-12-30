let score = 0;
let timesPlayed = 1;


function displayResponeData(result, word) {
    if(result === "OK") {
        $("#result").remove();
        $("#show-result").append(`<p id="result">${result}</p>`)
    }
    else if(result === "NOT-ON-BOARD") {
        $("#result").remove();
        $("#show-result").append(`<p id="result">${result}</p>`);
    }
    else if(result === "NOT-WORD") {
        $("#result").remove();
        $("#show-result").append(`<p id="result">${result}</p>`);
    }
    displayScoreData(word);

}


function displayScoreData(word) {
    if($("#result").text() === "OK") {
        score += word.length;
        $("#score").remove();
        $("#score-board").prepend(`<p id="score">SCORE: ${score}</p>`);
    }
    
}


async function showTimer() {
    let timer = 0;
    let result = '';
    const $timer = $("#timer");
    $("#play-again").hide();
    $("#guess-form").slideDown();


    setTimer = setInterval(async function () {
        $timer.show()
        timer += 1;
        $("#tick").remove()
        $timer.append(`<p id='tick'>Timer: ${timer}</p>`)

        if(timer === 60) {

            clearInterval(setTimer);
            $("#guess-form").slideUp();
            $("#play-again").show();

            const response = await axios.post("/results", {score: score, playCount: timesPlayed})

            result = response;
            console.log(result)
            $("#h-score").remove()
            $("#score-board").append(`<p id="h-score">High Score: ${result.data[2]}`)

        }              
    }, 1000)


}


function resetScore() {
    $("#score").remove();
    $("#result").remove();
    score = 0;
}


async function getFormData(evt) {
    evt.preventDefault();
    const $guessVal = $('#guess').val();
    let word = $guessVal;

    let response = await axios.get("/check-answers", {params: {word: word}})

    $('#guess-form').trigger("reset");

    let result = response.data.results;
    displayResponeData(result, word);
    
}


function playAgainEvent() {
    timesPlayed += 1;
    showTimer();
    resetScore();
}



showTimer();
$("#guess-form").on("submit", getFormData);
$("#play-again").on("click", playAgainEvent);





    