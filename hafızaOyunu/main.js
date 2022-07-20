const main = document.querySelector(".main");
const levelDesc = document.querySelector("#leveldescription");
const pscore = document.querySelector("#score");
const buttonPlayAgain = document.querySelector("button");
const move = document.querySelector("#move")
const mode = document.querySelector("#mode");

const constColors = ["yellow", "yellow", "green", "green", "blue", "blue", "pink", "pink", "purple", "purple", "black", "black", "brown", "brown", "red", "red"];

let colors = [...constColors];                  
let moveCount = 0;
let score = 0;
let dim = 90;
let width = 500;

function drawboard() {
    main.style.width = width + "px";
    levelDesc.style.display = "block";

    for (let i = 0; i < 16; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.style.width = dim + "px";
        square.style.height = dim + "px";
        main.appendChild(square);
    }

    const squares = document.querySelectorAll(".main .square");
    
    let innerCount = [];
    while (0 < colors.length) {
        let random = Math.floor(Math.random(0, 16) * colors.length);
        innerCount.push(colors[random]);
        console.log(innerCount);
        if (random !== -1) {
            colors.splice(random, 1);
        }
    }
    
    for (var i = 0; i < 16; i++) {
        let color = innerCount[i];
        squares[i].setAttribute("color", color);
    }

    let selectedSquares = [];
    let count = 0;
    squares.forEach(item => {
        item.addEventListener("click", () => {
            item.classList.toggle("rotatesqaure");
            item.style.background = item.getAttribute("color");
            selectedSquares.push(item);

            if (selectedSquares.length === 2) {
                main.style.pointerEvents = "none";
                moveCount++;
                move.textContent = moveCount;
                if (moveCount > 10) {
                    score -= 5;
                    pscore.textContent = score;
                }
                if (selectedSquares[0].getAttribute("color") === selectedSquares[1].getAttribute("color")) {
                    setTimeout(() => {
                        selectedSquares[0].style.background = "none";  
                        selectedSquares[1].style.background = "none";
                    }, 500)

                    score += 10;
                    pscore.textContent = score;
                    count++;
                    if (count === (squares.length) / 2) {
                        levelDesc.style.display = "none";
                        main.innerHTML = "";
                        let card = document.createElement("div");
                        let play_again_button = document.createElement("button");
                        let sc = document.createElement("div"); //score
                        sc.classList.add("card");
                        sc.textContent = "Score:" + score;
                        play_again_button.classList.add("buton");
                        play_again_button.innerHTML = "play again";
                        card.innerHTML = "congratulations"
                        card.classList.add("card");

                        play_again_button.addEventListener("click", e => {
                            main.innerHTML = "";
                            score = 0;
                            pscore.textContent = 0;
                            colors = [...constColors];
                            moveCount = 0;
                            move.textContent = moveCount;
                            drawboard();
                        })
                        main.append(card);
                        main.append(play_again_button);
                        main.append(sc);
                    }
                }
                else {
                    setTimeout(() => {
                        selectedSquares[0].classList.toggle("rotatesqaure");
                        selectedSquares[1].classList.toggle("rotatesqaure");
                        selectedSquares[0].style.background = "beige";
                        selectedSquares[1].style.background = "beige";
                    }, 500)
                }
                setTimeout(() => {
                    main.style.pointerEvents = "all";
                    selectedSquares = [];
                }, 500);
                
            }

        })
    }) 
}
buttonPlayAgain.addEventListener("click", e => {
    main.innerHTML = "";
    pscore.textContent = 0;
    colors = [...constColors];
    moveCount = 0;
    move.textContent = moveCount;
    drawboard();
})

drawboard();







