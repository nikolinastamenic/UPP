import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ng6-toastr-notifications';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './component/register/register.component';
import { OdabirNaucnihOblastiComponent } from './component/odabir-naucnih-oblasti/odabir-naucnih-oblasti.component';
import { TasksComponent } from './component/tasks/tasks.component';
import { PotvrdaRegistracijeMejlComponent } from './component/potvrda-registracije-mejl/potvrda-registracije-mejl.component';
import { PotvrdaUlogeRecenzentaComponent } from './component/potvrda-uloge-recenzenta/potvrda-uloge-recenzenta.component';
import { KreiranjeCasopisaComponent } from './component/kreiranje-casopisa/kreiranje-casopisa.component';
import { DodavanjeUrednikaIRecenzentaComponent } from './component/dodavanje-urednika-i-recenzenta/dodavanje-urednika-i-recenzenta.component';
import { PregledPodatakaNovogCasopisaComponent } from './component/pregled-podataka-novog-casopisa/pregled-podataka-novog-casopisa.component';
import { IspravakPodatakaNovogCasopisaComponent } from './component/ispravak-podataka-novog-casopisa/ispravak-podataka-novog-casopisa.component';
import { OdabirCasopisaComponent } from './component/obrada-podnetog-teksta/odabir-casopisa/odabir-casopisa.component';
import { AktivnaClanarinaComponent } from './component/obrada-podnetog-teksta/aktivna-clanarina/aktivna-clanarina.component';
import { UnosInformacijaORaduComponent } from './component/obrada-podnetog-teksta/unos-informacija-o-radu/unos-informacija-o-radu.component';
import { UplataClanarineComponent } from './component/obrada-podnetog-teksta/uplata-clanarine/uplata-clanarine.component';
import { ObradaRadaGlavniUrednikComponent } from './component/obrada-podnetog-teksta/obrada-rada-glavni-urednik/obrada-rada-glavni-urednik.component';
import { PregledPdfaComponent } from './component/obrada-podnetog-teksta/pregled-pdfa/pregled-pdfa.component';
import { IspravakRadaComponent } from './component/obrada-podnetog-teksta/ispravak-rada/ispravak-rada.component';
import { OdabirRecenzenataComponent } from './component/obrada-podnetog-teksta/odabir-recenzenata/odabir-recenzenata.component';
import { OdredjivanjeRokaZaOcenjivanjeComponent } from './component/obrada-podnetog-teksta/odredjivanje-roka-za-ocenjivanje/odredjivanje-roka-za-ocenjivanje.component';
import { RecenzijaRadaComponent } from './component/obrada-podnetog-teksta/recenzija-rada/recenzija-rada.component';
import { AnalizaRecenzijeComponent } from './component/obrada-podnetog-teksta/analiza-recenzije/analiza-recenzije.component';
import { OdabirNovogRecenzentaComponent } from './component/obrada-podnetog-teksta/odabir-novog-recenzenta/odabir-novog-recenzenta.component';
import { ManjiIspravakAutorComponent } from './component/obrada-podnetog-teksta/manji-ispravak-autor/manji-ispravak-autor.component';
import { RevizijaManjiIspravakUrednikComponent } from './component/obrada-podnetog-teksta/revizija-manji-ispravak-urednik/revizija-manji-ispravak-urednik.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    OdabirNaucnihOblastiComponent,
    TasksComponent,
    PotvrdaRegistracijeMejlComponent,
    PotvrdaUlogeRecenzentaComponent,
    KreiranjeCasopisaComponent,
    DodavanjeUrednikaIRecenzentaComponent,
    PregledPodatakaNovogCasopisaComponent,
    IspravakPodatakaNovogCasopisaComponent,
    OdabirCasopisaComponent,
    AktivnaClanarinaComponent,
    UnosInformacijaORaduComponent,
    UplataClanarineComponent,
    ObradaRadaGlavniUrednikComponent,
    PregledPdfaComponent,
    IspravakRadaComponent,
    OdabirRecenzenataComponent,
    OdredjivanjeRokaZaOcenjivanjeComponent,
    RecenzijaRadaComponent,
    AnalizaRecenzijeComponent,
    OdabirNovogRecenzentaComponent,
    ManjiIspravakAutorComponent,
    RevizijaManjiIspravakUrednikComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
