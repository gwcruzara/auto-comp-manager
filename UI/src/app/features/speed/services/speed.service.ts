import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpeedDto } from 'src/app/domain/speed/speed-dto.models';
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
}
