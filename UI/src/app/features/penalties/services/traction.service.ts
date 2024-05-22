import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Penalties } from 'src/app/domain/penalties/penalties.model';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PenaltiesService {

  baseUrl: string = '/Penalties';

  constructor(private http: HttpClient) { }

  getPenalties(): Observable<Penalties[]> {
    return this.http.get<Penalties[]>(`${environment.apiEndpoint}${this.baseUrl}/GetPenalties`)
  }
}
