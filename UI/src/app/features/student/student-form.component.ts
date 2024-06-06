import { Component, inject } from '@angular/core';
import { StudentService } from './services/student.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { StudentDto } from 'src/app/domain/student/student-dto.models';
import { SquadService } from '../squad/services/squad.service';
import { Squad } from 'src/app/domain/squad/squad-model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {

  private readonly destroy$ : Subject<any> = new Subject();  

  private studentService = inject(StudentService);
  private squadService = inject(SquadService);
  private router = inject(Router);

  studentForm: FormGroup = new FormGroup({});
  studentDto!: StudentDto;
  squadsList: Squad[] = [];

  ngOnInit(): void {
    this.getSquads();
    this.createFormGroup();
  }

  getSquads(){
    this.squadService.getSquads()
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
        this.squadsList = response;
    });
  }

  create() {
    this.studentService.create(this.bodyBuilder())
    .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
          if (response){
            this.router.navigate(['/']);
          }
      });
  }

  bodyBuilder(): StudentDto {
    return {...this.studentDto, ...this.studentForm.value} 
  }

  private createFormGroup() {
    this.studentForm.addControl("name", new FormControl('', []));
    this.studentForm.addControl("job", new FormControl('', []));
    this.studentForm.addControl("idSquad", new FormControl('', []));
  }
}
