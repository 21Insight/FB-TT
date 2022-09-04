import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  readonly API = 'https://fb-tt-backend.jcuervom.me/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAlbums(albums: string): Observable<any> {
    const ENDPOINT = `${this.API}/albums/${albums}`;
    return this.http
      .get<Array<any>>(ENDPOINT, this.httpOptions)
      .pipe(map((response) => response));
  }
}
