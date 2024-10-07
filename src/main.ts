import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "orteil42 clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let mainScore:number = 0;

const clickerBar = document.createElement("h2");
const mainClicker = document.createElement("button");
const clickValue = 1;
mainClicker.onclick = ()=> {incCounter(clickValue)}
mainClicker.innerHTML = "get more orteil42 🥖";
clickerBar.append(mainClicker);
app.append(clickerBar);

const counterField = document.createElement("div");
counterField.innerText = "Orteils: " + mainScore;
app.append(counterField)

function incCounter(add:number):void{ 
    mainScore += add
    counterField.innerText = "Orteils: " + mainScore
}