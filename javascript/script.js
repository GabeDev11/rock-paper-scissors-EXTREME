// define score
const score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, draws: 0 };
const choice = { rock: 'rock', paper: 'paper', scissors: 'scissors' };

document.querySelector(".reset-score-button").addEventListener('click', () => {
    resetScore();
});
document.querySelector(".js-move-buttons").children[0].addEventListener('click', () => {
    playGame(choice.rock);
});
document.querySelector(".js-move-buttons").children[1].addEventListener('click', () => {
    playGame(choice.paper);
});
document.querySelector(".js-move-buttons").children[2].addEventListener('click', () => {
    playGame(choice.scissors);
});
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame(choice.rock);
    }
    else if (event.key === 'p') {
        playGame(choice.paper);
    }
    else if (event.key === 's') {
        playGame(choice.scissors);
    }
});

updateScoreElement();

function playGame(playerMove) {
    let computerMove = pickComputerMove();
    let result = '';
    let winResult = 'you win! :D';
    let loseResult = 'you lose! D:';
    let drawResult = 'you drawed. :/';

    if (playerMove === choice.rock) {
        if (computerMove === choice.rock) {
            result = drawResult
        }
        if (computerMove === choice.paper) {
            result = loseResult
        }
        if (computerMove === choice.scissors) {
            result = winResult
        }
    }
    if (playerMove === choice.paper) {
        if (computerMove === choice.rock) {
            result = winResult
        }
        if (computerMove === choice.paper) {
            result = drawResult
        }
        if (computerMove === choice.scissors) {
            result = loseResult
        }
    }
    if (playerMove === choice.scissors) {
        if (computerMove === choice.rock) {
            result = loseResult
        }
        if (computerMove === choice.paper) {
            result = winResult
        }
        if (computerMove === choice.scissors) {
            result = drawResult
        }
    }

    if (result == winResult) {
        score.wins += 1;
    }
    else if (result == loseResult) {
        score.losses += 1;
    }
    else if (result == drawResult) {
        score.draws += 1;
    }

    updateScoreElement();
    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}.png" alt="?"> <img src="images/${computerMove}.png" alt="?"> Computer`
}

function pickComputerMove() {
    let rand = Math.random();
    if (rand <= 1 / 3) {
        return choice.rock;
    }
    if (rand >= 2 / 3) {
        return choice.scissors;
    }
    return choice.paper;
}

function resetScore() {
    if (score.wins > score.losses) {
        alert("man... you were in the lead");
    }
    else if (score.wins < score.losses) {
        alert("yeah, I would want to reset the score too");
    }
    else {
        alert("bro, it was tied anyways");
    }

    score.wins = 0;
    score.losses = 0;
    score.draws = 0;

    localStorage.removeItem('score');
    updateScoreElement();
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `wins: ${score.wins} | losses: ${score.losses} | draws: ${score.draws}`;
}
