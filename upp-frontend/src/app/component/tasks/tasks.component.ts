import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {AktivnaClanarinaComponent} from '../obrada-podnetog-teksta/aktivna-clanarina/aktivna-clanarina.component';
import {UnosInformacijaORaduComponent} from '../obrada-podnetog-teksta/unos-informacija-o-radu/unos-informacija-o-radu.component';
import {UplataClanarineComponent} from '../obrada-podnetog-teksta/uplata-clanarine/uplata-clanarine.component';
import {ObradaRadaGlavniUrednikComponent} from '../obrada-podnetog-teksta/obrada-rada-glavni-urednik/obrada-rada-glavni-urednik.component';
import {PregledPdfaComponent} from '../obrada-podnetog-teksta/pregled-pdfa/pregled-pdfa.component';
import {IspravakRadaComponent} from '../obrada-podnetog-teksta/ispravak-rada/ispravak-rada.component';
import {OdabirRecenzenataComponent} from '../obrada-podnetog-teksta/odabir-recenzenata/odabir-recenzenata.component';
import {ManjiIspravakAutorComponent} from '../obrada-podnetog-teksta/manji-ispravak-autor/manji-ispravak-autor.component';
import {RevizijaManjiIspravakUrednikComponent} from '../obrada-podnetog-teksta/revizija-manji-ispravak-urednik/revizija-manji-ispravak-urednik.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    const userId = localStorage.getItem('loggedUser');
    this.userService.getAssignedTasks(userId).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  redirectToTask(task: any) {

    if (task['taskKey'] === 'Odabir_naucne_oblasti') {
      this.router.navigate(['scientific-areas/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'Potvrda_recenzenta') {
      this.router.navigate(['potvrda_recenzenta/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'Pregled_podataka' || task['taskKey'] === 'Task_0lfmnzb') {
      this.router.navigate(['pregled-podataka-casopisa/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'Dodavanje_urednika_i_recenzenta') {
      this.router.navigate(['dodavanje-urednika-i-recenzenata/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'Ispravak_podataka') {
      this.router.navigate(['ispravak-podataka-casopisa/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'Aktivna_clanarina_autora') {
      this.router.navigate(['aktivna-clanarina/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'Unos_informacija_o_radu') {
      this.router.navigate(['informacije-o-radu/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'Uplata_clanarine_task') {
      this.router.navigate(['uplata-clanarine/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'obrada_rada') {
      this.router.navigate(['obrada-rada-glavni-urednik/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'pregled_pdfa') {
      this.router.navigate(['pregled-pdf/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'ispravak_rada') {
      this.router.navigate(['ispravak-rada/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'odabir_recenzenata') {
      this.router.navigate(['odabir-recenzenta/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'odredjivanje_roka_za_recenziranje') {
      this.router.navigate(['rok-za-recenziranje/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'Recenzija_rada') {
      this.router.navigate(['recenzija-rada/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'Analiza_recenzija_od_strane_urednika') {
      this.router.navigate(['analiza-recenzije/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'Odabir_novog_recenzenta') {
      this.router.navigate(['odabir-novog-recenzenta/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'ispravak_rada_autor') {
      this.router.navigate(['manji-ispravak-rada/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'revizija_manjih_ispravaka') {
      this.router.navigate(['revizija-manji-ispravak/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'Ispravak_rada_od_strane_autora') {
      this.router.navigate(['manji-ispravak-rada/'.concat(task['processInstanceId'])]);
    } else if (task['taskKey'] === 'Revizija_manjih_ispravaka_od_strane_urednika') {
      this.router.navigate(['revizija-manji-ispravak/'.concat(task['processInstanceId'])]);
    }

  }

}
