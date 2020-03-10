import { Component, OnInit } from '@angular/core';
import * as Vex from 'vexflow';

@Component({
  selector: 'app-sheet-rendering',
  templateUrl: './sheet-rendering.component.html',
  styleUrls: ['./sheet-rendering.component.scss']
})
export class SheetRenderingComponent implements OnInit {

  public VF; 
  constructor() { }

  ngOnInit(): void {
    this.VF = Vex.Flow;
    let div = document.getElementById("boo");
    let renderer = new this.VF.Renderer(div, this.VF.Renderer.Backends.SVG);
    renderer.resize(500,500);
    let context = renderer.getContext();
    context.setFont("Arial",10,"");
    
    let stave = new this.VF.Stave(10, 40, 400);

    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();
  
  }

}
