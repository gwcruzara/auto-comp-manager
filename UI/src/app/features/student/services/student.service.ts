import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentDto } from 'src/app/domain/student/student-dto.models';
import { Student } from 'src/app/domain/student/student-model';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl: string = '/Student';

  constructor(private http: HttpClient) { }

  get(): Observable<Student[]>{
    return this.http.get<Student[]>(`${environment.apiEndpoint}${this.baseUrl}/GetStudents`)
  }

  create(studentDto: StudentDto): Observable<Student>{
    return this.http.post<Student>(`${environment.apiEndpoint}${this.baseUrl}/Create`, studentDto);
  }
}
