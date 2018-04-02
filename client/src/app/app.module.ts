import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NonloggedlandingComponent } from './nonloggedlanding/nonloggedlanding.component';
import { LoginComponent } from './login/login.component';

import { LoggedlandingComponent } from './loggedlanding/loggedlanding.component';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { UsermanagerComponent } from './usermanager/usermanager.component';



@NgModule({
  declarations: [
    AppComponent,
    NonloggedlandingComponent,
    LoginComponent,
    
    LoggedlandingComponent,
    
    UsermanagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
