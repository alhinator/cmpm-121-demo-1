import "./style.css";
import * as Shop from "./Shop";
import { initialButtons, unlockableButtons } from "./ItemData";
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "orteil42 clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//add the field that holds buttons
const shopDiv = document.createElement("div");
shopDiv.setAttribute("class", "shop");
app.append(shopDiv);

//add clicker and info field
const clickerDiv = document.createElement("div");
clickerDiv.setAttribute("class", "clicker");
app.append(clickerDiv);


const mainShop: Shop.Shop = {
    parentDiv: shopDiv,
    allButtons: [],
};
mainShop.allButtons = initialButtons;
Shop.activateHTML(mainShop);

let mainScore: number = 0;
export function getMS(): number {
    return mainScore;
}
let scoreDisplay: string = "0";
export function incScore(add: number): void {
    mainScore += add;
    scoreDisplay = mainScore.toFixed(2);
    counterField.innerText = "Orteils: " + scoreDisplay;
    //now verify buttons
    Shop.verifyAllButtons(mainShop.allButtons, mainScore);
}

const clickerBar = document.createElement("h2");
const mainClicker = document.createElement("button");
mainClicker.setAttribute("class", "mainButton");
mainClicker.onclick = () => {
    incScore(Shop.valuePerClick(mainShop.allButtons));
};
mainClicker.innerHTML = "get more orteil42  ";
clickerBar.append(mainClicker);
clickerDiv.append(clickerBar);

//add the field that tracks score
const counterField = document.createElement("h2");
counterField.innerText = "Orteils: " + mainScore;
counterField.style.justifySelf = "left";
clickerDiv.append(counterField);

//add the field that tracks score per second
const SPSField = document.createElement("h3");
clickerDiv.appendChild(SPSField);
const SPCField = document.createElement("h3");
clickerDiv.appendChild(SPCField);

export function updateSPS(): void {
    SPSField.innerText =
        "Total Orteils per second: " + Shop.valuePerSecond(mainShop.allButtons);
}
export function updateSPC(): void {
    SPCField.innerText =
        "Total Orteils per click: " + Shop.valuePerClick(mainShop.allButtons);
}

let frameCounterTimer = 0;
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

requestAnimationFrame(autoScore);

Shop.verifyAllButtons(mainShop.allButtons, mainScore);
