import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Speed } from 'src/app/domain/speed/speed.models';
import { PenaltiesService } from '../penalties/services/traction.service';
import { Subject, takeUntil } from 'rxjs';
import { Penalties } from 'src/app/domain/penalties/penalties.model';

@Component({
  selector: 'app-speed',
  templateUrl: './speed.component.html',
  styleUrls: ['./speed.component.scss'],
})
export class SpeedComponent implements OnInit {

  @Input() entity!: Speed;
  @Input() id!: number;
  @Input() speedForm!: FormGroup;

  private destroy$ = new Subject();

  private penaltiesService = inject(PenaltiesService);

  public penalties: Penalties[] = [];

  ngOnInit(): void {
    this.createFormGroup();
    this.applyValues();
  }

  getPenaltiesList() {
    this.penaltiesService.getPenalties()
    .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.penalties = response;
      });
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

    this.speedForm.patchValue({
      "idSquad": this.id,
      "time": this.entity.time,
      "burnedStart": this.entity.burnedStart,
      "outsideLine": this.entity.outsideLine,
      "cutWay": this.entity.cutWay,
    });
  }

  private createFormGroup() {
    this.speedForm.addControl("idSquad", new FormControl(this.id, []));
    this.speedForm.addControl("time", new FormControl('', []));
    this.speedForm.addControl("burnedStart", new FormControl(false, []));
    this.speedForm.addControl("outsideLine", new FormControl(false, []));
    this.speedForm.addControl("cutWay", new FormControl(false, []));
  }
}
