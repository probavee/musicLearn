import { Component, OnInit } from '@angular/core';
import * as Vex from 'vexflow';

@Component({
  selector: 'app-sheet-rendering',
  templateUrl: './sheet-rendering.component.html',
  styleUrls: ['./sheet-rendering.component.scss']
})
export class SheetRenderingComponent implements OnInit {

  public VF = Vex.Flow;
  constructor() { }

  ngOnInit(): void {

    let div = document.getElementById("boo");
    let renderer = new this.VF.Renderer(div, this.VF.Renderer.Backends.SVG);
    renderer.resize(500,500);
    let context = renderer.getContext();
    context.setFont("Arial",10);
    
    let stave = new this.VF.Stave(10, 40, 400);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();
    var notes = [
      // A quarter-note C.
      new this.VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),
    
      // A quarter-note D.
      new this.VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
    
      // A quarter-note rest. Note that the key (b/4) specifies the vertical
      // position of the rest.
      new this.VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
    
      // A C-Major chord.
      new this.VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
    ];
    
    // Create a voice in 4/4 and add above notes
    var voice = new this.VF.Voice({num_beats: 4,  beat_value: 4});

    voice.addTickables(notes);
    
    // Format and justify the notes to 400 pixels.
    var formatter = new this.VF.Formatter().joinVoices([voice]).format([voice], 400);
    
    // Render voice
    voice.draw(context, stave);
  
  }

}
