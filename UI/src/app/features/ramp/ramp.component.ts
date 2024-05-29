import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ramp } from 'src/app/domain/ramp/ramp.models';
import { RampService } from './services/ramp.service';
import { RampDto } from 'src/app/domain/ramp/ramp-dto.models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ramp',
  templateUrl: './ramp.component.html',
  styleUrls: ['./ramp.component.scss']
})
export class RampComponent implements OnInit {

  private readonly destroy$ : Subject<any> = new Subject();


  @Input() entity!: Ramp;
  @Input() id!: number;
  rampForm: FormGroup = new FormGroup({});

  private rampService = inject(RampService); 

  rampDto!: RampDto;

  
  ngOnInit(): void {
    this.createFormGroup(); 
    this.applyValues()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entity'] && changes['entity'].currentValue) {
      this.applyValues();      
    }
  }

  getScore() : string | undefined {
    return this.entity !== null && this.entity?.score !== null ? this.entity?.score.toString() : 'Sem nota.'
  }

  getRank() : string | undefined {
    return this.entity !== null && this.entity?.ranking !== null ? this.entity?.ranking.toString() : 'Sem rank.'
  }

  saveRamp() {
    this.rampService.saveRamp(this.bodyBuilderRamp())
    .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
               
      });
  }

  bodyBuilderRamp(): RampDto {    
    return { ...this.rampDto, ...this.rampForm.value } 
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
    this.rampForm.addControl("idSquad", new FormControl('', []));
    this.rampForm.addControl("distance", new FormControl('', []));
  }
}
