import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {TasksComponent} from './component/tasks/tasks.component';
import {OdabirNaucnihOblastiComponent} from './component/odabir-naucnih-oblasti/odabir-naucnih-oblasti.component';
import {PotvrdaRegistracijeMejlComponent} from './component/potvrda-registracije-mejl/potvrda-registracije-mejl.component';
import {PotvrdaUlogeRecenzentaComponent} from './component/potvrda-uloge-recenzenta/potvrda-uloge-recenzenta.component';
import {KreiranjeCasopisaComponent} from './component/kreiranje-casopisa/kreiranje-casopisa.component';
import {DodavanjeUrednikaIRecenzentaComponent} from './component/dodavanje-urednika-i-recenzenta/dodavanje-urednika-i-recenzenta.component';
import {PregledPodatakaNovogCasopisaComponent} from './component/pregled-podataka-novog-casopisa/pregled-podataka-novog-casopisa.component';
import {IspravakPodatakaNovogCasopisaComponent} from './component/ispravak-podataka-novog-casopisa/ispravak-podataka-novog-casopisa.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register/:startProcess', component: RegisterComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'scientific-areas/:processInstanceId', component: OdabirNaucnihOblastiComponent},
  {path: 'potvrda-registracije/:processInstanceId', component: PotvrdaRegistracijeMejlComponent},
  {path: 'potvrda_recenzenta/:processInstanceId', component: PotvrdaUlogeRecenzentaComponent},
  {path: 'kreiranje-casopisa', component: KreiranjeCasopisaComponent},
  {path: 'dodavanje-urednika-i-recenzenata/:processInstanceId', component: DodavanjeUrednikaIRecenzentaComponent},
  {path: 'pregled-podataka-casopisa/:processInstanceId', component: PregledPodatakaNovogCasopisaComponent},
  {path: 'ispravak-podataka-casopisa/:processInstanceId', component: IspravakPodatakaNovogCasopisaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
