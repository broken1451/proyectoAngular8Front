import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DigimonService {

  constructor(private httpClient: HttpClient) {}

  getDigimons() {
    const url = `${environment.urlDigimon}`;
    return this.httpClient.get(url);
  }
}
