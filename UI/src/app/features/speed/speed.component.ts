import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  
  entity!: Speed;
  speedDto!: SpeedDto;
  rankingDto: RankingDto[] = [];
  squadId!: number;  

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

  getSpeed() {
    this.speedService.getSpeed(this.squadId)
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
      if(response.id){
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

  getScore() : string {
    return this.entity !== undefined && this.entity?.score !== undefined ? this.entity?.score.toString() : 'Sem nota.'
  }

  getRank() : string {
    return this.entity !== undefined && this.entity?.ranking !== undefined ? `${this.entity?.ranking.toString()}°` : 'Sem rank.'
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
      "outsideLine": entity.outsideLine,
      "cutWay": entity.cutWay,
    });
  }

  private createFormGroup() {
    this.speedForm.addControl("idSquad", new FormControl(this.squadId, []));
    this.speedForm.addControl("time", new FormControl('', []));
    this.speedForm.addControl("burnedStart", new FormControl(false, []));
    this.speedForm.addControl("outsideLine", new FormControl(false, []));
    this.speedForm.addControl("cutWay", new FormControl(false, []));
  }
}
