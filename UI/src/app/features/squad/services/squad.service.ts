import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProveDto } from 'src/app/domain/prove/prove-dto.models';
import { SquadDto } from 'src/app/domain/squad/squad-dto.models';
import { Squad } from 'src/app/domain/squad/squad-model';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SquadService {

  baseUrl: string = '/Squad';

  constructor(private http: HttpClient) { }

  getSquads(): Observable<Squad[]>{
    return this.http.get<Squad[]>(`${environment.apiEndpoint}${this.baseUrl}/GetSquad`)
  }

  getProve(squadId: number): Observable<ProveDto>{
    return this.http.get<ProveDto>(`${environment.apiEndpoint}${this.baseUrl}/GetProve/${squadId}`)
  }

  create(squadDto: SquadDto): Observable<Squad>{
    return this.http.post<Squad>(`${environment.apiEndpoint}${this.baseUrl}/Create`, squadDto);
  }
}
