import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "orteil42 clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//this score is the main score, should never be modified directly, rather use incScore
let mainScore: number = 0;
let scoreDisplay: string = "0";
//mainScore access func
function incScore(add: number): void {
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
function updateSPS():void{
    SPSField.innerText = "Total Orteils per second: " + AutoManager.valuePerSecond
}

//add the field that holds buttons
const buttonField = document.createElement("div");
buttonField.style.float = "left"
app.append(buttonField);

//automatic scoring
//template for autoscore source
class AutoScoreSource {
    protected privName: string;
    protected privBaseValue: number;
    protected privQuantity: number;
    constructor(_name: string, _value: number, _quantity: number) {
        this.privName = _name;
        this.privBaseValue = _value;
        this.privQuantity = _quantity;
    }
    //accessors
    get name(): string {
        return this.privName;
    }
    get value(): number {
        return this.privBaseValue;
    }
    get quantity(): number {
        return this.privQuantity;
    }
    //setters
    purchase() {
        this.privQuantity ++;
    }
}

//the autoManager converts shop clicks into score sources, and does the incrementation during animation frames.
class AutoManager {
    protected static scSources: AutoScoreSource[] = [];
    //getters
    static get sources() {
        //TODO
        return AutoManager.scSources;
    }
    static get prettySources() {
        return null;
    }

    //setters
    static addSource(_new_src: AutoScoreSource) {
        //check if a source by the same name already exists
        let dupe = false;
        AutoManager.scSources.forEach((element) => {
            if (element.name == _new_src.name) {
                dupe = true;
                //dupe? purchase another.
                element.purchase();
            }
        });
        if (dupe) {
            //update score per second tracker
            updateSPS()
            return;
        }
        //if no duplicate names are found, add the source as a new one to the list.
        AutoManager.scSources.push(_new_src);
        //need to update SPS separately here due to return
        updateSPS()
        return false;
    }

    //the incrementer
    static incAutoScores(
        _time: number,
        _arr: AutoScoreSource[] = AutoManager.scSources
    ) {
        const delta = (performance.now() - frameCounterTimer) / 1000; //get the delta between frames in terms of seconds
        //console.log(delta)
        frameCounterTimer = performance.now();

        let sum = 0;
        _arr.forEach((element) => {
            sum += element.value * element.quantity * delta; // now only adds amount times delta
        });
        incScore(sum);
        requestAnimationFrame(AutoManager.incAutoScores);
    }
    static get valuePerSecond() {
        let retVal = 0;
        AutoManager.scSources.forEach((element) => {
            retVal += element.value * element.quantity;
        });
        return retVal;
    }
}
//NO LONGER ADD DEFAULT
//need to add smth to verify no duplicates. will add during purchase stage
// AutoManager.addSource(new AutoScoreSource("a", 1, 1))
// AutoManager.addSource(new AutoScoreSource("a", 1, 1))

let frameCounterTimer = 0;
requestAnimationFrame(AutoManager.incAutoScores);

//SHOP

class ShopButton {
    static allShopButtons: ShopButton[] = [];
    protected privName: string;
    protected privValue: number;
    protected baseCost: number;
    protected multCost: number;
    protected privButtonElement: HTMLButtonElement;
    protected privButtonCounterText: HTMLParagraphElement;
    protected numPurchased:number = 0;
    constructor(
        _name: string,
        _value: number,
        _cost: number,
        
        _parent_DOM: HTMLElement
    ) {
        this.privName = _name;
        this.privValue = _value;
        this.baseCost = _cost;
        this.multCost = _cost
        this.privButtonElement = document.createElement("button");
        _parent_DOM.appendChild(this.privButtonElement);
        this.privButtonElement.innerText =
            "Purchase " +
            this.name +
            " (" +
            _value +
            " O/s) for " +
            this.multCost +
            " Orteils.";
        this.privButtonCounterText = document.createElement("p")
        this.updateOwnedText()
        _parent_DOM.appendChild(this.privButtonCounterText)
        _parent_DOM.appendChild(document.createElement("br"))

        this.privButtonElement.onclick = function () {
            ShopButton.purchaseAButton(_name);
        };
        ShopButton.allShopButtons.push(this);
    }
    //accessors
    get name(): string {
        return this.privName;
    }
    get value(): number {
        return this.privValue;
    }
    get cost(): number {
        return this.multCost;
    }
    get originalCost():number {
        return this.baseCost
    }
    //helpers
    static purchaseAButton(_name: string) {
        console.log("in purchaseAbutton");
        ShopButton.allShopButtons.forEach((element) => {
            if(element.name == _name){
                AutoManager.addSource(new AutoScoreSource(element.name, element.value, 1));
                incScore(-element.multCost);
                element.updatePrice()
                element.updateOwnedText()
            }
            
        });        
    }
    updatePrice(){
        this.numPurchased++
        this.multCost = (Number) ((this.baseCost * Math.pow(1.15, this.numPurchased)).toFixed(2))
        
    }
    updateOwnedText(){
        this.privButtonElement.innerText =
            "Purchase " +
            this.name +
            " (" +
            this.privValue +
            " O/s) for " +
            this.multCost +
            " Orteils.";
        this.privButtonCounterText.innerText = " Currently Owned: " + this.numPurchased;
    }
    
    toggleClickable() {
        if (mainScore >= this.multCost) {
            this.privButtonElement.disabled = false;
        } else {
            this.privButtonElement.disabled = true;
        }
    }

    static verifyAllButtons() {
        // ShopButton.allShopButtons.forEach((element) => {
        //     element.toggleClickable();
        // });
    }
}

new ShopButton("France", 1, 10, buttonField);
new ShopButton("Twitter", 2, 100, buttonField);
new ShopButton("CookieClicker", 50, 1000, buttonField);

ShopButton.verifyAllButtons();
