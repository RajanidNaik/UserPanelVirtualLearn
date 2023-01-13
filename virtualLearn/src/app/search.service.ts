import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './../environments/environment';
import { text } from 'body-parser';
import { response } from 'express';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(public http: HttpClient) {}
  getTopSearch(): Observable<any> {
    return this.http.get(`${baseUrl}topSearches`);
  }
  searchCategory(body: any): Observable<any> {
    return this.http.post(`${baseUrl}searchByCategory`, body);
  }
  searchCourse(body: any): Observable<any> {
    return this.http.post(`${baseUrl}searchCourse`, body);
  }
  applyFilter(body: any): Observable<any> {
    return this.http.post(`${baseUrl}filter`, body);
  }
  courseCategory(): Observable<any> {
    const body = {
      choice: 'seeAll',
    };
    return this.http.post(`${baseUrl}getCategories`, body);
  }
}
