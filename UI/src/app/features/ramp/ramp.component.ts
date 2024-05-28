import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ramp } from 'src/app/domain/ramp/ramp.models';

@Component({
  selector: 'app-ramp',
  templateUrl: './ramp.component.html',
  styleUrls: ['./ramp.component.scss']
})
export class RampComponent implements OnInit {

  @Input() entity!: Ramp;
  @Input() id!: number;
  @Input() rampForm!: FormGroup;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setFullHeight();
  }


  constructor(private el: ElementRef, private renderer: Renderer2) {
    
  }

  ngAfterViewInit() {
    this.setFullHeight();
  }

  setFullHeight() {
    const windowHeight = window.innerHeight;
    this.renderer.setStyle(this.el.nativeElement, 'height', windowHeight + 'px');
  }
  
  ngOnInit(): void {
    this.createFormGroup(); 
    this.applyValues()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entity'] && changes['entity'].currentValue) {
      console.log(this.entity)
      this.applyValues();      
    }
  }

  getScore() : string | undefined {
    return this.entity !== null && this.entity?.score !== null ? this.entity?.score.toString() : 'Sem nota.'
  }

  getRank() : string | undefined {
    return this.entity !== null && this.entity?.ranking !== null ? this.entity?.ranking.toString() : 'Sem rank.'
  }

  applyValues() {
    
    if(!this.entity || !this.id) {
        return;
    }

    this.rampForm.patchValue({
      "idSquad": this.id,
      "distance": this.entity.distance
    });    
  }

  private createFormGroup() {
    this.rampForm.addControl("idSquad", new FormControl(this.id, []));
    this.rampForm.addControl("distance", new FormControl('', []));
  }
}
