const garden = document.getElementById("garden");
const logList = document.getElementById("logList");
const remainingCount = document.getElementById("remainingCount");

const numFlowers = 10;
let flowers = [];

function createFlower(id) {
    const size = Math.floor(Math.random() * 100) + 50;
    const x = Math.floor(Math.random() * (1000 - size));
    const y = Math.floor(Math.random() * (1000 - size));

    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;
    flower.style.backgroundColor = "yellow";
    flower.style.left = `${x}px`;
    flower.style.top = `${y}px`;
    flower.textContent = id;
    flower.dataset.id = id;
    
    garden.appendChild(flower);

    let timeoutId;
    function startWilting() {
        timeoutId = setTimeout(() => {
            flower.style.backgroundColor = "brown";
            setTimeout(() => {
                garden.removeChild(flower);
                flowers = flowers.filter(f => f !== flower);
                updateRemaining();
            }, 3000);
        }, 5000);
    }

    flower.addEventListener("click", () => {
        clearTimeout(timeoutId);
        flower.style.backgroundColor = "yellow";
        logAction(id);
        startWilting();
    });

    startWilting();
    return flower;
}

function logAction(id) {
    const logEntry = document.createElement("li");
    logEntry.textContent = `A(z) ${id}. terület öntözve lett!`;
    logList.appendChild(logEntry);
}

function updateRemaining() {
    remainingCount.textContent = flowers.length;
}

function init() {
    for (let i = 1; i <= numFlowers; i++) {
        flowers.push(createFlower(i));
    }
    updateRemaining();
}

init();
