import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RankingDto } from 'src/app/domain/ranking/ranking-dto.models';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  baseUrl: string = '/Squad';

  constructor(private http: HttpClient) { }

  getOverallRanking(): Observable<RankingDto[]> {
    return this.http.get<RankingDto[]>(`${environment.apiEndpoint}${this.baseUrl}/GetOverallRanking`)
  }
}
