import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RankingDto } from 'src/app/domain/ranking/ranking-dto.models';
import { SpeedDto } from 'src/app/domain/speed/speed-dto.models';
import { Speed } from 'src/app/domain/speed/speed.models';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeedService {

  baseUrl: string = '/Speed';


  constructor(private http: HttpClient) { }

  saveSpeed(speedDto: SpeedDto): Observable<any>{
    return this.http.post<Observable<any>>(`${environment.apiEndpoint}${this.baseUrl}/SaveSpeed`, speedDto)
  }

  getSpeed(squadId: number): Observable<Speed>{
    return this.http.get<Speed>(`${environment.apiEndpoint}${this.baseUrl}/GetSpeed/${squadId}`)
  }

  getRank(): Observable<RankingDto[]> {
    return this.http.get<RankingDto[]>(`${environment.apiEndpoint}${this.baseUrl}/GetRank`)
  }
}
