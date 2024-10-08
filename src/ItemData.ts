import * as Shop from "./Shop";

export const initialButtons: Shop.ShopButton[] = [
    {
        item: {
            name: "France",
            value: 1,
            cost: 10,
            unlockValue: 0,
            clickBonus: 0,
            description:
                "The country of France. Produces Orteil42s at a slow rate.",
        },
        multCost: 10,
        numPurchased: 0,
        divElement: document.createElement("div"),
        buttonElement: document.createElement("button"),
        counterText: document.createElement("p"),
        abbrElement: document.createElement("abbr"),
    },
    {
        item: {
            name: "Twitter",
            value: 2,
            cost: 100,
            unlockValue: 0,
            clickBonus: 0,
            description:
                "The social media platform Twitter (not X). Allows for the production and networking of Orteil42s.",
        },
        multCost: 100,
        numPurchased: 0,
        divElement: document.createElement("div"),
        buttonElement: document.createElement("button"),
        counterText: document.createElement("p"),
        abbrElement: document.createElement("abbr"),
    },
    {
        item: {
            name: "Cookie Clicker",
            value: 50,
            cost: 1000,
            unlockValue: 0,
            clickBonus: 0,
            description:
                "The game Cookie Clicker, made by developer Orteil42. Draws in Orteils at a more reasonable rate.",
        },
        multCost: 1000,
        numPurchased: 0,
        divElement: document.createElement("div"),
        buttonElement: document.createElement("button"),
        counterText: document.createElement("p"),
        abbrElement: document.createElement("abbr"),
    },
];

export const unlockableButtons: Shop.ShopButton[] = [
    {
        item: {
            name: "Tumblr",
            value: 10,
            cost: 500,
            unlockValue: 1000,
            clickBonus: 0,
            description:
                "The social media platform Tumblr. Attracts Orteil42s that may or may not be transgender?",
        },
        multCost: 500,
        numPurchased: 0,
        divElement: document.createElement("div"),
        buttonElement: document.createElement("button"),
        counterText: document.createElement("p"),
        abbrElement: document.createElement("abbr"),
    },
    {
        item: {
            name: "Orteil's Mom",
            value: 3,
            cost: 150,
            unlockValue: 500,
            clickBonus: 0,
            description:
                "Orteil42's Mother. Produces Orteils for slow but cheap.",
        },
        multCost: 150,
        numPurchased: 0,
        divElement: document.createElement("div"),
        buttonElement: document.createElement("button"),
        counterText: document.createElement("p"),
        abbrElement: document.createElement("abbr"),
    },
    {
        item: {
            name: "W3Schools Tutorial",
            value: 0,
            cost: 20,
            unlockValue: 1,
            clickBonus: 0.5,
            description:
                "A tutorial on typescript web programming. Allows for more efficient Orteil42 production.",
        },
        multCost: 20,
        numPurchased: 0,
        divElement: document.createElement("div"),
        buttonElement: document.createElement("button"),
        counterText: document.createElement("p"),
        abbrElement: document.createElement("abbr"),
    },
    {
        item: {
            name: "Orteil's Mouse",
            value: 0,
            cost: 1000,
            unlockValue: 5000,
            clickBonus: 10,
            description:
                "Orteil42's mouse. Surely allows for more effective Orteil-Click ratios.",
        },
        multCost: 1000,
        numPurchased: 0,
        divElement: document.createElement("div"),
        buttonElement: document.createElement("button"),
        counterText: document.createElement("p"),
        abbrElement: document.createElement("abbr"),
    },
];
