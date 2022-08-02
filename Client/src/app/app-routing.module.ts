import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppDashboardComponent } from './my-component/app-dashboard/app-dashboard.component';
import { LoginPageComponent } from './my-component/login-page/login-page.component';
import { RegisterPageComponent } from './my-component/register-page/register-page.component';
import { UserProfileComponent } from './my-component/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'dashboard', component: AppDashboardComponent},
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'userprofile', component: UserProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
