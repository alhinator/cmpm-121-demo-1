import "./style.css";
import { AutoManager } from "./AutoScoreSource";
import { ShopButton } from "./ShopButton";


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
    ShopButton.verifyAllButtons();
}

//add the clicker bar, clicker, and set the default value for clicks.
const clickValue = 1;
const clickerBar = document.createElement("h2");
const mainClicker = document.createElement("button");
mainClicker.onclick = () => {
    incScore(clickValue);
};
mainClicker.innerHTML = "get more orteil42 🥖";
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
    SPSField.innerText = "Total Orteils per second: " + AutoManager.valuePerSecond
}




//start the anim frame cycle. now updates frame count from within AutoManager
requestAnimationFrame(AutoManager.incAutoScores);

//NO LONGER ADD "Default" autoscorer

//Add Shop Buttons and initially verify them (turn them off)
new ShopButton("France", 1, 10, shopDiv);
new ShopButton("Twitter", 2, 100, shopDiv);
new ShopButton("CookieClicker", 50, 1000, shopDiv);
new ShopButton("CookieClicker2", 50, 1000, shopDiv);
new ShopButton("CookieClicker3", 50, 1000, shopDiv);
new ShopButton("CookieClicker4", 50, 1000, shopDiv);


ShopButton.verifyAllButtons();
