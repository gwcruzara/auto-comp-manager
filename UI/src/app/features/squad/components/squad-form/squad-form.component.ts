import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SquadService } from '../../services/squad.service';
import { SquadDto } from 'src/app/domain/squad/squad-dto.models';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-squad-form',
  templateUrl: './squad-form.component.html',
  styleUrls: ['./squad-form.component.scss']
})
export class SquadFormComponent implements OnInit{

  private readonly destroy$ : Subject<any> = new Subject();  

  private squadService = inject(SquadService);
  private router = inject(Router);

  squadForm: FormGroup = new FormGroup({});
  squadDto!: SquadDto;

  ngOnInit(): void {
    this.createFormGroup();
  }

  create() {
    this.squadService.create(this.bodyBuilder())
    .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
          if (response){
            this.router.navigate(['/']);
          }
      });
  }
  

  bodyBuilder(): SquadDto {
    return {...this.squadDto, ...this.squadForm.value} 
  }

  private createFormGroup() {
    this.squadForm.addControl("name", new FormControl('', [Validators.required]));
    this.squadForm.addControl("carNumber", new FormControl('', [Validators.required]));
  }
}
