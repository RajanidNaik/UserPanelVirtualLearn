import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './../environments/environment';
import { text } from 'body-parser';
import { response } from 'express';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyCourseService {
  constructor(public http: HttpClient) {}

  login(body: any): Observable<any> {
    return this.http.post(`${baseUrl}signIn`, body);
  }
  getName(): Observable<any> {
    return this.http.get(`${baseUrl}getName`);
  }
  getProfileImage(): Observable<any> {
    return this.http.get(`${baseUrl}getProfileImage`);
  }
  getOngoingCourse(): Observable<any> {
    return this.http.get(`${baseUrl}ongoingCourses?choice=seeAll`);
  }
  getCompletedCourse(): Observable<any> {
    return this.http.get(`${baseUrl}completedCourses?choice=seeAll`);
  }
  getOverview(body: any): Observable<any> {
    return this.http.post(`${baseUrl}getCourse/overview`, body);
  }
  getChapter(body: any): Observable<any> {
    return this.http.post(`${baseUrl}getCourse/chapters`, body);
  }
  getQuestion(body: any): Observable<any> {
    return this.http.post(`${baseUrl}displayTest`, body);
  }
  updateUserProgress(body: any): Observable<any> {
    console.log('yes');
    return this.http.post(`${baseUrl}updateProgress`, body);
  }
  getProgress(body: any): Observable<any> {
    return this.http.post(`${baseUrl}getProgress`, body);
  }
  submitTest(body: any): Observable<any> {
    return this.http.post(`${baseUrl}submitTest`, body);
  }
  getResult(body: any): Observable<any> {
    return this.http.post(`${baseUrl}getCompletedTestResultData`, body);
  }
  enrollCourse(body: any): Observable<any> {
    return this.http.post(`${baseUrl}enrollNow`, body);
  }
  getCertificate(body: any): Observable<any> {
    return this.http.post(`${baseUrl}completedCourses/viewCertificate`, body);
  }
}
