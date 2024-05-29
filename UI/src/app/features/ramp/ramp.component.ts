import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ramp } from 'src/app/domain/ramp/ramp.models';
import { RampService } from './services/ramp.service';
import { RampDto } from 'src/app/domain/ramp/ramp-dto.models';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RankingDto } from 'src/app/domain/ranking/ranking-dto.models';

@Component({
  selector: 'app-ramp',
  templateUrl: './ramp.component.html',
  styleUrls: ['./ramp.component.scss']
})
export class RampComponent implements OnInit {

  private readonly destroy$ : Subject<any> = new Subject();
  
  private rampService = inject(RampService); 
  private activedRoute = inject(ActivatedRoute); 

  rampForm: FormGroup = new FormGroup({});
  
  entity?: Ramp;
  rampDto!: RampDto;
  rankingDto: RankingDto[] = [];
  squadId!: number;

  ngOnInit(): void {
    this.squadId = this.activedRoute.snapshot.params["id"];
    this.getRamp();
    this.getOverallRank();
    this.createFormGroup(); 
  }

  saveRamp() {
    this.rampService.saveRamp(this.bodyBuilderRamp())
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
        this.applyValues(response);
        this.getOverallRank();
    });
  }

  getRamp() {
    this.rampService.getRamp(this.squadId)
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
      if(response.id){
        this.applyValues(response);
      }        
    });
  }

  getOverallRank() {
    this.rampService.getRank()
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

  bodyBuilderRamp(): RampDto {    
    return { ...this.rampDto, ...this.rampForm.value } 
  }

  applyValues(entity: Ramp) {

    this.entity = entity;
    
    if(!entity || !this.squadId) {
        return;
    }

    this.rampForm.patchValue({
      "idSquad": this.squadId,
      "distance": entity.distance
    });    
  }

  private createFormGroup() {
    this.rampForm.addControl("idSquad", new FormControl(this.squadId, []));
    this.rampForm.addControl("distance", new FormControl('', []));
  }
}
