import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './../environments/environment';
import { text } from 'body-parser';
import { response } from 'express';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(public http: HttpClient) {}
  getBanner(): Observable<any> {
    return this.http.get(`${baseUrl}getBanner`);
  }
  getChoiceCourse(body: any): Observable<any> {
    return this.http.post(`${baseUrl}choiceYourCourse`, body);
  }
  getTopCourse(body: any): Observable<any> {
    return this.http.post(`${baseUrl}topCoursesInCategory`, body);
  }
}
