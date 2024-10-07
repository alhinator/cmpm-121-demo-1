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
    scoreDisplay = mainScore.toLocaleString('fullwide', {maximumFractionDigits:2})
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
    protected privName:string;
    protected privBaseValue:number;
    protected privQuantity:number;
    constructor(_name:string, _value:number, _quantity:number){
        this.privName = _name;
        this.privBaseValue = _value;
        this.privQuantity = _quantity;
    }
    //accessors
    get name():string{
        return this.privName;
    }
    get value():number{
        return this.privBaseValue * this.quantity;
    }
    get quantity():number{
        return this.privQuantity
    }
    //setters
    public createMore(_q:number){
        this.privQuantity += _q
    }
}
const autoScoreSources:AutoScoreSource[] = []
//NO LONGER ADD DEFAULT
//need to add smth to verify no duplicates. will add during purchase stage
//autoScoreSources.push(new AutoScoreSource("default", 1, 1))

let frameCounterTimer = 0;
requestAnimationFrame(incAutoScores)

function incAutoScores(_time:number, _arr:AutoScoreSource[] = autoScoreSources){
    const delta = (performance.now() - frameCounterTimer) / 1000; //get the delta between frames in terms of seconds
    console.log(delta)
    frameCounterTimer = performance.now()

    let sum = 0;
    _arr.forEach(element => {
        sum += element.value * delta; // now only adds amount times delta
    });
    incScore(sum)
    requestAnimationFrame(incAutoScores)
}



//SHOP

// class ShopButton{
//     name:string;
//     value:number;
//     cost:number;
//     constructor(){

//     }
// }



