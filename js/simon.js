window.onload = function () {
    var body = document.body;
    pfx = ["webkit", "moz", "MS", "o", ""];
    event = "TransitionEnd";
    for (var i = 0; i < pfx.length; i++) {
        if (!pfx[i]) event = event.toLowerCase();
        body.addEventListener(pfx[i] + event, unlight, false);
    }
    body.onclick = function () {
        if (event.target.classList.contains("button") && canClick) {
            light(event.target);
            if (pattern[position] == Array.prototype.indexOf.call(buttons, event.target)) {
                position++;
                if (position >= pattern.length) {
                    round();
                }
            }
            else {
                console.log("lose");
            }
        }
    }

    buttons = document.getElementsByClassName("button");
    GREEN = 0;
    RED = 1;
    YELLOW = 2;
    BLUE = 3;

    pattern = [];
    canClick = false;

    round();
}

function unlight(event) {
    event.target.classList.remove("light");
}

function light(element) {
    element.classList.add("light");
}

function playPattern(pattern) {
    playSequence(pattern.slice(0));
}

function playSequence(pattern) {
    if (pattern.length > 0) {
        canClick = false;
        setTimeout(function () {
            light(buttons[pattern.shift()]);
            playSequence(pattern);
        }, 1000);
    } else {
        playerTurn();
    }
}

function playerTurn() {
    canClick = true;
    position = 0;
}

function round() {
    pattern.push(parseInt(Math.random() * 4));
    playPattern(pattern);
}