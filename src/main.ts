import "./style.css";
//import { AutoManager } from "./AutoScoreSource";
//import { ShopButton } from "./ShopButton";
import * as Shop from "./Shop";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "orteil42 clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//add the field that holds buttons
const shopDiv = document.createElement("div");
shopDiv.setAttribute("class", "shop")
app.append(shopDiv);


//add clicker and info field
const clickerDiv = document.createElement("div")
clickerDiv.setAttribute("class", "clicker")
app.append(clickerDiv)

const initialButtons:Shop.ShopButton[] = [
    {item: {name: "France", value: 1, cost: 10}, multCost:10, numPurchased:0, divElement:document.createElement("div"), buttonElement:document.createElement("button"), counterText:document.createElement("p")},
    {item:  {name: "Twitter", value: 2, cost: 100}, multCost:100, numPurchased:0, divElement:document.createElement("div"), buttonElement:document.createElement("button"), counterText:document.createElement("p")},
    {item: {name: "Cookie Clicker", value: 50, cost: 1000}, multCost:1000, numPurchased:0, divElement:document.createElement("div"), buttonElement:document.createElement("button"), counterText:document.createElement("p")},
]
const unlockableButtons:Shop.ShopButton[] = [
    {item: {name: "Tumblr", value: 5, cost: 50}, multCost:50, numPurchased:0, divElement:document.createElement("div"), buttonElement:document.createElement("button"), counterText:document.createElement("p")},

]

const mainShop:Shop.Shop = {
    parentDiv:shopDiv,
    allButtons:[]
}
mainShop.allButtons = initialButtons;
Shop.activateHTML(mainShop)


//this score is the main score, should never be modified directly, rather use incScore
let mainScore: number = 0;
export function getMS():number {return mainScore}
let scoreDisplay: string = "0";
//mainScore access func
export function incScore(add: number): void {
    mainScore += add;
    scoreDisplay = mainScore.toFixed(2)
    counterField.innerText = "Orteils: " + scoreDisplay;
    //now verify buttons
    Shop.verifyAllButtons(mainShop.allButtons, mainScore);
}

//add the clicker bar, clicker, and set the default value for clicks.
const clickValue = 1;
const clickerBar = document.createElement("h2");
const mainClicker = document.createElement("button");
mainClicker.setAttribute("class", "mainButton")
mainClicker.onclick = () => {
    incScore(clickValue);
};
mainClicker.innerHTML = "get more orteil42  ";
clickerBar.append(mainClicker);
clickerDiv.append(clickerBar);

//add the field that tracks score
const counterField = document.createElement("h2");
counterField.innerText = "Orteils: " + mainScore;
counterField.style.justifySelf = "left"
clickerDiv.append(counterField);

//add the field that tracks score per second
const SPSField = document.createElement("h3")
clickerDiv.appendChild(SPSField)

export function updateSPS():void{
    SPSField.innerText = "Total Orteils per second: " + Shop.valuePerSecond(mainShop.allButtons)
}

//start the anim frame cycle.
let frameCounterTimer = 0
 function autoScore(_time:number, items:Shop.ShopButton[] = mainShop.allButtons){
    const delta = (performance.now() - frameCounterTimer) / 1000; //get the delta between frames in terms of seconds
    frameCounterTimer = performance.now()
    //console.log(delta)
    let sum = 0;
    items.forEach((element) => {
        sum += element.item.value * element.numPurchased * delta;
    })
    incScore(sum)
    Shop.unlockCheck(mainScore, mainShop, unlockableButtons)
    requestAnimationFrame(autoScore)
}

requestAnimationFrame(autoScore);

Shop.verifyAllButtons(mainShop.allButtons, mainScore);
