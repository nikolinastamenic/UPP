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
import {OdabirCasopisaComponent} from './component/obrada-podnetog-teksta/odabir-casopisa/odabir-casopisa.component';
import {AktivnaClanarinaComponent} from './component/obrada-podnetog-teksta/aktivna-clanarina/aktivna-clanarina.component';
import {UnosInformacijaORaduComponent} from './component/obrada-podnetog-teksta/unos-informacija-o-radu/unos-informacija-o-radu.component';
import {UplataClanarineComponent} from './component/obrada-podnetog-teksta/uplata-clanarine/uplata-clanarine.component';
import {ObradaRadaGlavniUrednikComponent} from './component/obrada-podnetog-teksta/obrada-rada-glavni-urednik/obrada-rada-glavni-urednik.component';
import {PregledPdfaComponent} from './component/obrada-podnetog-teksta/pregled-pdfa/pregled-pdfa.component';
import {IspravakRadaComponent} from './component/obrada-podnetog-teksta/ispravak-rada/ispravak-rada.component';
import {OdabirRecenzenataComponent} from './component/obrada-podnetog-teksta/odabir-recenzenata/odabir-recenzenata.component';
import {OdredjivanjeRokaZaOcenjivanjeComponent} from './component/obrada-podnetog-teksta/odredjivanje-roka-za-ocenjivanje/odredjivanje-roka-za-ocenjivanje.component';
import {RecenzijaRadaComponent} from './component/obrada-podnetog-teksta/recenzija-rada/recenzija-rada.component';
import {AnalizaRecenzijeComponent} from './component/obrada-podnetog-teksta/analiza-recenzije/analiza-recenzije.component';
import {OdabirNovogRecenzentaComponent} from './component/obrada-podnetog-teksta/odabir-novog-recenzenta/odabir-novog-recenzenta.component';
import {ManjiIspravakAutorComponent} from './component/obrada-podnetog-teksta/manji-ispravak-autor/manji-ispravak-autor.component';
import {RevizijaManjiIspravakUrednikComponent} from './component/obrada-podnetog-teksta/revizija-manji-ispravak-urednik/revizija-manji-ispravak-urednik.component';


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
  {path: 'ispravak-podataka-casopisa/:processInstanceId', component: IspravakPodatakaNovogCasopisaComponent},
  {path: 'kreiranje-rada', component: OdabirCasopisaComponent},
  {path: 'aktivna-clanarina/:processInstanceId', component: AktivnaClanarinaComponent},
  {path: 'informacije-o-radu/:processInstanceId', component: UnosInformacijaORaduComponent},
  {path: 'uplata-clanarine/:processInstanceId', component: UplataClanarineComponent},
  {path: 'obrada-rada-glavni-urednik/:processInstanceId', component: ObradaRadaGlavniUrednikComponent},
  {path: 'pregled-pdf/:processInstanceId', component: PregledPdfaComponent},
  {path: 'ispravak-rada/:processInstanceId', component: IspravakRadaComponent},
  {path: 'odabir-recenzenta/:processInstanceId', component: OdabirRecenzenataComponent},
  {path: 'rok-za-recenziranje/:processInstanceId', component: OdredjivanjeRokaZaOcenjivanjeComponent},
  {path: 'recenzija-rada/:processInstanceId', component: RecenzijaRadaComponent},
  {path: 'analiza-recenzije/:processInstanceId', component: AnalizaRecenzijeComponent},
  {path: 'odabir-novog-recenzenta/:processInstanceId', component: OdabirNovogRecenzentaComponent},
  {path: 'manji-ispravak-rada/:processInstanceId', component: ManjiIspravakAutorComponent},
  {path: 'revizija-manji-ispravak/:processInstanceId', component: RevizijaManjiIspravakUrednikComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
