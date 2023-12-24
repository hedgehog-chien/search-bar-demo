import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../model/cities.model';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  constructor(private http: HttpClient) {}

  public getData(): Observable<City[]> {
    const endpoint =
      'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

    // const cities: unknown[] = [];
    // fetch(endpoint)
    //   .then((blob) => blob.json())
    //   .then((data) => cities.push(...data));

    return this.http.get<City[]>(endpoint);
  }
}
