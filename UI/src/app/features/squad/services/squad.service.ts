import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProveDto } from 'src/app/domain/prove/prove-dto.models';
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
}
