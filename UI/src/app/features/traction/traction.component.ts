import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TractionService } from './services/traction.service';
import { Subject, takeUntil } from 'rxjs';
import { TractionDto } from 'src/app/domain/traction/traction-dto.models';
import { Traction } from 'src/app/domain/traction/traction.models';
import { ActivatedRoute } from '@angular/router';
import { RankingDto } from 'src/app/domain/ranking/ranking-dto.models';

@Component({
  selector: 'app-traction',
  templateUrl: './traction.component.html',
  styleUrls: ['./traction.component.scss']
})
export class TractionComponent implements OnInit {

  private readonly destroy$ : Subject<any> = new Subject();

  private tractionService = inject(TractionService); 
  private activedRoute = inject(ActivatedRoute); 
  
  tractionForm: FormGroup = new FormGroup({});  
  
  entity!: Traction;
  tractionDto!: TractionDto;
  rankingDto: RankingDto[] = [];
  squadId!: number;

  ngOnInit(): void {
    this.squadId = this.activedRoute.snapshot.params["id"];
    this.getTraction();
    this.getOverallRank();
    this.createFormGroup();    
  }

  saveTraction() {
    this.tractionService.saveTraction(this.bodyBuilderTraction())
    .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.applyValues(response);
        this.getOverallRank();
      });
  }

  getTraction() {
    this.tractionService.getTraction(this.squadId)
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
      if(response.id){
        this.applyValues(response);
      }
    });
  }

  getOverallRank() {
    this.tractionService.getRank()
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

  bodyBuilderTraction(): TractionDto {
    return {...this.tractionDto, ...this.tractionForm.value} 
  }

  applyValues(entity: Traction) {
    this.entity = entity;
    if(!entity || !this.squadId) {
        return;
    }

    this.tractionForm.patchValue({
      "idSquad": this.squadId,
      "weight": entity.weight,
    });
  }

  private createFormGroup() {
    this.tractionForm.addControl("idSquad", new FormControl(this.squadId, []));
    this.tractionForm.addControl("weight", new FormControl('', []));
  }
}
