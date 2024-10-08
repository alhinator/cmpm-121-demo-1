// //deprecated
// import { AutoManager, AutoScoreSource } from "./AutoScoreSource";
// import { getMS, incScore } from "./main";
// export class ShopButton {
//     static allShopButtons: ShopButton[] = [];
//     protected privName: string;
//     protected privValue: number;
//     protected baseCost: number;
//     protected multCost: number;
//     protected privDiv: HTMLDivElement;
//     protected privButtonElement: HTMLButtonElement;
//     protected privButtonCounterText: HTMLParagraphElement;
//     protected numPurchased:number = 0;
//     constructor(
//         _name: string,
//         _value: number,
//         _cost: number,
        
//         _parent_DOM: HTMLElement
//     ) {
//         //assign basic values
//         this.privName = _name;
//         this.privValue = _value;
//         this.baseCost = _cost;
//         this.multCost = _cost

//         //init html stuff
//         this.privDiv = document.createElement("div")
//         this.privDiv.setAttribute("class", "shopElement")

//         this.privButtonElement = document.createElement("button");
//         this.privButtonElement.innerText =
//         "Purchase " +
//         this.name +
//         " (" +
//         _value +
//         " O/s) for " +
//         this.multCost +
//         " Orteils.";
//         this.privDiv.appendChild(this.privButtonElement)

        
        
//         this.privButtonCounterText = document.createElement("p")
//         this.updateOwnedText()
//         this.privDiv.appendChild(this.privButtonCounterText)

//         _parent_DOM.appendChild(this.privDiv);

//         this.privButtonElement.onclick = function () {
//             ShopButton.purchaseAButton(_name);
//         };
//         ShopButton.allShopButtons.push(this);
//     }
//     //accessors
//     get name(): string {
//         return this.privName;
//     }
//     get value(): number {
//         return this.privValue;
//     }
//     get cost(): number {
//         return this.multCost;
//     }
//     get originalCost():number {
//         return this.baseCost
//     }
//     //helpers
//     static purchaseAButton(_name: string) {
//         console.log("in purchaseAbutton");
//         ShopButton.allShopButtons.forEach((element) => {
//             if(element.name == _name){
//                 AutoManager.addSource(new AutoScoreSource(element.name, element.value, 1));
//                 incScore(-element.multCost);
//                 element.updatePrice()
//                 element.updateOwnedText()
//             }
            
//         });        
//     }
//     updatePrice(){
//         this.numPurchased++
//         this.multCost = (Number) ((this.baseCost * Math.pow(1.15, this.numPurchased)).toFixed(2))
        
//     }
//     updateOwnedText(){
//         this.privButtonElement.innerText =
//             "Purchase " +
//             this.name +
//             " (" +
//             this.privValue +
//             " O/s) for " +
//             this.multCost +
//             " Orteils.";
//         this.privButtonCounterText.innerText = " Currently Owned: " + this.numPurchased;
//     }
    
//     toggleClickable() {
//         if (getMS() >= this.multCost) {
//             this.privButtonElement.disabled = false;
//         } else {
//             this.privButtonElement.disabled = true;
//         }
//     }

//     static verifyAllButtons() {
//         ShopButton.allShopButtons.forEach((element) => {
//             element.toggleClickable();
//         });
//     }
// }

