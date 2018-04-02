import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NonloggedlandingComponent } from './nonloggedlanding/nonloggedlanding.component';
import { LoginComponent } from './login/login.component';
import { LoggedlandingComponent } from './loggedlanding/loggedlanding.component';
import { UsermanagerComponent} from './usermanager/usermanager.component'

const routes: Routes = [
  { path: '', component: NonloggedlandingComponent , pathMatch: 'full' },
  { path: 'login', component: LoginComponent , pathMatch: 'full' },
  { path: 'home', component: LoggedlandingComponent , pathMatch: 'full' },
  { path: 'user/manager', component: UsermanagerComponent , pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
