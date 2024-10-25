import "./style.css";
import * as Shop from "./Shop";
import { initialButtons, unlockableButtons } from "./ItemData";

// --- html creation ---
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "orteil42 clicker";

const header = document.createElement("h1");

const shopDiv = document.createElement("div");

const clickerDiv = document.createElement("div");

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
    const delta = (performance.now() - frameCounterTimer) / 1000;
    frameCounterTimer = performance.now();
    let sum = 0;
    items.forEach((element) => {
        sum += element.item.value * element.numPurchased * delta;
    });
    incScore(sum);
    Shop.unlockCheck(mainScore, mainShop, unlockableButtons);
    requestAnimationFrame(autoScore);
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

mainClicker.setAttribute("class", "mainButton");
mainClicker.onclick = () => {
    incScore(Shop.valuePerClick(mainShop.allButtons));
};
mainClicker.innerHTML = "get more orteil42  ";
clickerBar.append(mainClicker);
clickerDiv.append(clickerBar);

counterField.innerText = "Orteils: " + mainScore;
counterField.style.justifySelf = "left";
clickerDiv.append(counterField);

clickerDiv.appendChild(SPSField);
clickerDiv.appendChild(SPCField);

// --- code ---
requestAnimationFrame(autoScore);

Shop.verifyAllButtons(mainShop.allButtons, mainScore);
