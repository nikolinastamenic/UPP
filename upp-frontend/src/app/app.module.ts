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
    IspravakPodatakaNovogCasopisaComponent
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
