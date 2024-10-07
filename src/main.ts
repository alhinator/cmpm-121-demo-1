import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "orteil42 clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//this score is the main score, should never be modified directly, rather use incScore
let mainScore:number = 0;
let scoreDisplay:string = "0";
//mainScore access func
function incScore(add:number):void{ 
    mainScore += add
    scoreDisplay = mainScore.toPrecision(3).toString()
    counterField.innerText = "Orteils: " + scoreDisplay
}

//add the clicker bar, clicker, and set the default value for clicks.
const clickValue = 1;
const clickerBar = document.createElement("h2");
const mainClicker = document.createElement("button");
mainClicker.onclick = ()=> {incScore(clickValue)}
mainClicker.innerHTML = "get more orteil42 🥖";
clickerBar.append(mainClicker);
app.append(clickerBar);

//add the field that tracks score
const counterField = document.createElement("div");
counterField.innerText = "Orteils: " + mainScore;
app.append(counterField)


//automatic scoring
//template for autoscore source
class AutoScoreSource{
    name:string;
    baseValue:number;
    quantity:number;
    constructor(_name:string, _value:number, _quantity:number){
        this.name = _name;
        this.baseValue = _value;
        this.quantity = _quantity;
    }
    //accessors
    public getName():string{
        return this.name;
    }
    public getValue():number{
        return this.baseValue * this.quantity;
    }
    public getQuantity():number{
        return this.quantity
    }
    //setters
    public createMore(_q:number){
        this.quantity += _q
    }
}
const autoScoreSources:AutoScoreSource[] = []
//add default:1
//need to add smth to verify no duplicates. will add during purchase stage
autoScoreSources.push(new AutoScoreSource("default", 1, 1))

let frameCounterTimer = 0;
requestAnimationFrame(incAutoScores)

function incAutoScores(_time:number, _arr:AutoScoreSource[] = autoScoreSources){
    const delta = (performance.now() - frameCounterTimer) / 1000; //get the delta between frames in terms of seconds
    console.log(delta)
    frameCounterTimer = performance.now()

    let sum = 0;
    _arr.forEach(element => {
        sum += element.getValue() * delta; // now only adds amount times delta
    });
    incScore(sum)
    requestAnimationFrame(incAutoScores)
}