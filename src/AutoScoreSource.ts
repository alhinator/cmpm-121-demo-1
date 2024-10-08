import { updateSPS, incScore } from "./main";
//automatic scoring
//template for autoscore source
export class AutoScoreSource {
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
export class AutoManager {
    protected static scSources: AutoScoreSource[] = [];
    protected static frameCounterTimer:number = 0
    //getters
    static get sources() {
        return AutoManager.scSources;
    }
    static get valuePerSecond() {
        let retVal = 0;
        AutoManager.scSources.forEach((element) => {
            retVal += element.value * element.quantity;
        });
        return retVal;
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
        const delta = (performance.now() - AutoManager.frameCounterTimer) / 1000; //get the delta between frames in terms of seconds
        //console.log(delta)
        AutoManager.frameCounterTimer = performance.now();

        let sum = 0;
        _arr.forEach((element) => {
            sum += element.value * element.quantity * delta; // now only adds amount times delta
        });
        incScore(sum);
        requestAnimationFrame(AutoManager.incAutoScores);
    }

}

