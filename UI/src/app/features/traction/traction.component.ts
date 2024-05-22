import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TractionService } from './services/traction.service';
import { Subject, takeUntil } from 'rxjs';
import { TractionDto } from 'src/app/domain/traction/traction-dto.models';
import { ProveDto } from 'src/app/domain/prove/prove-dto.models';
import { Traction } from 'src/app/domain/traction/traction.models';

@Component({
  selector: 'app-traction',
  templateUrl: './traction.component.html',
  styleUrls: ['./traction.component.scss']
})
export class TractionComponent implements OnInit {

  @Input() entity!: Traction;
  @Input() id!: number;
  @Input() tractionForm!: FormGroup;  

  ngOnInit(): void {
    this.createFormGroup();
    this.applyValues();
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

  applyValues() {
    if(!this.entity || !this.id) {
        return;
    }

    this.tractionForm.patchValue({
      "idSquad": this.id,
      "weight": this.entity.weight,
    });
  }

  private createFormGroup() {
    this.tractionForm.addControl("idSquad", new FormControl(this.id, []));
    this.tractionForm.addControl("weight", new FormControl('', []));
  }
}
