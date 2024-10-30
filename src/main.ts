import "./style.css";
import * as Shop from "./Shop";
import { initialButtons, unlockableButtons } from "./ItemData";

// --- html creation ---
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "orteil42 clicker";

const header = document.createElement("h1");

const shopDiv = document.createElement("div");

const clickerDiv = document.createElement("div");
<<<<<<< Updated upstream
=======
clickerDiv.setAttribute("class", "clicker");
app.append(clickerDiv);
>>>>>>> Stashed changes

const mainShop: Shop.Shop = {
    parentDiv: shopDiv,
    allButtons: [],
};

const clickerBar = document.createElement("h2");
const mainClicker = document.createElement("button");

const counterField = document.createElement("h2");

const SPSField = document.createElement("h3");
const SPCField = document.createElement("h3");

// --- variable declaration ---
let mainScore: number = 0;
let scoreDisplay: string = "0";
let frameCounterTimer = 0;

//  --- function definitions ---
export function getMS(): number {
    return mainScore;
}
export function incScore(add: number): void {
    mainScore += add;
    scoreDisplay = mainScore.toFixed(2);
    counterField.innerText = "Orteils: " + scoreDisplay;
    //now verify buttons
    Shop.verifyAllButtons(mainShop.allButtons, mainScore);
}

export function updateSPS(): void {
    SPSField.innerText =
        "Total Orteils per second: " + Shop.valuePerSecond(mainShop.allButtons);
}

export function updateSPC(): void {
    SPCField.innerText =
        "Total Orteils per click: " + Shop.valuePerClick(mainShop.allButtons);
}

function autoScore(
    _time: number,
    items: Shop.ShopButton[] = mainShop.allButtons
) {
    items.forEach((element) => {
        incScore( element.item.value * element.numPurchased * getDeltaTime());
    });
    updateFrameCounter();
    Shop.unlockCheck(mainScore, mainShop, unlockableButtons);
    requestAnimationFrame(autoScore);
}

function getDeltaTime():number{
    return (performance.now() - frameCounterTimer) / 1000;
}
function updateFrameCounter(){
    frameCounterTimer = performance.now();
}


// - set HTML element parentage and data -
document.title = gameName;
header.innerHTML = gameName;
app.append(header);
shopDiv.setAttribute("class", "shop");
app.append(shopDiv);
clickerDiv.setAttribute("class", "clicker");
app.append(clickerDiv);

mainShop.allButtons = initialButtons;
Shop.activateHTML(mainShop);

<<<<<<< Updated upstream
=======
const clickerBar = document.createElement("h2");
const mainClicker = document.createElement("button");
const ftext = document.createElement("p");
let lastID: number;
clickerDiv.appendChild(ftext);

ftext.classList.add("floatingText");
ftext.innerText = "+1";
ftext.style.setProperty("visibility", "hidden");
ftext.style.position = "absolute";
ftext.style.zIndex = "5";
// = true;

>>>>>>> Stashed changes
mainClicker.setAttribute("class", "mainButton");
mainClicker.onclick = (e) => {
    const v = Shop.valuePerClick(mainShop.allButtons);
    incScore(v);

    //code for css styling altered from https://stackoverflow.com/questions/28267256/how-to-move-an-element-to-the-mouse-position
    const x = e.clientX;
    const y = e.clientY;
    ftext.style.left = `${x + 20}px`;
    ftext.style.top = `${y}px`;
    ftext.style.zIndex = "5";

    ftext.style.setProperty("visibility", "visible");
    ftext.innerText = "+" + v;
    ftext.classList.remove("floatingText");
    void ftext.offsetWidth;
    ftext.classList.add("floatingText");

    clearTimeout(lastID);

    lastID = setTimeout(() => {
        ftext.style.setProperty("visibility", "hidden");
    }, 750);
};
mainClicker.innerHTML = "get more orteil42  ";
clickerBar.append(mainClicker);
clickerDiv.append(clickerBar);

counterField.innerText = "Orteils: " + mainScore;
counterField.style.justifySelf = "center";
clickerDiv.append(counterField);

clickerDiv.appendChild(SPSField);
clickerDiv.appendChild(SPCField);

// --- code ---
requestAnimationFrame(autoScore);

Shop.verifyAllButtons(mainShop.allButtons, mainScore);
