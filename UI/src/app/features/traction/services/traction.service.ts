import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TractionDto } from 'src/app/domain/traction/traction-dto.models';
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
}
