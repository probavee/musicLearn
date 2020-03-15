import * as Vex from "vexflow";
import { ReadVarExpr, NONE_TYPE } from '@angular/compiler';
export class KeyGeneration {
    VF = Vex.Flow;
    KEYS = ['a','b','c','d','e','f','g']; // KEYS
    OCTAVE = [1, 2, 3, 4, 5, 6, 7, 8] // OCTAVE on keyboards

    private name: string;
    private hauteur : string;
    private sharp : string; 
    
    constructor(){}

    generateNextKey(currKey: string, currOctave: number, interval: number, flat_sharp:number=0 ): string{

        let firstKeyIndex : number = this.KEYS.indexOf(currKey); // current key index (ie: 'c' -> 3)
        let nextKeyIndex : number = firstKeyIndex + this.randomInterval(interval); // 

        let octaveDiff : number;
        let keyDiff : number;

        let nextKey : string;
        let nextOctave: number;

        octaveDiff = ~~(nextKeyIndex / this.KEYS.length);
        keyDiff = nextKeyIndex % this.KEYS.length;
        nextOctave = currOctave + octaveDiff;
        //find random next KEYS based on interval and current key
        if (nextKeyIndex < 0) {
            // If the key is some OCTAVE below
            nextKey = this.KEYS[this.KEYS.length + keyDiff];
        } 
        else if(nextKeyIndex >this.KEYS.length){
            // Else if the key is some OCTAVE upper
            nextKey = this.KEYS[firstKeyIndex + keyDiff];
        }
        else {
            // Else, it belongs to the same OCTAVE
            nextKey = this.KEYS[nextKeyIndex];
        }
        
        
        return nextKey+"/"+nextOctave;

    }

    randomInterval(interval:number){
        let num = Math.floor(Math.random()*interval) ; // this will get a number between 0 and 'interval'
        num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
        return num
    }

    stringToStaveNote(keys:string[], duration: string,){
        //create VexFlow note
        return new this.VF.StaveNote({keys:keys, duration:duration});
    }

    firstKey(minOctvave: number = 2, maxOctave: number = 6){
        //slice is excusive so :
        maxOctave +=1;
        let possibleOctave= this.OCTAVE.slice(minOctvave, maxOctave);
        
        return this.KEYS[Math.floor(Math.random()*this.KEYS.length)] 
        + '/' + 
        possibleOctave[Math.floor(Math.random() * possibleOctave.length)];
    }

    generateListNote(){
        let firstKey = this.firstKey(3,5)
        
    }
    

}