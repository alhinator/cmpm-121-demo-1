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
    {item: {name: "France", value: 1, cost: 10, unlockValue: 0, clickBonus:0}, multCost:10, numPurchased:0, divElement:document.createElement("div"), buttonElement:document.createElement("button"), counterText:document.createElement("p")},
    {item:  {name: "Twitter", value: 2, cost: 100, unlockValue: 0, clickBonus:0}, multCost:100, numPurchased:0, divElement:document.createElement("div"), buttonElement:document.createElement("button"), counterText:document.createElement("p")},
    {item: {name: "Cookie Clicker", value: 50, cost: 1000, unlockValue: 0, clickBonus:0}, multCost:1000, numPurchased:0, divElement:document.createElement("div"), buttonElement:document.createElement("button"), counterText:document.createElement("p")},
]
const unlockableButtons:Shop.ShopButton[] = [
    {item: {name: "Tumblr", value: 10, cost: 500, unlockValue: 1000, clickBonus:0}, multCost:500, numPurchased:0, divElement:document.createElement("div"), buttonElement:document.createElement("button"), counterText:document.createElement("p")},
    {item: {name: "Orteil's Mom", value: 3, cost: 150, unlockValue: 500, clickBonus:0}, multCost:150, numPurchased:0, divElement:document.createElement("div"), buttonElement:document.createElement("button"), counterText:document.createElement("p")},
    {item: {name: "W3Schools JS Tutorial", value: 0 , cost: 20, unlockValue: 1, clickBonus:0.5}, multCost:20, numPurchased:0, divElement:document.createElement("div"), buttonElement:document.createElement("button"), counterText:document.createElement("p")},
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

const clickerBar = document.createElement("h2");
const mainClicker = document.createElement("button");
mainClicker.setAttribute("class", "mainButton")
mainClicker.onclick = () => {
    incScore(Shop.valuePerClick(mainShop.allButtons));
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
const SPCField = document.createElement("h3")
clickerDiv.appendChild(SPCField)


export function updateSPS():void{
    SPSField.innerText = "Total Orteils per second: " + Shop.valuePerSecond(mainShop.allButtons)
}
export function updateSPC():void{
    SPCField.innerText = "Total Orteils per click: " + Shop.valuePerClick(mainShop.allButtons)
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
