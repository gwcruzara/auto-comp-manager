import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentFormComponent } from './student-form.component';


@NgModule({
  declarations: [
    StudentFormComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
