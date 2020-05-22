import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {

  constructor(private httpClient: HttpClient) { }

  getCharacters() {
    const url = `${environment.urlRickMorty}`;
    return this.httpClient.get(url).pipe(map((results) => {
      return results['results'];
    }));
  }
}
