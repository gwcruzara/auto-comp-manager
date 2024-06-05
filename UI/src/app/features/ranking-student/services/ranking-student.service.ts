import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RankingDto } from 'src/app/domain/ranking/ranking-dto.models';
import { RankingStudentDto } from 'src/app/domain/ranking/ranking-student.dto.models';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RankingStudentService {

  baseUrl: string = '/Squad';

  constructor(private http: HttpClient) { }

  getOverallRanking(): Observable<RankingStudentDto[]> {
    return this.http.get<RankingStudentDto[]>(`${environment.apiEndpoint}${this.baseUrl}/GetOverallStudentRanking`)
  }
}
