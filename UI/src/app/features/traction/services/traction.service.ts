import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RankingDto } from 'src/app/domain/ranking/ranking-dto.models';
import { TractionDto } from 'src/app/domain/traction/traction-dto.models';
import { Traction } from 'src/app/domain/traction/traction.models';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TractionService {

  baseUrl: string = '/Traction';

  constructor(private http: HttpClient) { }

  saveTraction(tractionDto: TractionDto): Observable<any>{
    return this.http.post<Observable<any>>(`${environment.apiEndpoint}${this.baseUrl}/SaveTraction`, tractionDto)
  }

  getTraction(squadId: number): Observable<Traction>{
    return this.http.get<Traction>(`${environment.apiEndpoint}${this.baseUrl}/GetTraction/${squadId}`)
  }
  
  getRank(): Observable<RankingDto[]> {
    return this.http.get<RankingDto[]>(`${environment.apiEndpoint}${this.baseUrl}/GetRank`)
  }
}
