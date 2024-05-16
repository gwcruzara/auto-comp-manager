import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RampService } from './services/ramp.service';
import { RampDto } from 'src/app/domain/ramp/ramp-dto.models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ramp',
  templateUrl: './ramp.component.html',
  styleUrls: ['./ramp.component.scss']
})
export class RampComponent implements OnInit {

  private readonly $destroy = new Subject();

  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute); 
  private rampService = inject(RampService); 

  mainForm!: FormGroup;
  squadId!: number;
  rampDto!: RampDto;

  ngOnInit(): void {
    this.squadId = this.route.snapshot.params['id'];    
    this.createFormGroup();
  }

  saveRamp() {
    this.rampService
      .saveRamp(this.bodyBuilder())
      .pipe(takeUntil(this.$destroy))
      .subscribe(x => {
          console.log(x)
      });
  }

  bodyBuilder(): RampDto {
    return {...this.rampDto, ...this.mainForm.value} 
  }

  private createFormGroup() {
    this.mainForm = this.formBuilder.group({
      "idSquad": [this.squadId],
      "distance": [''],
      "ranking": [''],
      "score": ['']
    })
  }
}
