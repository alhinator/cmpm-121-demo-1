import { incScore, updateSPS } from "./main";
//NEW: SHOP & SHOP BUTTON INTERFACE instead of shop button class

//refactored version to be data-driven
export interface Item {
    name: string,
    value: number, 
    cost: number,
};

export interface Shop {
    parentDiv:HTMLDivElement,
    allButtons:ShopButton[],
    
}

export interface ShopButton {
    item:Item, //contains name, value, default cost
    multCost:number, //the exponentially scaling cost
    numPurchased:number, //how many we own of this item
    divElement:HTMLDivElement,
    buttonElement:HTMLButtonElement, 
    counterText:HTMLParagraphElement,
}

export function verifyAllButtons(buttons:ShopButton[], score:number){
    buttons.forEach(butt => {
        if(score >= butt.multCost) {butt.buttonElement.disabled = false}
        else { butt.buttonElement.disabled = true}
    });
}

export function valuePerSecond(buttons:ShopButton[]):number{
    let sum = 0
    buttons.forEach(element => {
        sum += element.item.value * element.numPurchased;
    });
    return sum;

}

export function activateHTML(_shop:Shop,){
    const buttons:ShopButton[] = _shop.allButtons
    buttons.forEach(b => {
        b.divElement.setAttribute("class", "shopElement")
        b.buttonElement.innerText =
        "Purchase " +
        b.item.name +
        " (" +
        b.item.value +
        " O/s) for " +
        b.multCost +
        " Orteils.";
        updateOwnedText(b)

        //set onclick
        b.buttonElement.onclick = function(){
            purchaseAButton(b)
        }

        //now child them all
        b.divElement.appendChild(b.buttonElement)
        b.divElement.appendChild(b.counterText)
        _shop.parentDiv.appendChild(b.divElement)
    });
}


function updateOwnedText(s:ShopButton){
    s.buttonElement.innerText =
        "Purchase " +
        s.item.name +
        " (" +
        s.item.value +
        " O/s) for " +
        s.multCost +
        " Orteils.";
    s.counterText.innerText = " Currently Owned: " + s.numPurchased;
}

function purchaseAButton(b:ShopButton) {
    console.log("in purchaseAbutton");
    incScore(-b.multCost);
    updatePrice(b)
    updateOwnedText(b)
    updateSPS()
}

function updatePrice(b:ShopButton){
    b.numPurchased++
    b.multCost = (Number) ((b.item.cost * Math.pow(1.15, b.numPurchased)).toFixed(2))
    
}