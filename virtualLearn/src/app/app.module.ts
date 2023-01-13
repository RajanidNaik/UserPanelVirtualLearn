import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomePageComponent } from './home-page/home-page.component';
import { MycourseComponent } from './mycourse/mycourse.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { ChapterComponent } from './chapter/chapter.component';
import { QuizComponent } from './quiz/quiz.component';
import { SubmitComponent } from './submit/submit.component';
import { ResultComponent } from './result/result.component';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';
import { ViewresultComponent } from './viewresult/viewresult.component';
import { FinalComponent } from './final/final.component';
import { CertificateComponent } from './certificate/certificate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { DurationPipe } from './duration.pipe';
import { LessonDurationPipe } from './lesson-duration.pipe';
import { TimePipe } from './time.pipe';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { LengthPipe } from './length.pipe';
import { CancelTestComponent } from './cancel-test/cancel-test.component';
import { StopPlayComponent } from './stop-play/stop-play.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SeeAllComponent } from './see-all/see-all.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HomePageComponent,
    MycourseComponent,
    CourseOverviewComponent,
    ChapterComponent,
    QuizComponent,
    SubmitComponent,
    ResultComponent,
    ResultDialogComponent,
    ViewresultComponent,
    FinalComponent,
    CertificateComponent,
    DurationPipe,
    LessonDurationPipe,
    TimePipe,
    LengthPipe,
    CancelTestComponent,
    StopPlayComponent,
    SearchFilterComponent,
    SeeAllComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
