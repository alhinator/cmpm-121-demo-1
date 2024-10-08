import "./style.css";
import { AutoManager } from "./AutoScoreSource";
import { ShopButton } from "./ShopButton";


const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "orteil42 clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

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
app.append(clickerBar);

//add the field that tracks score
const counterField = document.createElement("h2");
counterField.innerText = "Orteils: " + mainScore;
counterField.style.justifySelf = "left"
app.append(counterField);

//add the field that tracks score per second
const SPSField = document.createElement("h3")
app.appendChild(SPSField)
export function updateSPS():void{
    SPSField.innerText = "Total Orteils per second: " + AutoManager.valuePerSecond
}

//add the field that holds buttons
const buttonField = document.createElement("div");
buttonField.style.float = "left"
app.append(buttonField);




//start the anim frame cycle. now updates frame count from within AutoManager
requestAnimationFrame(AutoManager.incAutoScores);

//NO LONGER ADD "Default" autoscorer

//SHOP


new ShopButton("France", 1, 10, buttonField);
new ShopButton("Twitter", 2, 100, buttonField);
new ShopButton("CookieClicker", 50, 1000, buttonField);

ShopButton.verifyAllButtons();
