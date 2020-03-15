import * as Vex from "vexflow";
import { ReadVarExpr } from '@angular/compiler';
export class NoteGeneration {
    VF = Vex.Flow;
    private name: string;
    private hauteur : string;
    private sharp : string; 
    
    keys = ['a','b','c','d','e','f','g']; // keys
    octave = [1, 2, 3, 4, 5, 6, 7, 8] // octave on keyboards
    constructor(){}

    generate_note(firstnote: string, pitch: string, flat_sharp:number, interval: number): string{


        let firstNoteIndex : number = this.keys.indexOf(firstnote);
        let nextNoteIndex : number = firstNoteIndex + this.random_interval(interval);
        let nextNote : string;

        //find random next keys based on interval and current keys
        if (nextNoteIndex < 0) {
            // If the key is some octave below

            nextNote = this.keys[this.keys.length + nextNoteIndex];
        } 
        else if(nextNoteIndex >this.keys.length){
            // Else if the key is an octave upper
            nextNote = this.keys[nextNoteIndex- this.keys.length];
        }
        else {
            // Else, it belongs to the same octave
            nextNote = this.keys[nextNoteIndex];
        }
        
        
        return nextNote;


    }

    random_interval(interval:number){
        let num = Math.floor(Math.random()*interval) + 1; // this will get a number between 1 and 99
        num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
        return num
    }

    stringToStaveNote(keys:string[], duration: string, pitch: number){
        //create VexFlow note
        return new this.VF.StaveNote({keys:keys, duration:duration, octave_shift:pitch});
    }

    firstNote(minOctvave: number = 2, maxOctave: number = 6){
        //slice is excusive so :
        maxOctave +=1;

        return this.keys[Math.floor(Math.random()*this.keys.length)] 
        + '/' + 
        this.octave.slice(minOctvave, maxOctave)[Math.floor(Math.random() * this.octave.slice(minOctvave, maxOctave).length)];
    }
    

}