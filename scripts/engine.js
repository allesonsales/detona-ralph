// const square = document.querySelectorAll(".square")
// const enemy = document.querySelectorAll(".enemy")
// const left = document.querySelectorAll("#time-left")
// const score = document.querySelectorAll("#score")

const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        gamevelocity: 1000,
        hitposition: 0,
        result: 0,
        curretTime: 10,
    },
    actions: {
        timerId: setInterval(randomsquare, 100),
        countDownTimerid: setInterval(countDown, 1000),
    }
}

function countDown() {
    state.values.curretTime--;
    state.view.timeleft.textContent = state.values.curretTime

    if (state.values.curretTime <= 0) {
        playsound("gameover")
        clearInterval(state.actions.countDownTimerid)
        clearInterval(state.actions.timerId)
        alert("Game Over! Seu tempso acabou, o seu resultado foi: " + state.values.result)
    }
}



function randomsquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });

    let randomnumber = Math.floor(Math.random() * 9);
    let randomsquare = state.view.squares[randomnumber];
    randomsquare.classList.add("enemy")
    state.values.hitposition = randomsquare.id;
}

// function moveenemy() {
//     state.values.timerId = setInterval(randomsquare, state.values.gamevelocity)
// }

function listenerbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitposition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitposition = null
                state.values.curretTime++;
                playsound("hit")
            }
        })
    })
}

function playsound(audioName) {
    let audio = new Audio(`./sounds/${audioName}.m4a`)
    audio.volume = 0.2
    audio.play()
}

function initialize() {
    randomsquare()
    listenerbox()
    countDown()

}


initialize();
