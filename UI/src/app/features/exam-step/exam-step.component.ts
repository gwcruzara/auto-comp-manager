import { Component, OnInit, inject } from '@angular/core';
import { SquadService } from '../squad/services/squad.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProveDto } from 'src/app/domain/prove/prove-dto.models';
import { RampService } from '../ramp/services/ramp.service';
import { RampDto } from 'src/app/domain/ramp/ramp-dto.models';
import { FormGroup } from '@angular/forms';
import { TractionService } from '../traction/services/traction.service';
import { TractionDto } from 'src/app/domain/traction/traction-dto.models';
import { SpeedService } from '../speed/services/speed.service';
import { SpeedDto } from 'src/app/domain/speed/speed-dto.models';

@Component({
  selector: 'app-exam-step',
  templateUrl: './exam-step.component.html',
  styleUrls: ['./exam-step.component.scss']
})
export class ExamStepComponent implements OnInit{

  private readonly $onDestroy : Subject<any> = new Subject();

  private squadService = inject(SquadService); 
  private rampService = inject(RampService); 
  private tractionService = inject(TractionService); 
  private speedService = inject(SpeedService); 
  private activedRoute = inject(ActivatedRoute);

  rampForm: FormGroup = new FormGroup({});
  tractionForm: FormGroup = new FormGroup({});
  speedForm: FormGroup = new FormGroup({});

  id!: number;
  entity!: ProveDto;
  rampDto!: RampDto;
  tractionDto!: TractionDto;
  speedDto!: SpeedDto;


  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.params["id"];

    if(this.id) {
      this.squadService.getProve(this.id).pipe(takeUntil(this.$onDestroy)).subscribe(response => {
          this.entity = response;
      });
    }
  }

  saveRamp() {
    this.rampService.saveRamp(this.bodyBuilderRamp())
    .pipe(takeUntil(this.$onDestroy))
      .subscribe(x => {
          this.entity.ramp = x;        
      });
  }

  saveTraction() {
    this.tractionService.saveTraction(this.bodyBuilderTraction())
    .pipe(takeUntil(this.$onDestroy))
      .subscribe(x => {
          this.entity.traction = x; 
      });
  }

  saveSpeed() {
    this.speedService.saveSpeed(this.bodyBuilderSpeed())
    .pipe(takeUntil(this.$onDestroy))
      .subscribe(x => {
          this.entity.speed = x;
      });
  }

  bodyBuilderTraction(): TractionDto {
    return {...this.tractionDto, ...this.tractionForm.value} 
  }

  bodyBuilderRamp(): RampDto {    
    return { ...this.rampDto, ...this.rampForm.value } 
  }
  
  bodyBuilderSpeed(): SpeedDto {
    return {...this.speedDto, ...this.speedForm.value} 
  }
}
