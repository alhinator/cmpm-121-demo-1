import { incScore, updateSPS, updateSPC } from "./main";
//NEW: SHOP & SHOP BUTTON INTERFACE instead of shop button class

//refactored version to be data-driven
export interface Item {
    name: string;
    value: number;
    clickBonus: number;
    cost: number;
    unlockValue: number;
    description:string;
}

export interface Shop {
    parentDiv: HTMLDivElement;
    allButtons: ShopButton[];
}

export interface ShopButton {
    item: Item; //contains name, value, default cost
    multCost: number; //the exponentially scaling cost
    numPurchased: number; //how many we own of this item
    divElement: HTMLDivElement;
    buttonElement: HTMLButtonElement;
    counterText: HTMLParagraphElement;
    abbrElement:HTMLElement;
}

export function verifyAllButtons(buttons: ShopButton[], score: number) {
    buttons.forEach((butt) => {
        if (score >= butt.multCost) {
            butt.buttonElement.disabled = false;
        } else {
            butt.buttonElement.disabled = true;
        }
    });
}

export function valuePerSecond(buttons: ShopButton[]): number {
    let sum = 0;
    buttons.forEach((element) => {
        sum += element.item.value * element.numPurchased;
    });
    return sum;
}
export function valuePerClick(buttons: ShopButton[]): number {
    let sum = 1; //default  is 1
    buttons.forEach((element) => {
        sum += element.item.clickBonus * element.numPurchased;
    });
    return sum;
}

export function activateHTML(_shop: Shop) {
    const buttons: ShopButton[] = _shop.allButtons;
    buttons.forEach((b) => {
        b.divElement.setAttribute("class", "shopElement");

        updateOwnedText(b);

        b.abbrElement.setAttribute("title", b.item.description)

        //set onclick
        b.buttonElement.onclick = function () {
            purchaseAButton(b);
        };

        //now child them all
        b.abbrElement.appendChild(b.buttonElement);
        b.divElement.appendChild(b.abbrElement)
        b.divElement.appendChild(b.counterText);
        _shop.parentDiv.appendChild(b.divElement);
    });
}

function updateOwnedText(b: ShopButton) {
    const OCString =
        b.item.clickBonus > 0 ? " (" + b.item.clickBonus + " O/c) " : "";
    const OSString =
        b.item.value > 0 ? " (" + b.item.value + " O/s) " : "";

    b.buttonElement.innerText =
        "Purchase " +
        b.item.name +
        OSString +
        OCString +
        "for " +
        b.multCost +
        " Orteils.";
    b.counterText.innerText = " Currently Owned: " + b.numPurchased;
}

function purchaseAButton(b: ShopButton) {
    console.log("in purchaseAbutton");
    incScore(-b.multCost);
    updatePrice(b);
    updateOwnedText(b);
    if(b.item.clickBonus > 0){
        updateSPC();
    }
    if(b.item.value > 0){
        updateSPS();
    }
}

function updatePrice(b: ShopButton) {
    b.numPurchased++;
    b.multCost = Number(
        (b.item.cost * Math.pow(1.15, b.numPurchased)).toFixed(2)
    );
}

//unlock check unlocks certain shop options if the current score is above their base cost.
export function unlockCheck(
    _currScore: number,
    _shop: Shop,
    _listOfUnlocks: ShopButton[]
) {
    _listOfUnlocks.forEach((nu) => {
        if (
            _currScore >= nu.item.unlockValue &&
            !_shop.allButtons.includes(nu)
        ) {
            _shop.allButtons.push(nu);
            activateHTML(_shop);
        }
    });
}
