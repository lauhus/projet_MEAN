import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';
import { AppComponent } from './app.component';
import { GuardService } from './guard.service';
import { ErrorComponent } from './error/error.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path : 'tasks' , component: ListComponent , canActivate: [GuardService]},
  { path : 'register' , component : RegisterComponent},
  { path : 'login' , component : LoginComponent},
  { path : 'error', component : ErrorComponent},
  { path : 'compte' , component : UserComponent, canActivate: [GuardService]},
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
