import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {TasksComponent} from './component/tasks/tasks.component';
import {OdabirNaucnihOblastiComponent} from './component/odabir-naucnih-oblasti/odabir-naucnih-oblasti.component';
import {PotvrdaRegistracijeMejlComponent} from './component/potvrda-registracije-mejl/potvrda-registracije-mejl.component';
import {PotvrdaUlogeRecenzentaComponent} from './component/potvrda-uloge-recenzenta/potvrda-uloge-recenzenta.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register/:startProcess', component: RegisterComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'scientific-areas/:processInstanceId', component: OdabirNaucnihOblastiComponent},
  {path: 'potvrda-registracije/:processInstanceId', component: PotvrdaRegistracijeMejlComponent},
  {path: 'potvrda_recenzenta/:processInstanceId', component: PotvrdaUlogeRecenzentaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
