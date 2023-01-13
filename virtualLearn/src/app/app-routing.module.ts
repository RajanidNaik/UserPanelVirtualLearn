import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CancelTestComponent } from './cancel-test/cancel-test.component';
import { CertificateComponent } from './certificate/certificate.component';
import { ChapterComponent } from './chapter/chapter.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { FinalComponent } from './final/final.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MycourseComponent } from './mycourse/mycourse.component';
import { QuizComponent } from './quiz/quiz.component';
import { RegisterComponent } from './register/register.component';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';
import { ResultComponent } from './result/result.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SeeAllComponent } from './see-all/see-all.component';
import { StopPlayComponent } from './stop-play/stop-play.component';
import { SubmitComponent } from './submit/submit.component';
import { ViewresultComponent } from './viewresult/viewresult.component';

const routes: Routes = [
  { path: '', redirectTo: 'Register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'page', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'mycourse', component: MycourseComponent, canActivate: [AuthGuard] },
  {
    path: 'overview',
    component: CourseOverviewComponent,
    canActivate: [AuthGuard],
  },
  { path: 'chapter', component: ChapterComponent, canActivate: [AuthGuard] },
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
  { path: 'submit', component: SubmitComponent, canActivate: [AuthGuard] },
  { path: 'result', component: ResultComponent, canActivate: [AuthGuard] },
  {
    path: 'dialog',
    component: ResultDialogComponent,
    canActivate: [AuthGuard],
  },
  { path: 'view', component: ViewresultComponent, canActivate: [AuthGuard] },
  { path: 'final', component: FinalComponent, canActivate: [AuthGuard] },
  {
    path: 'certificate',
    component: CertificateComponent,
    canActivate: [AuthGuard],
  },
  { path: 'cancel', component: CancelTestComponent, canActivate: [AuthGuard] },
  { path: 'stop', component: StopPlayComponent, canActivate: [AuthGuard] },
  {
    path: 'filter',
    component: SearchFilterComponent,
    canActivate: [AuthGuard],
  },
  {path:'seeAll',component:SeeAllComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
