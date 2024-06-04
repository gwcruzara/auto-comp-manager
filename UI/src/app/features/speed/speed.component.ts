import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Speed } from 'src/app/domain/speed/speed.models';
import { Subject, takeUntil } from 'rxjs';
import { SpeedService } from './services/speed.service';
import { SpeedDto } from 'src/app/domain/speed/speed-dto.models';
import { ActivatedRoute } from '@angular/router';
import { RankingDto } from 'src/app/domain/ranking/ranking-dto.models';

@Component({
  selector: 'app-speed',
  templateUrl: './speed.component.html',
  styleUrls: ['./speed.component.scss'],
})
export class SpeedComponent implements OnInit {

  private readonly destroy$ : Subject<any> = new Subject();  
  
  private speedService = inject(SpeedService); 
  private activedRoute = inject(ActivatedRoute); 
    
  speedForm: FormGroup = new FormGroup({});
  
  entity: Speed | null = null;
  speedDto!: SpeedDto;
  rankingDto: RankingDto[] = [];
  squadId!: number;  

  penalties = [
    {
      Description: 'Queima de Largada: 3(s)'
    },
    {
      Description: 'Fora da Linha: 2(s)'
    },
    {
      Description: 'Cortar Caminho: 5(s)'
    }
  ]

  ngOnInit(): void {
    this.squadId = this.activedRoute.snapshot.params["id"];
    this.getSpeed();
    this.getOverallRank();
    this.createFormGroup();    
  }

  saveSpeed() {
    this.speedService.saveSpeed(this.bodyBuilderSpeed())
    .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.applyValues(response);
        this.getOverallRank();
      });
  }

  remove() {
    this.speedService.remove(this.squadId)
    .pipe(takeUntil(this.destroy$))
     .subscribe(response => {        
        if (response === null) {
          this.speedForm.reset({
            "idSquad": this.squadId,
            "time": 0,
            "burnedStart": false,
            "outsideLine": 0,
            "cutWay": 0,
          });

          this.entity = null;

          this.getOverallRank();
        }
    });
  }

  changeQuantity(num: number, formControl: string) {
    const original = this.speedForm.get(formControl)?.value;
    if (original + num >= 0) {
      this.speedForm.get(formControl)?.setValue(original + num);
    }
  }

  getSpeed() {
    this.speedService.getSpeed(this.squadId)
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
      if (response.id){
        this.applyValues(response);        
      }
    });
  }

  getOverallRank() {
    this.speedService.getRank()
    .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
          this.rankingDto = response;
      });
  }

  getTimeWithoutPenalties() {
    return this.entity !== null && this.entity?.timeWithoutPenalties !== null ? `${this.entity?.timeWithoutPenalties.toString()}(s)` : 'Não existente.'
  }

  getOutsideLineAmount() {
    console.log(this.entity)
    return this.entity !== null && this.entity?.outsideLine !== null ? `${this.entity?.outsideLine.toString()}x` : 'Não existente.'
  }

  getCutWayAmount() {
    return this.entity !== null && this.entity?.cutWay !== null ? `${this.entity?.cutWay.toString()}x` : 'Não existente.'
  }
  
  bodyBuilderSpeed(): SpeedDto {
    return {...this.speedDto, ...this.speedForm.value} 
  }
  
  applyValues(entity: Speed) {

    this.entity = entity;

    if(!this.entity || !this.squadId) {      
        return;
    }

    this.speedForm.patchValue({
      "idSquad": this.squadId,
      "time": entity.time,
      "burnedStart": entity.burnedStart,
      "outsideLine": 0,
      "cutWay": 0
    });

    entity.burnedStart ? this.speedForm.get('burnedStart')?.disable() : this.speedForm.get('burnedStart')?.enable();    
  }

  private createFormGroup() {
    this.speedForm.addControl("idSquad", new FormControl(this.squadId, []));
    this.speedForm.addControl("time", new FormControl(0, []));
    this.speedForm.addControl("burnedStart", new FormControl(false, []));
    this.speedForm.addControl("outsideLine", new FormControl(0, [Validators.min(0)]));
    this.speedForm.addControl("cutWay", new FormControl(0, [Validators.min(0)]));
  }
}
