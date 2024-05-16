import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RampDto } from 'src/app/domain/ramp/ramp-dto.models';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RampService {

  baseUrl: string = '/Ramp';


  constructor(private http: HttpClient) { }

  saveRamp(rampDto: RampDto): Observable<any>{
    return this.http.post<Observable<any>>(`${environment.apiEndpoint}${this.baseUrl}/SaveRamp`, rampDto)
  }
}
