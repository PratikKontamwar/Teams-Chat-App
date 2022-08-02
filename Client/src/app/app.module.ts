import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './my-component/login-page/login-page.component';
import { RegisterPageComponent } from './my-component/register-page/register-page.component';
import { AppHeaderBarComponent } from './my-component/app-header-bar/app-header-bar.component';
import { AppBarComponent } from './my-component/app-bar/app-bar.component';
import { LeftRailComponent } from './my-component/left-rail/left-rail.component';
import { ContentComponent } from './my-component/content/content.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { AppDashboardComponent } from './my-component/app-dashboard/app-dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './my-component/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AppHeaderBarComponent,
    AppBarComponent,
    LeftRailComponent,
    ContentComponent,
    AppDashboardComponent,
    HomeComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
