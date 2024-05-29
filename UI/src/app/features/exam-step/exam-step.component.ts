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
import { RankingService } from '../ranking/services/ranking.service';
import { RankingDto } from 'src/app/domain/ranking/ranking-dto.models';

@Component({
  selector: 'app-exam-step',
  templateUrl: './exam-step.component.html',
  styleUrls: ['./exam-step.component.scss']
})
export class ExamStepComponent implements OnInit{

  private readonly destroy$ : Subject<any> = new Subject();

  private squadService = inject(SquadService); 
  private tractionService = inject(TractionService); 
  private speedService = inject(SpeedService); 
  private rankingService = inject(RankingService);
  private activedRoute = inject(ActivatedRoute);

  rampForm: FormGroup = new FormGroup({});
  tractionForm: FormGroup = new FormGroup({});
  speedForm: FormGroup = new FormGroup({});

  id!: number;
  entity!: ProveDto;
  tractionDto!: TractionDto;
  speedDto!: SpeedDto;
  rankingDto: RankingDto[] = []


  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.params["id"];

    this.getRank();
    
    if(this.id) {
      this.squadService.getProve(this.id)
      .pipe(takeUntil(this.destroy$))
        .subscribe(response => {
          this.entity = response;
      });
    }    
  }



  saveTraction() {
    this.tractionService.saveTraction(this.bodyBuilderTraction())
    .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
          this.entity.traction = response; 
      });
  }

  saveSpeed() {
    this.speedService.saveSpeed(this.bodyBuilderSpeed())
    .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
          this.entity.speed = response;
      });
  }

  getRank() {
    this.rankingService.getOverallRanking()
    .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
          this.rankingDto = response;
      });
  }

  bodyBuilderTraction(): TractionDto {
    return {...this.tractionDto, ...this.tractionForm.value} 
  }


  
  bodyBuilderSpeed(): SpeedDto {
    return {...this.speedDto, ...this.speedForm.value} 
  }
}
